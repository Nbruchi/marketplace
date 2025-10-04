import { Entity, Column, ManyToOne, JoinColumn } from "typeorm";
import { Wishlist } from "./wishlist-entity";
import { Product } from "./product-entity";
import { ProductVariant } from "./product-variant-entity";
import { BaseEntity } from "./base-entity";

@Entity("wishlist_items")
export class WishlistItem extends BaseEntity {
  @Column({ type: "uuid" })
  wishlistId: string;

  @Column({ type: "uuid" })
  productId: string;

  @Column({ type: "uuid", nullable: true })
  variantId: string;

  @Column({ type: "int", default: 1 })
  quantity: number;

  @Column({ type: "text", nullable: true })
  notes: string;

  @Column({ type: "boolean", default: false })
  isPurchased: boolean;

  @Column({ type: "int", default: 1 })
  priority: number;

  @ManyToOne(() => Wishlist, (wishlist) => wishlist.items, {
    onDelete: "CASCADE",
  })
  @JoinColumn({ name: "wishlist_id" })
  wishlist: Wishlist;

  @ManyToOne(() => Product, { onDelete: "CASCADE" })
  @JoinColumn({ name: "product_id" })
  product: Product;

  @ManyToOne(() => ProductVariant, { onDelete: "CASCADE", nullable: true })
  @JoinColumn({ name: "variant_id" })
  variant: ProductVariant;

  @Column({ type: "jsonb", nullable: true })
  metadata: Record<string, any>;
}
