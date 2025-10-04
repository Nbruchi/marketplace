import { Entity, Column, OneToOne, OneToMany, JoinColumn } from "typeorm";
import { User } from "./user-entity";
import { CartItem } from "./cart-item-entity";
import { CartStatus } from "../enums/cart-enum";
import { BaseEntity } from "./base-entity";

/**
 * Cart Entity
 * Represents a shopping cart that holds items a user intends to purchase.
 * Manages cart items, pricing, discounts, and shipping information.
 */
@Entity("carts")
export class Cart extends BaseEntity {
  // ========== USER & SESSION RELATIONSHIPS ==========

  /**
   * ID of the authenticated user who owns this cart (null for guest users)
   */
  @Column({ type: "uuid", nullable: true })
  userId: string | null;

  /**
   * The authenticated user who owns this cart (null for guest users)
   */
  @OneToOne(() => User, {
    onDelete: "CASCADE",
    nullable: true,
  })
  @JoinColumn({ name: "user_id" })
  user: User | null;

  /**
   * Session ID for guest users (null for authenticated users)
   * This is used to track carts for users who haven't logged in yet
   */
  @Column({
    name: "session_id",
    type: "varchar",
    length: 255,
    nullable: true,
    unique: true,
  })
  sessionId: string | null;

  // ========== CART ITEMS ==========

  /**
   * Items currently in the shopping cart
   */
  @OneToMany(() => CartItem, (item) => item.cart, { cascade: true })
  items: CartItem[];

  // ========== CART STATUS ==========

  /**
   * Current status of the cart
   * @default CartStatus.ACTIVE
   */
  @Column({
    type: "enum",
    enum: CartStatus,
    default: CartStatus.ACTIVE,
  })
  status: CartStatus;

  // ========== PRICING ==========

  /**
   * Sum of all item prices before tax, shipping, and discounts
   * @example 99.99
   */
  @Column({ type: "decimal", precision: 12, scale: 2, default: 0 })
  subtotal: number;

  /**
   * Total tax amount calculated for the cart
   * @example 8.50
   */
  @Column({ type: "decimal", precision: 12, scale: 2, default: 0 })
  tax: number;

  /**
   * Shipping cost for the cart
   * @example 5.99
   */
  @Column({ type: "decimal", precision: 12, scale: 2, default: 0 })
  shipping: number;

  /**
   * Total discount amount applied to the cart
   * @example 10.00
   */
  @Column({ type: "decimal", precision: 12, scale: 2, default: 0 })
  discount: number;

  /**
   * Final total amount (subtotal + tax + shipping - discount)
   * @example 104.48
   */
  @Column({ type: "decimal", precision: 12, scale: 2, default: 0 })
  total: number;

  // ========== DISCOUNTS & COUPONS ==========

  /**
   * List of discounts applied to the cart
   * @example [{
   *   code: 'SUMMER20',
   *   type: 'PERCENTAGE',
   *   value: 20,
   *   description: 'Summer Sale 20% Off',
   *   appliesTo: 'ENTIRE_ORDER'
   * }]
   */
  @Column({ type: "jsonb", nullable: true })
  discounts: Array<{
    /** Discount or coupon code */
    code: string;
    /** Type of discount */
    type: "PERCENTAGE" | "FIXED" | "FREE_SHIPPING";
    /** Discount value (percentage or fixed amount) */
    value: number;
    /** Human-readable description of the discount */
    description: string;
    /** What the discount applies to */
    appliesTo: "ENTIRE_ORDER" | "SPECIFIC_ITEMS" | "SHIPPING";
    /** For discounts that apply to specific items only */
    itemIds?: string[];
  }>;

  // ========== SHIPPING INFORMATION ==========

  /**
   * Shipping address for the order
   * @example {
   *   id: '550e8400-e29b-41d4-a716-446655440000',
   *   fullName: 'John Smith',
   *   street: '123 Main St',
   *   city: 'New York',
   *   state: 'NY',
   *   postalCode: '10001',
   *   country: 'United States',
   *   phone: '+1234567890'
   * }
   */
  @Column({ type: "jsonb", nullable: true })
  shippingAddress: {
    /** Address ID from the user's saved addresses */
    id: string;
    /** Recipient's full name */
    fullName: string;
    /** Street address */
    street: string;
    /** City */
    city: string;
    /** State/Province/Region */
    state: string;
    /** Postal/ZIP code */
    postalCode: string;
    /** Country */
    country: string;
    /** Contact phone number */
    phone: string;
  };

  /**
   * When the cart will expire if not converted to an order
   * Typically set to 30 days after creation
   */
  @Column({
    name: "expires_at",
    type: "timestamp with time zone",
    nullable: true,
  })
  expiresAt: Date;

  // ========== HELPER METHODS ==========

  /**
   * Recalculates all cart totals including subtotal, tax, and final total
   * @internal
   */
  calculateTotals(): void {
    this.subtotal = this.items.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0,
    );
    // Note: Tax and shipping would be calculated based on business rules
    this.total = this.subtotal + this.tax + this.shipping - this.discount;
  }

  /**
   * Gets the total number of items in the cart (sum of quantities)
   * @returns Total item count
   * @example
   * const itemCount = cart.getItemCount();
   */
  getItemCount(): number {
    return this.items.reduce((count, item) => count + item.quantity, 0);
  }

  /**
   * Adds an item to the cart or updates quantity if item already exists
   * @param item - The item to add or update
   * @example
   * cart.addItem({
   *   productId: '123',
   *   variantId: '456',
   *   name: 'Product Name',
   *   price: 29.99,
   *   quantity: 2
   * });
   */
  addItem(item: Partial<CartItem>): void {
    // Check if item already exists in cart
    const existingItem = this.items.find(
      (i) => i.productId === item.productId && i.variantId === item.variantId,
    );

    if (existingItem) {
      existingItem.quantity += item.quantity || 1;
    } else {
      const newItem = new CartItem();
      Object.assign(newItem, item);
      this.items.push(newItem);
    }

    this.calculateTotals();
  }

  /**
   * Removes an item from the cart by its ID
   * @param itemId - ID of the item to remove
   * @example
   * cart.removeItem('550e8400-e29b-41d4-a716-446655440000');
   */
  removeItem(itemId: string): void {
    this.items = this.items.filter((item) => item.id !== itemId);
    this.calculateTotals();
  }

  /**
   * Updates the quantity of a specific item in the cart
   * @param itemId - ID of the item to update
   * @param quantity - New quantity (must be at least 1)
   * @throws {Error} If quantity is less than 1
   * @example
   * cart.updateItemQuantity('550e8400-e29b-41d4-a716-446655440000', 3);
   */
  updateItemQuantity(itemId: string, quantity: number): void {
    if (quantity < 1) {
      throw new Error("Quantity must be at least 1");
    }

    const item = this.items.find((i) => i.id === itemId);
    if (item) {
      item.quantity = quantity;
      this.calculateTotals();
    }
  }

  /**
   * Clears all items and resets the cart to its initial state
   * @example
   * cart.clear();
   */
  clear(): void {
    this.items = [];
    this.subtotal = 0;
    this.tax = 0;
    this.shipping = 0;
    this.discount = 0;
    this.total = 0;
    this.discounts = [];
  }
}
