import { Entity, Column, ManyToOne, JoinColumn } from "typeorm";
import { Cart } from "./cart-entity";
import { BaseEntity } from "./base-entity";

/**
 * CartItem Entity
 * Represents an item in a shopping cart, linking a product variant to a cart with quantity and pricing information.
 */
@Entity("cart_items")
export class CartItem extends BaseEntity {
  // ========== CART RELATIONSHIP ==========

  /**
   * ID of the cart this item belongs to
   */
  @Column({ type: "uuid" })
  cartId: string;

  /**
   * The cart this item belongs to
   */
  @ManyToOne(() => Cart, (cart) => cart.items, { onDelete: "CASCADE" })
  @JoinColumn({ name: "cart_id" })
  cart: Cart;

  // ========== PRODUCT INFORMATION ==========

  /**
   * ID of the product this item represents
   */
  @Column({ type: "uuid" })
  productId: string;

  /**
   * ID of the specific product variant
   */
  @Column({ type: "uuid" })
  variantId: string;

  /**
   * Display name of the product
   * @example 'Wireless Bluetooth Headphones'
   */
  @Column()
  name: string;

  /**
   * Detailed description of the product
   * @example 'High-quality wireless headphones with noise cancellation and 30-hour battery life.'
   */
  @Column({ type: "text", nullable: true })
  description: string;

  /**
   * Primary product image with URL and alt text
   */
  @Column({ type: "jsonb", nullable: true })
  image: {
    /** URL to the product image */
    url: string;
    /** Alt text for accessibility */
    alt: string;
  };

  // ========== VARIANT INFORMATION ==========

  /**
   * Key-value pairs of variant attributes (e.g., color, size, material)
   * @example { color: 'Black', size: 'M', material: 'Cotton' }
   */
  @Column({ type: "jsonb", nullable: true })
  attributes: Record<string, any>;

  // ========== PRICING ==========

  /**
   * Unit price of the product variant
   * @example 99.99
   */
  @Column({ type: "decimal", precision: 12, scale: 2 })
  price: number;

  /**
   * Quantity of this item in the cart
   * @minimum 1
   * @default 1
   */
  @Column({ type: "int", default: 1 })
  quantity: number;

  /**
   * Discount amount applied to this line item
   * @minimum 0
   * @default 0
   */
  @Column({ type: "decimal", precision: 12, scale: 2, default: 0 })
  discount: number;

  /**
   * Calculated total for this line item (price * quantity - discount)
   * @example 99.99
   */
  @Column({ type: "decimal", precision: 12, scale: 2 })
  total: number;

  // ========== SELLER INFORMATION ==========

  /**
   * ID of the seller who offers this product
   */
  @Column({ type: "uuid" })
  sellerId: string;

  /**
   * Display name of the seller
   * @example 'Electronics World'
   */
  @Column({ type: "varchar", length: 100 })
  sellerName: string;

  // ========== HELPER METHODS ==========

  /**
   * Calculates the total price for this line item
   * @internal
   */
  calculateTotal(): void {
    this.total = this.price * this.quantity - this.discount;
  }

  /**
   * Updates the quantity and recalculates the total
   * @param quantity - New quantity (must be at least 1)
   * @throws {Error} If quantity is less than 1
   */
  updateQuantity(quantity: number): void {
    if (quantity < 1) {
      throw new Error("Quantity must be at least 1");
    }
    this.quantity = quantity;
    this.calculateTotal();
  }

  /**
   * Applies a discount to this line item
   * @param amount - The discount amount
   * @param type - Type of discount ('FIXED' or 'PERCENTAGE')
   * @default 'FIXED'
   * @example
   * // Apply $10 off
   * item.applyDiscount(10);
   * // Apply 20% off
   * item.applyDiscount(20, 'PERCENTAGE');
   */
  applyDiscount(amount: number, type: "FIXED" | "PERCENTAGE" = "FIXED"): void {
    if (amount <= 0) {
      throw new Error("Discount amount must be greater than 0");
    }

    if (type === "PERCENTAGE") {
      if (amount > 100) {
        throw new Error("Percentage discount cannot exceed 100%");
      }
      this.discount = (this.price * this.quantity * amount) / 100;
    } else {
      this.discount = Math.min(amount, this.price * this.quantity);
    }
    this.calculateTotal();
  }
}
