import { 
  Entity, 
  PrimaryGeneratedColumn, 
  Column, 
  CreateDateColumn, 
  UpdateDateColumn, 
  ManyToOne,
  JoinColumn
} from 'typeorm';
import { Order } from './order-entity';
import { ProductVariant } from './product-variant-entity';
import { OrderItemStatus } from '../enums/order-enum';
import { BaseEntity } from './base-entity';

/**
 * OrderItem Entity
 * Represents a single item within an order
 * @class OrderItem
 */
@Entity('order_items')
export class OrderItem extends BaseEntity{
  // ========== ORDER RELATIONSHIP ==========

  /**
   * ID of the order this item belongs to
   * @type {string}
   */
  @Column({ type: 'uuid' })
  orderId: string;

  /**
   * The order this item belongs to
   * @type {Order}
   */
  @ManyToOne(() => Order, (order) => order.items, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'order_id' })
  order: Order;

  // ========== PRODUCT INFORMATION ==========

  /**
   * ID of the product this item represents
   * @type {string}
   */
  @Column({ type: 'uuid' })
  productId: string;

  /**
   * ID of the specific product variant ordered
   * @type {string}
   */
  @Column({ type: 'uuid' })
  variantId: string;

  /**
   * The specific product variant that was ordered
   * @type {ProductVariant}
   */
  @ManyToOne(() => ProductVariant, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'variant_id' })
  variant: ProductVariant;

  // ========== ITEM DETAILS ==========

  /**
   * Name of the product at the time of purchase
   * @type {string}
   * @example 'Premium Wireless Headphones'
   */
  @Column()
  name: string;

  /**
   * Description of the product at the time of purchase
   * @type {string}
   */
  @Column({ type: 'text', nullable: true })
  description: string;

  /**
   * Product attributes/variants at the time of purchase
   * @type {Record<string, any>}
   * @example { 'color': 'Black', 'size': 'M' }
   */
  @Column({ type: 'jsonb', nullable: true })
  attributes: Record<string, any>;

  /**
   * Product image details at the time of purchase
   * @type {{ url: string; alt: string; }}
   */
  @Column({ type: 'jsonb', nullable: true })
  image: {
    /** URL of the product image */
    url: string;
    /** Alt text for the product image */
    alt: string;
  };

  // ========== PRICING ==========

  /**
   * Unit price of the item (before tax and discounts)
   * @type {number}
   * @example 99.99
   */
  @Column({ type: 'decimal', precision: 12, scale: 2 })
  price: number;

  /**
   * Tax amount for this item
   * @type {number}
   * @default 0
   */
  @Column({ type: 'decimal', precision: 12, scale: 2, default: 0 })
  tax: number;

  /**
   * Discount amount applied to this item
   * @type {number}
   * @default 0
   */
  @Column({ type: 'decimal', precision: 12, scale: 2, default: 0 })
  discount: number;

  /**
   * Quantity of this item in the order
   * @type {number}
   * @example 2
   */
  @Column({ type: 'int' })
  quantity: number;

  /**
   * Total price for this line item (price * quantity - discount + tax)
   * @type {number}
   */
  @Column({ type: 'decimal', precision: 12, scale: 2 })
  total: number;

  // ========== SELLER INFORMATION ==========

  /**
   * ID of the seller who fulfilled this item
   * @type {string}
   */
  @Column({ type: 'uuid' })
  sellerId: string;

  // ========== STATUS ==========

  /**
   * Current status of this order item
   * @type {OrderItemStatus}
   * @default OrderItemStatus.PENDING
   */
  @Column({
    type: 'enum',
    enum: OrderItemStatus,
    default: OrderItemStatus.PENDING,
  })
  status: OrderItemStatus;

  // ========== SHIPPING INFORMATION ==========

  /**
   * Shipping details for this item
   * @type {Object}
   * @property {string} carrier - Name of the shipping carrier
   * @property {string} trackingNumber - Tracking number for the shipment
   * @property {string} trackingUrl - URL to track the shipment
   * @property {Date} shippedAt - When the item was shipped
   * @property {Date} deliveredAt - When the item was delivered
   */
  @Column({ type: 'jsonb', nullable: true })
  shipping: {
    carrier: string;
    trackingNumber: string;
    trackingUrl: string;
    shippedAt: Date;
    deliveredAt: Date;
  };

  // ========== RETURN/REFUND INFORMATION ==========

  /**
   * Information about returns or refunds for this item
   * @type {{
   *   reason: string;
   *   status: 'REQUESTED' | 'APPROVED' | 'REJECTED' | 'RECEIVED' | 'REFUNDED';
   *   requestedAt: Date;
   *   receivedAt: Date;
   *   refundedAt: Date;
   *   notes: string;
   * }}
   */
  @Column({ type: 'jsonb', nullable: true })
  returnInfo: {
    /** Reason for the return/refund */
    reason: string;
    /** Current status of the return/refund request */
    status: 'REQUESTED' | 'APPROVED' | 'REJECTED' | 'RECEIVED' | 'REFUNDED';
    /** When the return was requested */
    requestedAt: Date;
    /** When the returned item was received */
    receivedAt: Date;
    /** When the refund was processed */
    refundedAt: Date;
    /** Additional notes about the return/refund */
    notes: string;
  };

  // ========== HELPER METHODS ==========

  /**
   * Calculates the total price for this line item
   * @returns {number} Total price (price * quantity + tax - discount)
   * @example
   * const total = item.getTotalPrice();
   */
  getTotalPrice(): number {
    return this.price * this.quantity + this.tax - this.discount;
  }

  /**
   * Checks if this item can be returned based on delivery status and return policy
   * @returns {boolean} True if the item is eligible for return
   * @example
   * if (item.canBeReturned()) {
   *   // Show return button
   * }
   */
  canBeReturned(): boolean {
    if (this.status !== OrderItemStatus.DELIVERED) return false;

    const deliveryDate = this.shipping?.deliveredAt || this.createdAt;
    const daysSinceDelivery =
      (new Date().getTime() - deliveryDate.getTime()) / (1000 * 60 * 60 * 24);

    return daysSinceDelivery <= 30; // 30-day return policy
  }

  /**
   * Checks if this item is eligible for a refund
   * @returns {boolean} True if the item can be refunded
   * @example
   * if (item.isRefundable()) {
   *   // Process refund
   * }
   */
  isRefundable(): boolean {
    return [
      OrderItemStatus.DELIVERED,
      OrderItemStatus.RETURN_REQUESTED,
      OrderItemStatus.RETURNED,
    ].includes(this.status);
  }
}
