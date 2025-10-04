import {
  Entity,
  Column,
  ManyToOne,
  OneToMany,
  JoinColumn,
  ManyToMany,
  JoinTable,
} from "typeorm";
import { User } from "./user-entity";
import { Category } from "./category-entity";
import { ProductImage } from "./product-image-entity";
import { ProductVariant } from "./product-variant-entity";
import { Review } from "./review-entity";
import { SellerShop } from "./seller-shop-entity";
import { ProductStatus, ProductCondition } from "../enums/product-enum";
import { BaseEntity } from "./base-entity";

/**
 * Product Entity
 * Represents a sellable product in the e-commerce system.
 * Products can have multiple variants, images, and belong to multiple categories.
 */
@Entity("products")
export class Product extends BaseEntity {
  /**
   * Stock Keeping Unit - unique identifier for inventory tracking
   * @example 'PROD-12345-BLUE'
   */
  @Column({ unique: true })
  sku: string;

  /**
   * Display name of the product
   * @example 'Wireless Bluetooth Headphones'
   */
  @Column()
  name: string;

  /**
   * URL-friendly version of the product name
   * @example 'wireless-bluetooth-headphones'
   */
  @Column({ unique: true })
  slug: string;

  /**
   * Detailed product description
   * Can include HTML or markdown content
   * @example '<p>High-quality wireless headphones with noise cancellation...</p>'
   */
  @Column("text")
  description: string;

  /**
   * Brief product summary for listings and previews
   * @example 'Premium wireless headphones with 30-hour battery life'
   */
  @Column("text", { nullable: true })
  shortDescription: string;

  /**
   * Current selling price of the product
   * @example 99.99
   */
  @Column("decimal", { precision: 12, scale: 2 })
  price: number;

  /**
   * Original price before discount (for showing strikethrough pricing)
   * @example 129.99
   */
  @Column("decimal", { precision: 12, scale: 2, nullable: true })
  compareAtPrice: number;

  /**
   * Cost of the product for profit calculation
   * @example 45.50
   */
  @Column("decimal", { precision: 12, scale: 2, nullable: true })
  costPerItem: number;

  /**
   * Current stock quantity
   * @default 0
   */
  @Column({ default: 0 })
  quantity: number;

  /**
   * Current status of the product
   * @default ProductStatus.DRAFT
   */
  @Column({ type: "enum", enum: ProductStatus, default: ProductStatus.DRAFT })
  status: ProductStatus;

  /**
   * Physical condition of the product
   * @default ProductCondition.NEW
   */
  @Column({
    type: "enum",
    enum: ProductCondition,
    default: ProductCondition.NEW,
  })
  condition: ProductCondition;

  /**
   * Whether to track inventory for this product
   * @default true
   */
  @Column({ default: true })
  trackInventory: boolean;

  /**
   * Total number of units sold
   * @default 0
   */
  @Column({ default: 0 })
  sold: number;

  /**
   * Total number of product page views
   * @default 0
   */
  @Column({ default: 0 })
  views: number;

  /**
   * Flexible field for storing additional product data
   * Can include specifications, features, SEO metadata, etc.
   * @example { color: 'Black', weight: '250g', dimensions: '10x5x15cm' }
   */
  @Column({ type: "jsonb", nullable: true })
  metadata: Record<string, any>;

  /**
   * Whether the product is featured (shown in featured sections)
   * @default false
   */
  @Column({ type: "boolean", default: false })
  isFeatured: boolean;

  /**
   * Whether the product is active and visible to customers
   * @default true
   */
  @Column({ type: "boolean", default: true })
  isActive: boolean;

  /**
   * Whether this is a digital product (downloadable)
   * @default false
   */
  @Column({ type: "boolean", default: false })
  isDigital: boolean;

  /**
   * Whether this product can be shipped
   * @default false
   */
  @Column({ type: "boolean", default: false })
  isShippable: boolean;

  /**
   * Whether sales tax applies to this product
   * @default false
   */
  @Column({ type: "boolean", default: false })
  isTaxable: boolean;

  /**
   * Whether shipping is required for this product
   * @default false
   */
  @Column({ type: "boolean", default: false })
  requiresShipping: boolean;

  /**
   * ID of the seller (User) who owns this product
   */
  @Column({ type: "uuid" })
  sellerId: string;

  /**
   * The seller (User) who owns this product
   */
  @ManyToOne(() => User, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  @JoinColumn({ name: "seller_id" })
  seller: User;

  /**
   * Optional shop the product belongs to
   */
  @Column({ name: "shop_id", type: "uuid", nullable: true })
  shopId: string | null;

  @ManyToOne(() => SellerShop, (shop) => shop.products, {
    nullable: true,
    onDelete: "SET NULL",
  })
  @JoinColumn({ name: "shop_id" })
  shop: SellerShop | null;

  /**
   * Categories this product belongs to
   * Many-to-many relationship with Category entity
   */
  @ManyToMany(() => Category, (category) => category.products, {
    cascade: true,
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  @JoinTable({
    name: "product_categories",
    joinColumn: { name: "product_id", referencedColumnName: "id" },
    inverseJoinColumn: { name: "category_id", referencedColumnName: "id" },
  })
  categories: Category[];

  /**
   * Product images/gallery
   */
  @OneToMany(() => ProductImage, (image) => image.product, {
    cascade: true,
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  images: ProductImage[];

  /**
   * Product variants (different sizes, colors, etc.)
   */
  @OneToMany(() => ProductVariant, (variant) => variant.product, {
    cascade: true,
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  variants: ProductVariant[];

  /**
   * Customer reviews for this product
   */
  @OneToMany(() => Review, (review) => review.product, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  reviews: Review[];

  /**
   * Checks if there is enough stock for a given quantity
   * @param quantity - The quantity to check
   * @returns boolean - True if there is sufficient stock
   * @example
   * if (product.hasStock(2)) {
   *   // Proceed with order
   * }
   */
  hasStock(quantity: number = 1): boolean {
    return this.quantity >= quantity;
  }

  /**
   * Checks if the product is available for purchase
   * @returns boolean - True if product is active and in stock
   */
  isAvailable(): boolean {
    return this.status === ProductStatus.ACTIVE && this.quantity > 0;
  }

  /**
   * Adds stock to the product
   * @param quantity - The quantity to add
   */
  addToStock(quantity: number): void {
    if (quantity > 0) {
      this.quantity += quantity;
    }
  }

  /**
   * Removes stock from the product
   * @param quantity - The quantity to remove
   * @returns boolean - True if stock was successfully removed
   */
  removeFromStock(quantity: number): boolean {
    if (quantity <= 0 || this.quantity < quantity) {
      return false;
    }
    this.quantity -= quantity;
    return true;
  }
}
