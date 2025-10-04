import { Entity, Column, ManyToOne, JoinColumn } from "typeorm";
import { SellerProfile } from "./seller-profile-entity";
import { BankAccountStatus, BankAccountType } from "../enums/bank-enum";
import { BaseEntity } from "./base-entity";

/**
 * BankAccount Entity
 * Represents a bank account associated with a seller for receiving payments.
 * Contains sensitive financial information that should be handled securely.
 */
@Entity("bank_accounts")
export class BankAccount extends BaseEntity {
  // ========== SELLER RELATIONSHIP ==========

  /**
   * ID of the seller who owns this bank account
   */
  @Column({ type: "uuid" })
  sellerId: string;

  /**
   * The seller profile this bank account belongs to
   */
  @ManyToOne(() => SellerProfile, (seller) => seller.bankAccounts, {
    onDelete: "CASCADE",
  })
  @JoinColumn({ name: "seller_id" })
  seller: SellerProfile;

  // ========== ACCOUNT INFORMATION ==========

  /**
   * Full name of the account holder as it appears on the bank account
   * @example 'John A. Smith'
   */
  @Column({ name: "account_holder_name" })
  accountHolderName: string;

  /**
   * Bank account number (sensitive, excluded from default selects)
   * @example '1234567890'
   */
  @Column({ name: "account_number", select: false })
  accountNumber: string;

  /**
   * Bank routing number (sensitive, excluded from default selects)
   * @example '021000021' (for US banks)
   */
  @Column({ name: "routing_number", select: false })
  routingNumber: string;

  /**
   * Type of bank account
   * @default BankAccountType.CHECKING
   */
  @Column({
    type: "enum",
    enum: BankAccountType,
    default: BankAccountType.CHECKING,
  })
  accountType: BankAccountType;

  /**
   * Name of the bank
   * @example 'Chase Bank' or 'Bank of America'
   */
  @Column({ name: "bank_name" })
  bankName: string;

  /**
   * Country where the bank is located (ISO 3166-1 alpha-2 code)
   * @example 'US' or 'GB'
   */
  @Column({ name: "bank_country" })
  bankCountry: string;

  /**
   * City where the bank is located
   * @example 'New York' or 'London'
   */
  @Column({ name: "bank_city", nullable: true })
  bankCity: string;

  /**
   * SWIFT/BIC code for international transfers
   * @example 'CHASUS33' (for Chase Bank in the US)
   */
  @Column({ name: "swift_code", nullable: true })
  swiftCode: string;

  /**
   * International Bank Account Number (for international accounts)
   * @example 'GB29NWBK60161331926819' (example UK IBAN)
   */
  @Column({ name: "iban", nullable: true })
  iban: string;

  // ========== STATUS ==========

  /**
   * Current status of the bank account
   * @default BankAccountStatus.PENDING
   */
  @Column({
    type: "enum",
    enum: BankAccountStatus,
    default: BankAccountStatus.PENDING,
  })
  status: BankAccountStatus;

  /**
   * Whether this is the primary bank account for the seller
   * @default false
   */
  @Column({ name: "is_primary", default: false })
  isPrimary: boolean;

  // ========== VERIFICATION ==========

  /**
   * Documents submitted for bank account verification
   * @example [
   *   {
   *     type: 'BANK_STATEMENT',
   *     url: 'https://example.com/documents/statement.pdf',
   *     status: 'APPROVED',
   *     verifiedAt: '2023-01-15T10:30:00.000Z'
   *   }
   * ]
   */
  @Column({ name: "verification_documents", type: "jsonb", nullable: true })
  verificationDocuments: Array<{
    /** Type of verification document */
    type: string;
    /** URL to the document */
    url: string;
    /** Verification status */
    status: "PENDING" | "APPROVED" | "REJECTED";
    /** Reason for rejection if applicable */
    rejectionReason?: string;
    /** When the document was verified */
    verifiedAt?: Date;
  }>;

  /**
   * When the bank account was successfully verified
   */
  @Column({ name: "verified_at", type: "timestamp", nullable: true })
  verifiedAt: Date;

  // ========== HELPER METHODS ==========

  /**
   * Checks if the bank account is verified and active
   * @returns boolean - True if the account is verified or active
   * @example
   * if (bankAccount.isVerified()) {
   *   // Proceed with payment
   * }
   */
  isVerified(): boolean {
    return (
      this.status === BankAccountStatus.VERIFIED ||
      this.status === BankAccountStatus.ACTIVE
    );
  }
}
