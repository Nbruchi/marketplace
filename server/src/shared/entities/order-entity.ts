import { Entity, Column, ManyToOne, OneToMany, JoinColumn } from "typeorm";
import { User } from "./user-entity";
import { OrderItem } from "./order-item-entity";
import { Address } from "./address-entity";
import { OrderStatus } from "../enums/order-enum";
import { PaymentStatus } from "../enums/payment-enum";
import { RefundRequest } from "./refund-request-entity";
import { BaseEntity } from "./base-entity";

/**
 * Order Entity
 * Represents a customer's order in the e-commerce system
 * @class Order
 */
@Entity("orders")
export class Order extends BaseEntity {
  /**
   * Human-readable order number (e.g., 'ORD-2023-1001')
   * @type {string}
   * @example 'ORD-2023-1001'
   */
  @Column({ unique: true })
  orderNumber: string;

  // ========== CUSTOMER INFORMATION ==========

  /**
   * ID of the customer who placed the order
   * @type {string}
   */
  @Column({ type: "uuid" })
  customerId: string;

  /**
   * The customer who placed the order
   * @type {User}
   */
  @ManyToOne(() => User, { onDelete: "SET NULL" })
  @JoinColumn({ name: "customer_id" })
  customer: User;

  // ========== ORDER DETAILS ==========

  /**
   * Current status of the order
   * @type {OrderStatus}
   * @default OrderStatus.PENDING
   */
  @Column({ type: "enum", enum: OrderStatus, default: OrderStatus.PENDING })
  status: OrderStatus;

  /**
   * Current payment status of the order
   * @type {PaymentStatus}
   * @default PaymentStatus.PENDING
   */
  @Column({ type: "enum", enum: PaymentStatus, default: PaymentStatus.PENDING })
  paymentStatus: PaymentStatus;

  /**
   * Subtotal of all items before tax and shipping
   * @type {number}
   * @example 99.99
   */
  @Column({ type: "decimal", precision: 12, scale: 2 })
  subtotal: number;

  /**
   * Total tax amount for the order
   * @type {number}
   * @default 0
   */
  @Column({ type: "decimal", precision: 12, scale: 2, default: 0 })
  tax: number;

  /**
   * Shipping cost for the order
   * @type {number}
   * @default 0
   */
  @Column({ type: "decimal", precision: 12, scale: 2, default: 0 })
  shipping: number;

  /**
   * Total order amount (subtotal + tax + shipping - discount)
   * @type {number}
   * @example 119.98
   */
  @Column({ type: "decimal", precision: 12, scale: 2 })
  total: number;

  /**
   * Information about any discounts applied to the order
   * @type {{
   *   code: string;
   *   amount: number;
   *   type: 'PERCENTAGE' | 'FIXED';
   * }}
   * @example { code: 'SUMMER10', amount: 10, type: 'PERCENTAGE' }
   */
  @Column({ type: "jsonb", nullable: true })
  discount: {
    /** Discount code used */
    code: string;
    /** Discount amount (either fixed or percentage) */
    amount: number;
    /** Type of discount */
    type: "PERCENTAGE" | "FIXED";
  };

  // ========== ADDRESS INFORMATION ==========

  /**
   * ID of the shipping address
   * @type {string}
   */
  @Column({ type: "uuid", nullable: true })
  shippingAddressId: string;

  /**
   * The shipping address for the order
   * @type {Address}
   */
  @ManyToOne(() => Address, { onDelete: "SET NULL" })
  @JoinColumn({ name: "shipping_address_id" })
  shippingAddress: Address;

  /**
   * ID of the billing address
   * @type {string}
   */
  @Column({ type: "uuid", nullable: true })
  billingAddressId: string;

  /**
   * The billing address for the order
   * @type {Address}
   */
  @ManyToOne(() => Address, { onDelete: "SET NULL" })
  @JoinColumn({ name: "billing_address_id" })
  billingAddress: Address;

  // ========== ORDER ITEMS ==========

  /**
   * Items included in this order
   * @type {OrderItem[]}
   */
  @OneToMany(() => OrderItem, (item) => item.order, { cascade: true })
  items: OrderItem[];

  @OneToMany(() => RefundRequest, (refundRequest) => refundRequest.order, {
    cascade: true,
  })
  refundRequests: RefundRequest[];

  // ========== PAYMENT INFORMATION ==========

  /**
   * Payment details for the order
   * @type {{
   *   method: string;
   *   transactionId: string;
   *   paymentIntentId: string;
   *   paymentMethodId: string;
   *   receiptUrl: string;
   *   paidAt: Date;
   * }}
   */
  @Column({ type: "jsonb", nullable: true })
  payment: {
    /** Payment method used (e.g., 'credit_card', 'paypal') */
    method: string;
    /** Transaction ID from the payment processor */
    transactionId: string;
    /** Payment intent ID (for Stripe or similar) */
    paymentIntentId: string;
    /** ID of the payment method used */
    paymentMethodId: string;
    /** URL to the payment receipt */
    receiptUrl: string;
    /** When the payment was processed */
    paidAt: Date;
  };

  // ========== SHIPPING INFORMATION ==========

  /**
   * Shipping and tracking information
   * @type {{
   *   carrier: string;
   *   trackingNumber: string;
   *   trackingUrl: string;
   *   shippedAt: Date;
   *   estimatedDelivery: Date;
   * }}
   */
  @Column({ type: "jsonb", nullable: true })
  shippingInfo: {
    /** Name of the shipping carrier */
    carrier: string;
    /** Tracking number for the shipment */
    trackingNumber: string;
    /** URL to track the shipment */
    trackingUrl: string;
    /** When the order was shipped */
    shippedAt: Date;
    /** Estimated delivery date */
    estimatedDelivery: Date;
  };

  // ========== CUSTOMER NOTES ==========

  /**
   * Any special instructions or notes from the customer
   * @type {string}
   * @example 'Please leave the package at the front door.'
   */
  @Column({ type: "text", nullable: true })
  customerNote: string;

  // ========== HELPER METHODS ==========

  /**
   * Calculates the total order amount including all fees and discounts
   * @returns {number} The total order amount
   * @example
   * const total = order.getOrderTotal();
   */
  getOrderTotal(): number {
    return (
      this.subtotal + this.tax + this.shipping - (this.discount?.amount || 0)
    );
  }

  /**
   * Checks if the order can be cancelled
   * @returns {boolean} True if the order can be cancelled
   * @example
   * if (order.canBeCancelled()) {
   *   // Show cancel button
   * }
   */
  canBeCancelled(): boolean {
    return [OrderStatus.PENDING, OrderStatus.PROCESSING].includes(this.status);
  }

  /**
   * Checks if the order is eligible for return
   * @returns {boolean} True if the order can be returned
   * @example
   * if (order.canBeReturned()) {
   *   // Show return options
   * }
   */
  canBeReturned(): boolean {
    const deliveryDate = this.shippingInfo?.shippedAt || this.createdAt;
    const daysSinceDelivery =
      (new Date().getTime() - deliveryDate.getTime()) / (1000 * 60 * 60 * 24);

    return this.status === OrderStatus.DELIVERED && daysSinceDelivery <= 30;
  }
}
