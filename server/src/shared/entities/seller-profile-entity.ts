import { Entity, Column, OneToOne, JoinColumn, OneToMany } from "typeorm";
import { User } from "./user-entity";
import { BankAccount } from "./bank-account-entity";
import { TaxInformation } from "./tax-information-entity";
import { StorePolicy } from "./store-policy-entity";
import { SellerShop } from "./seller-shop-entity";
import { BaseEntity } from "./base-entity";
import { BusinessType, SellerStatus } from "../enums/seller-enum";

/**
 * SellerProfile Entity
 * Represents a seller's business profile in the marketplace.
 * Contains all business-related information, verification status, and performance metrics.
 *
 * @class SellerProfile
 * @implements {SellerProfile}
 */
@Entity("seller_profiles")
export class SellerProfile extends BaseEntity {
  // ========== USER RELATIONSHIP ==========

  /**
   * ID of the user associated with this seller profile
   * @type {string}
   */
  @Column({ type: "uuid", unique: true })
  userId: string;

  /**
   * The user account associated with this seller profile
   * @type {User}
   */
  @OneToOne(() => User, { onDelete: "CASCADE" })
  @JoinColumn({ name: "user_id" })
  user: User;

  // ========== BUSINESS INFORMATION ==========

  /**
   * Display name of the seller's store
   * @type {string}
   * @example 'Tech Gadgets Store'
   */
  @Column({ name: "store_name" })
  storeName: string;

  /**
   * URL-friendly version of the store name
   * @type {string}
   * @example 'tech-gadgets-store'
   */
  @Column({ name: "store_slug", unique: true })
  storeSlug: string;

  /**
   * Legal business name
   * @type {string}
   * @example 'Tech Gadgets LLC'
   */
  @Column({ name: "business_name" })
  businessName: string;

  /**
   * Type of business entity
   * @type {BusinessType}
   * @default BusinessType.INDIVIDUAL
   */
  @Column({
    type: "enum",
    enum: BusinessType,
    default: BusinessType.INDIVIDUAL,
  })
  businessType: BusinessType;

  /**
   * Detailed description of the business
   * @type {string}
   * @example 'We sell the latest tech gadgets and accessories.'
   */
  @Column({ name: "business_description", type: "text", nullable: true })
  businessDescription: string;

  // ========== CONTACT INFORMATION ==========

  /**
   * Primary business email address for official communications
   * @type {string}
   * @example 'contact@techgadgets.com'
   */
  @Column({ name: "business_email" })
  businessEmail: string;

  /**
   * Primary business phone number with country code
   * @type {string}
   * @example '+1234567890'
   */
  @Column({ name: "business_phone" })
  businessPhone: string;

  /**
   * Business website URL (optional)
   * @type {string}
   * @example 'https://www.techgadgets.com'
   */
  @Column({ name: "business_website", nullable: true })
  businessWebsite: string;

  // ========== BUSINESS REGISTRATION ==========

  /**
   * Tax identification number (country-specific format)
   * @type {string}
   * @example '12-3456789' (for US EIN)
   */
  @Column({ name: "tax_id", nullable: true })
  taxId: string;

  /**
   * Business registration number from the government
   * @type {string}
   * @example '123456789'
   */
  @Column({ name: "registration_number", nullable: true })
  registrationNumber: string;

  /**
   * Value Added Tax (VAT) number for EU businesses
   * @type {string}
   * @example 'EU123456789'
   */
  @Column({ name: "vat_number", nullable: true })
  vatNumber: string;

  // ========== BUSINESS ADDRESS ==========

  /**
   * Legal business address
   * @type {Object}
   * @property {string} street - Street address
   * @property {string} city - City name
   * @property {string} state - State/province/region
   * @property {string} postalCode - ZIP/postal code
   * @property {string} country - Country name
   * @property {string} countryCode - ISO 2-letter country code
   */
  @Column({ name: "business_address", type: "jsonb", nullable: true })
  businessAddress: {
    street: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
    countryCode: string;
  };

  // ========== STATUS & VERIFICATION ==========

  /**
   * Current status of the seller account
   * @type {SellerStatus}
   * @default SellerStatus.PENDING
   */
  @Column({
    type: "enum",
    enum: SellerStatus,
    default: SellerStatus.PENDING,
  })
  status: SellerStatus;

  /**
   * Whether the seller's identity has been verified
   * @type {boolean}
   * @default false
   */
  @Column({ name: "is_verified", default: false })
  isVerified: boolean;

  /**
   * When the seller's verification was completed
   * @type {Date}
   */
  @Column({ name: "verification_date", type: "timestamp", nullable: true })
  verificationDate: Date;

  // ========== FINANCIAL INFORMATION ==========

  /**
   * List of bank accounts associated with this seller
   * @type {BankAccount[]}
   */
  @OneToMany(() => BankAccount, (bankAccount) => bankAccount.seller, {
    cascade: true,
  })
  bankAccounts: BankAccount[];

  /**
   * Tax information for different jurisdictions
   * @type {TaxInformation[]}
   */
  @OneToMany(() => TaxInformation, (taxInfo) => taxInfo.seller, {
    cascade: true,
  })
  taxInformation: TaxInformation[];

  // ========== STORE POLICIES ==========

  /**
   * Seller's return policy
   * @type {StorePolicy}
   */
  @OneToOne(() => StorePolicy, { cascade: true, eager: true })
  @JoinColumn()
  returnPolicy: StorePolicy;

  /**
   * Seller's shipping policy
   * @type {StorePolicy}
   */
  @OneToOne(() => StorePolicy, { cascade: true, eager: true })
  @JoinColumn()
  shippingPolicy: StorePolicy;

  /**
   * Shops operated under this seller profile
   */
  @OneToMany(() => SellerShop, (shop) => shop.sellerProfile, {
    cascade: true,
  })
  shops: SellerShop[];

  // ========== PERFORMANCE METRICS ==========

  /**
   * Average seller rating (0-5)
   * @type {number}
   * @minimum 0
   * @maximum 5
   * @default 0
   */
  @Column({ type: "decimal", precision: 3, scale: 2, default: 0 })
  rating: number;

  /**
   * Total number of ratings received
   * @type {number}
   * @minimum 0
   * @default 0
   */
  @Column({ name: "total_ratings", default: 0 })
  totalRatings: number;

  /**
   * Percentage of customer messages the seller responds to
   * @type {number}
   * @minimum 0
   * @maximum 100
   * @default 0
   */
  @Column({
    name: "response_rate",
    type: "decimal",
    precision: 5,
    scale: 2,
    default: 0,
  })
  responseRate: number;

  /**
   * Average time in hours to respond to customer inquiries
   * @type {number}
   * @minimum 0
   */
  @Column({ name: "response_time", type: "integer", nullable: true })
  responseTime: number;

  // ========== HELPER METHODS ==========

  /**
   * Gets the URL path for the seller's store
   * @returns {string} The store URL path
   * @example
   * // Returns '/store/tech-gadgets-store'
   * sellerProfile.getStoreUrl();
   */
  getStoreUrl(): string {
    return `/store/${this.storeSlug}`;
  }

  /**
   * Checks if the seller is currently active
   * @returns {boolean} True if the seller is approved and verified
   * @example
   * if (sellerProfile.isActive()) {
   *   console.log('Seller is active');
   * }
   */
  isActive(): boolean {
    return this.status === SellerStatus.APPROVED && this.isVerified;
  }
}
