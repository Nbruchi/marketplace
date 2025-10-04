import { Entity, Column, ManyToOne, JoinColumn } from "typeorm";
import { Product } from "./product-entity";
import { BaseEntity } from "./base-entity";

@Entity("product_images")
export class ProductImage extends BaseEntity {
  @Column()
  url: string;

  @Column({ nullable: true })
  altText: string;

  @Column({ default: 0 })
  position: number;

  @Column({ type: "boolean", default: false })
  isPrimary: boolean;

  @Column("jsonb", { nullable: true })
  metadata: Record<string, any>;

  @Column({ type: "uuid" })
  productId: string;

  @ManyToOne(() => Product, (product) => product.images, {
    onDelete: "CASCADE",
  })
  @JoinColumn({ name: "product_id" })
  product: Product;
}
