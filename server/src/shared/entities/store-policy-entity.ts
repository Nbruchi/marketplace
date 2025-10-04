import { Entity, Column, JoinColumn, ManyToOne } from "typeorm";
import { SellerProfile } from "./seller-profile-entity";
import { BaseEntity } from "./base-entity";
import { PolicyType } from "../enums/store-enum";

/**
 * StorePolicy Entity
 * Represents various policies (return, shipping, refund, warranty) for a seller's store.
 * Each policy type has specific details stored in a flexible JSONB structure.
 *
 * @class StorePolicy
 */
@Entity("store_policies")
export class StorePolicy extends BaseEntity {
  // ========== SELLER RELATIONSHIP ==========

  /**
   * ID of the seller who owns this policy
   * @type {string}
   */
  @Column({ type: "uuid", nullable: true })
  sellerId: string;

  /**
   * The seller profile associated with this policy
   * @type {SellerProfile}
   */
  @ManyToOne(() => SellerProfile, (seller) => seller.id, {
    onDelete: "CASCADE",
  })
  @JoinColumn({ name: "seller_id" })
  seller: SellerProfile;

  // ========== POLICY DETAILS ==========

  /**
   * Type of the policy
   * @type {PolicyType}
   * @default PolicyType.RETURN
   */
  @Column({
    type: "enum",
    enum: PolicyType,
    default: PolicyType.RETURN,
  })
  type: PolicyType;

  /**
   * Title of the policy
   * @type {string}
   * @example '30-Day Return Policy'
   */
  @Column({ type: "varchar", length: 255 })
  title: string;

  /**
   * Full content/description of the policy
   * @type {string}
   */
  @Column({ type: "text", nullable: true })
  content: string;

  /**
   * Policy-specific details stored in a flexible JSONB structure.
   * The structure varies based on the policy type.
   * @type {object}
   * @property {number} [details.returnWindowDays] - Number of days for return window (Return Policy)
   * @property {'SELLER'|'BUYER'} [details.returnShippingPaidBy] - Who pays for return shipping (Return Policy)
   * @property {boolean} [details.refundWithoutReturn] - Whether refund is allowed without returning the item (Return Policy)
   * @property {'ORIGINAL_PAYMENT'|'STORE_CREDIT'} [details.refundMethod] - Method of refund (Return Policy)
   * @property {number} [details.processingTimeDays] - Processing time in days (Shipping Policy)
   * @property {Array} [details.shippingRegions] - Shipping regions and methods (Shipping Policy)
   * @property {string} details.shippingRegions.country - Country code
   * @property {string[]} [details.shippingRegions.regions] - Specific regions within the country
   * @property {Array} details.shippingRegions.shippingMethods - Available shipping methods
   * @property {string} details.shippingRegions.shippingMethods.name - Name of shipping method
   * @property {number} details.shippingRegions.shippingMethods.price - Shipping price
   * @property {string} details.shippingRegions.shippingMethods.estimatedDelivery - Estimated delivery time
   * @property {number} [details.shippingRegions.shippingMethods.freeThreshold] - Order amount for free shipping
   * @property {number} [details.refundTimeframe] - Timeframe for refunds in days (Refund Policy)
   * @property {string[]} [details.refundMethods] - Available refund methods (Refund Policy)
   * @property {string[]} [details.nonRefundableItems] - List of non-refundable items (Refund Policy)
   * @property {number} [details.warrantyPeriodMonths] - Warranty period in months (Warranty Policy)
   * @property {'MANUFACTURER'|'SELLER'} [details.warrantyType] - Type of warranty (Warranty Policy)
   * @property {'REPLACEMENT'|'REPAIR'|'REFUND'} [details.warrantyServiceType] - Type of warranty service (Warranty Policy)
   * @property {Object} [details.contactInfo] - Contact information for policy-related queries
   * @property {string} details.contactInfo.email - Contact email
   * @property {string} details.contactInfo.phone - Contact phone number
   * @property {string} details.contactInfo.hours - Business hours
   * @property {string} [details.additionalTerms] - Any additional terms and conditions
   */
  @Column({ type: "jsonb", nullable: true })
  details: {
    // Return Policy
    returnWindowDays?: number;
    returnShippingPaidBy?: "SELLER" | "BUYER";
    refundWithoutReturn?: boolean;
    refundMethod?: "ORIGINAL_PAYMENT" | "STORE_CREDIT";

    // Shipping Policy
    processingTimeDays?: number;
    shippingRegions?: Array<{
      country: string;
      regions?: string[];
      shippingMethods: Array<{
        name: string;
        price: number;
        estimatedDelivery: string;
        freeThreshold?: number;
      }>;
    }>;

    // Refund Policy
    refundTimeframe?: number;
    refundMethods?: string[];
    nonRefundableItems?: string[];

    // Warranty Policy
    warrantyPeriodMonths?: number;
    warrantyType?: "MANUFACTURER" | "SELLER";
    warrantyServiceType?: "REPLACEMENT" | "REPAIR" | "REFUND";

    // Common
    contactInfo?: {
      email: string;
      phone: string;
      hours: string;
    };
    additionalTerms?: string;
  };

  // ========== STATUS & VERSIONING ==========

  /**
   * Whether the policy is currently active
   * @type {boolean}
   * @default true
   */
  @Column({ default: true })
  isActive: boolean;

  /**
   * Date and time when the policy becomes effective
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
   * Date and time when the policy expires (null if no expiration)
   * @type {Date}
   */
  @Column({ name: "effective_to", type: "timestamp", nullable: true })
  effectiveTo: Date;

  /**
   * Version number of the policy (incremented on updates)
   * @type {number}
   * @default 1
   */
  @Column({ default: 1 })
  version: number;

  /**
   * Whether this is the current version of the policy
   * @type {boolean}
   * @default true
   */
  @Column({ name: "is_current", default: true })
  isCurrent: boolean;

  // ========== HELPER METHODS ==========

  /**
   * Checks if the policy is currently in effect
   * @returns {boolean} True if the policy is active and within its effective date range
   * @example
   * if (policy.isEffective()) {
   *   console.log('This policy is currently in effect');
   * }
   */
  isEffective(): boolean {
    const now = new Date();
    return (
      this.isActive &&
      this.effectiveFrom <= now &&
      (!this.effectiveTo || this.effectiveTo >= now)
    );
  }

  /**
   * Gets a human-readable summary of the policy based on its type
   * @returns {string} A summary of the policy
   * @example
   * // Returns 'Returns accepted within 30 days' for a return policy
   * const summary = policy.getPolicySummary();
   */
  getPolicySummary(): string {
    switch (this.type) {
      case PolicyType.RETURN:
        return `Returns accepted within ${this.details?.returnWindowDays || 30} days`;
      case PolicyType.SHIPPING:
        return `Processing time: ${this.details?.processingTimeDays || "1-3"} business days`;
      case PolicyType.REFUND:
        return `Refunds processed within ${this.details?.refundTimeframe || 14} days`;
      case PolicyType.WARRANTY:
        return `Warranty: ${this.details?.warrantyPeriodMonths || 12} months`;
      default:
        return this.title;
    }
  }
}
