import { Entity, Column, ManyToOne, JoinColumn, OneToMany } from "typeorm";
import { Product } from "./product-entity";
import { ProductVariantOption } from "./product-variant-option-entity";
import { Inventory } from "./inventory-entity";
import { BaseEntity } from "./base-entity";

@Entity("product_variants")
export class ProductVariant extends BaseEntity {
  @Column()
  sku: string;

  @Column("decimal", { precision: 12, scale: 2 })
  price: number;

  @Column("decimal", { precision: 12, scale: 2, nullable: true })
  compareAtPrice: number;

  @Column("decimal", { precision: 12, scale: 2, nullable: true })
  costPerItem: number;

  @Column({ default: 0 })
  quantity: number;

  @Column({ default: 0 })
  position: number;

  @Column({ type: "boolean", default: true })
  trackInventory: boolean;

  @Column({ type: "jsonb", nullable: true })
  metadata: Record<string, any>;

  @Column({ type: "uuid" })
  productId: string;

  @ManyToOne(() => Product, (product) => product.variants, {
    onDelete: "CASCADE",
  })
  @JoinColumn({ name: "product_id" })
  product: Product;

  @OneToMany(() => ProductVariantOption, (option) => option.variant, {
    cascade: true,
  })
  options: ProductVariantOption[];

  @OneToMany(() => Inventory, (inventory) => inventory.variant, {
    cascade: true,
  })
  inventory: Inventory[];

  // Helper methods
  hasStock(quantity: number = 1): boolean {
    return this.quantity >= quantity;
  }

  addToStock(quantity: number): void {
    this.quantity += quantity;
  }

  removeFromStock(quantity: number): boolean {
    if (this.quantity < quantity) {
      return false;
    }
    this.quantity -= quantity;
    return true;
  }
}
