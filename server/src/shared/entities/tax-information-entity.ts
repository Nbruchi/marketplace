import { Entity, Column, ManyToOne, JoinColumn } from "typeorm";
import { SellerProfile } from "./seller-profile-entity";
import { TaxType, TaxRegion } from "../enums/tax-enum";
import { BaseEntity } from "./base-entity";

/**
 * TaxInformation Entity
 *
 * Represents tax-related information for a seller's business operations.
 * This includes tax identification details, registration information, tax rates,
 * and verification status for different tax jurisdictions.
 *
 * @class TaxInformation
 */
@Entity("tax_information")
export class TaxInformation extends BaseEntity {
  // ========== SELLER RELATIONSHIP ==========

  /**
   * ID of the seller this tax information belongs to
   * @type {string}
   */
  @Column({ type: "uuid" })
  sellerId: string;

  /**
   * The seller profile associated with this tax information
   * @type {SellerProfile}
   */
  @ManyToOne(() => SellerProfile, { onDelete: "CASCADE" })
  @JoinColumn({ name: "seller_id" })
  seller: SellerProfile;

  // ========== TAX IDENTIFICATION ==========

  /**
   * Type of tax (e.g., VAT, GST, SALES_TAX)
   * @type {TaxType}
   * @example TaxType.VAT
   */
  @Column({ name: "tax_type", type: "enum", enum: TaxType })
  taxType: TaxType;

  /**
   * The tax identification number for the business
   * @type {string}
   * @example 'GB123456789'
   */
  @Column({ name: "tax_id" })
  taxId: string;

  /**
   * The geographical region this tax applies to
   * @type {TaxRegion}
   * @default TaxRegion.NATIONAL
   */
  @Column({
    name: "tax_region",
    type: "enum",
    enum: TaxRegion,
    default: TaxRegion.NATIONAL,
  })
  taxRegion: TaxRegion;

  /**
   * Name of the specific region (if applicable)
   * @type {string}
   * @example 'California'
   */
  @Column({ name: "region_name", nullable: true })
  regionName: string;

  /**
   * ISO 3166-1 alpha-2 country code
   * @type {string}
   * @example 'US', 'GB', 'DE'
   */
  @Column({ name: "country_code", length: 2 })
  countryCode: string;

  // ========== TAX DETAILS ==========

  /**
   * Legal name under which the business is registered for tax purposes
   * @type {string}
   * @example 'Acme Corp LLC'
   */
  @Column({ name: "registration_name", nullable: true })
  registrationName: string;

  /**
   * Trading name of the business (if different from registration name)
   * @type {string}
   * @example 'Acme Online Store'
   */
  @Column({ name: "business_name", nullable: true })
  businessName: string;

  /**
   * Physical address used for tax purposes
   * @type {Object}
   * @property {string} street - Street address
   * @property {string} city - City name
   * @property {string} state - State/Province/Region
   * @property {string} postalCode - Postal/ZIP code
   * @property {string} country - Country name
   * @example
   * {
   *   street: '123 Business Ave',
   *   city: 'San Francisco',
   *   state: 'CA',
   *   postalCode: '94105',
   *   country: 'United States'
   * }
   */
  @Column({ name: "tax_address", type: "jsonb", nullable: true })
  taxAddress: {
    street: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
  };

  // ========== TAX RATES & REGISTRATION ==========

  /**
   * The applicable tax rate as a percentage
   * @type {number}
   * @minimum 0
   * @maximum 100
   * @example 20.00
   */
  @Column({
    name: "tax_rate",
    type: "decimal",
    precision: 5,
    scale: 2,
    default: 0,
  })
  taxRate: number;

  /**
   * Whether the business is registered for VAT/GST
   * @type {boolean}
   * @default false
   */
  @Column({ name: "is_vat_gst_registered", default: false })
  isVatGstRegistered: boolean;

  /**
   * VAT/GST registration number (if applicable)
   * @type {string}
   * @example 'GB123456789'
   */
  @Column({ name: "vat_gst_number", nullable: true })
  vatGstNumber: string;

  // ========== VERIFICATION STATUS ==========

  /**
   * Whether the tax information has been verified by the platform
   * @type {boolean}
   * @default false
   */
  @Column({ name: "is_verified", default: false })
  isVerified: boolean;

  /**
   * Timestamp when the tax information was verified
   * @type {Date}
   */
  @Column({ name: "verified_at", type: "timestamp", nullable: true })
  verifiedAt: Date;

  /**
   * Array of documents submitted for tax verification
   * @type {Array<Object>}
   * @property {string} type - Type of document (e.g., 'TAX_CERTIFICATE', 'BUSINESS_LICENSE')
   * @property {string} url - URL to the uploaded document
   * @property {'PENDING'|'APPROVED'|'REJECTED'} status - Current status of the document
   * @property {string} [rejectionReason] - Reason for rejection (if status is REJECTED)
   * @property {Date} [verifiedAt] - When the document was verified
   * @example
   * [
   *   {
   *     type: 'TAX_CERTIFICATE',
   *     url: 'https://example.com/documents/123',
   *     status: 'APPROVED',
   *     verifiedAt: '2023-01-15T10:30:00Z'
   *   }
   * ]
   */
  @Column({ name: "verification_documents", type: "jsonb", nullable: true })
  verificationDocuments: Array<{
    type: string;
    url: string;
    status: "PENDING" | "APPROVED" | "REJECTED";
    rejectionReason?: string;
    verifiedAt?: Date;
  }>;

  // ========== EFFECTIVE DATES ==========

  /**
   * Date from which this tax information is effective
   * @type {Date}
   * @default Current timestamp
   */
  @Column({
    name: "effective_from",
    type: "timestamp",
    default: () => "CURRENT_TIMESTAMP",
  })
  effectiveFrom: Date;

  /**
   * Date until which this tax information is effective (null means indefinitely)
   * @type {Date}
   */
  @Column({ name: "effective_to", type: "timestamp", nullable: true })
  effectiveTo: Date;

  // ========== HELPER METHODS ==========

  /**
   * Checks if this tax information is currently active based on effective dates
   * @returns {boolean} True if the tax information is currently active
   * @example
   * const isActive = taxInfo.isActive(); // true if within effective date range
   */
  isActive(): boolean {
    const now = new Date();
    return (
      this.effectiveFrom <= now &&
      (!this.effectiveTo || this.effectiveTo >= now)
    );
  }

  /**
   * Determines if verification is required for this tax information
   * @returns {boolean} True if verification is needed
   * @example
   * const needsVerification = taxInfo.requiresVerification();
   */
  requiresVerification(): boolean {
    return (
      !this.isVerified ||
      this.verificationDocuments?.some((doc) => doc.status === "PENDING")
    );
  }

  /**
   * Returns the tax identifier as a string
   * @returns {string} The tax identifier
   * @example
   * const taxIdentifier = taxInfo.getTaxIdentifier();
   */
  getTaxIdentifier(): string {
    return `${this.countryCode}${this.taxId}`;
  }
}
