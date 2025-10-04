import { Entity, Column, ManyToOne, JoinColumn } from "typeorm";
import { User } from "./user-entity";
import { CardBrand, PaymentMethodType } from "../enums/payment-enum";
import { BaseEntity } from "./base-entity";

/**
 * PaymentMethod Entity
 * Represents a payment method associated with a user's account
 * @class PaymentMethod
 */
@Entity("payment_methods")
export class PaymentMethod extends BaseEntity {
  // ========== USER RELATIONSHIP ==========

  /**
   * ID of the user who owns this payment method
   * @type {string}
   */
  @Column({ type: "uuid" })
  userId: string;

  /**
   * The user who owns this payment method
   * @type {User}
   */
  @ManyToOne(() => User, (user) => user.paymentMethods, { onDelete: "CASCADE" })
  @JoinColumn({ name: "user_id" })
  user: User;

  // ========== PAYMENT METHOD DETAILS ==========

  /**
   * Type of payment method
   * @type {PaymentMethodType}
   * @default PaymentMethodType.CREDIT_CARD
   */
  @Column({
    type: "enum",
    enum: PaymentMethodType,
    default: PaymentMethodType.CREDIT_CARD,
  })
  type: PaymentMethodType;

  /**
   * Whether this is the default payment method for the user
   * @type {boolean}
   * @default false
   */
  @Column({ name: "is_default", default: false })
  isDefault: boolean;

  // ========== CARD DETAILS ==========

  /**
   * Brand of the credit/debit card (e.g., VISA, MASTERCARD)
   * @type {CardBrand}
   */
  @Column({ name: "card_brand", type: "enum", enum: CardBrand, nullable: true })
  cardBrand: CardBrand;

  /**
   * Last 4 digits of the card number
   * @type {string}
   * @example '4242'
   */
  @Column({ name: "last_four", length: 4, nullable: true })
  lastFour: string;

  /**
   * Expiration month (1-12)
   * @type {number}
   * @example 12
   */
  @Column({ name: "exp_month", type: "smallint", nullable: true })
  expMonth: number;

  /**
   * Expiration year (4 digits)
   * @type {number}
   * @example 2025
   */
  @Column({ name: "exp_year", type: "smallint", nullable: true })
  expYear: number;

  /**
   * Name of the cardholder as it appears on the card
   * @type {string}
   * @example 'John Doe'
   */
  @Column({ name: "card_holder_name", nullable: true })
  cardHolderName: string;

  // ========== PAYMENT GATEWAY DETAILS ==========

  /**
   * External payment gateway's identifier for this payment method
   * @type {string}
   * @example 'ch_1J8X9X2eZvKYlo2C0X0X0X0X'
   */
  @Column({ name: "payment_gateway_id", nullable: true })
  paymentGatewayId: string;

  /**
   * External payment method identifier from the payment gateway
   * @type {string}
   */
  @Column({ name: "payment_method_id", nullable: true })
  paymentMethodId: string;

  /**
   * Unique fingerprint of the payment method (for security verification)
   * @type {string}
   */
  @Column({ name: "fingerprint", nullable: true })
  fingerprint: string;

  // ========== BANK ACCOUNT DETAILS ==========

  /**
   * Name of the bank for bank account payments
   * @type {string}
   * @example 'Bank of America'
   */
  @Column({ name: "bank_name", nullable: true })
  bankName: string;

  /**
   * Type of account holder (individual or company)
   * @type {'INDIVIDUAL' | 'COMPANY'}
   */
  @Column({ name: "account_holder_type", nullable: true })
  accountHolderType: "INDIVIDUAL" | "COMPANY";

  /**
   * Bank routing number (US) or sort code (UK)
   * @type {string}
   * @example '110000000' (for ACH) or '12-34-56' (for UK sort code)
   */
  @Column({ name: "routing_number", nullable: true })
  routingNumber: string;

  /**
   * Type of bank account
   * @type {'CHECKING' | 'SAVINGS'}
   */
  @Column({ name: "account_type", nullable: true })
  accountType: "CHECKING" | "SAVINGS";

  // ========== DIGITAL WALLET DETAILS ==========

  /**
   * Type of digital wallet (if applicable)
   * @type {'APPLE_PAY' | 'GOOGLE_PAY' | 'SAMSUNG_PAY' | 'OTHER'}
   */
  @Column({ name: "wallet_type", nullable: true })
  walletType: "APPLE_PAY" | "GOOGLE_PAY" | "SAMSUNG_PAY" | "OTHER";

  // ========== BILLING ADDRESS ==========

  /**
   * Billing address associated with this payment method
   * @type {Object}
   * @property {string} line1 - First line of the address
   * @property {string} [line2] - Second line of the address (optional)
   * @property {string} city - City name
   * @property {string} state - State or province
   * @property {string} postalCode - ZIP or postal code
   * @property {string} country - ISO 2-letter country code
   */
  @Column({ type: "jsonb", nullable: true })
  billingAddress: {
    line1: string;
    line2?: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
  };

  // ========== METADATA ==========

  /**
   * Additional metadata for the payment method
   * @type {Record<string, any>}
   */
  @Column({ type: "jsonb", nullable: true })
  metadata: Record<string, any>;

  // ========== STATUS ==========

  /**
   * Whether the payment method is active and can be used for payments
   * @type {boolean}
   * @default true
   */
  @Column({ default: true })
  isActive: boolean;

  /**
   * Whether the payment method has been verified
   * @type {boolean}
   * @default false
   */
  @Column({ name: "is_verified", default: false })
  isVerified: boolean;

  // ========== HELPER METHODS ==========

  /**
   * Gets a masked version of the payment method number for display
   * @returns {string} Masked payment method number (e.g., •••• •••• •••• 4242)
   * @example
   * // Returns '•••• •••• •••• 4242' for a credit card
   * paymentMethod.getMaskedNumber();
   */
  getMaskedNumber(): string {
    if (
      this.type === PaymentMethodType.CREDIT_CARD ||
      this.type === PaymentMethodType.DEBIT_CARD
    ) {
      return `•••• •••• •••• ${this.lastFour}`;
    } else if (this.type === PaymentMethodType.BANK_ACCOUNT) {
      return `••••${this.lastFour}`;
    }
    return "";
  }

  /**
   * Gets a user-friendly display name for the payment method
   * @returns {string} A formatted display name for the payment method
   * @example
   * // Returns 'VISA •••• 4242' for a VISA card
   * paymentMethod.getDisplayName();
   */
  getDisplayName(): string {
    switch (this.type) {
      case PaymentMethodType.CREDIT_CARD:
      case PaymentMethodType.DEBIT_CARD:
        return `${this.cardBrand} ${this.getMaskedNumber()}`;
      case PaymentMethodType.BANK_ACCOUNT:
        return `${this.bankName} ••••${this.lastFour}`;
      case PaymentMethodType.PAYPAL:
        return "PayPal";
      default:
        return this.type.replace(/_/g, " ");
    }
  }

  /**
   * Checks if the payment method is expired
   * @returns {boolean} True if the payment method is expired, false otherwise
   * @example
   * if (paymentMethod.isExpired()) {
   *   console.log('This payment method has expired');
   * }
   */
  isExpired(): boolean {
    if (!this.expMonth || !this.expYear) return false;

    const now = new Date();
    const currentMonth = now.getMonth() + 1; // getMonth() is 0-indexed
    const currentYear = now.getFullYear();

    return (
      this.expYear < currentYear ||
      (this.expYear === currentYear && this.expMonth < currentMonth)
    );
  }
}
