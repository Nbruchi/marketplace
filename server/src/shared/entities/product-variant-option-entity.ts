import { Entity, Column, ManyToOne, JoinColumn } from "typeorm";
import { ProductVariant } from "./product-variant-entity";
import { ProductVariationType } from "../enums/product-enum";
import { BaseEntity } from "./base-entity";

@Entity("product_variant_options")
export class ProductVariantOption extends BaseEntity {
  @Column({
    type: "enum",
    enum: ProductVariationType,
    default: ProductVariationType.OTHER,
  })
  type: ProductVariationType;

  @Column()
  name: string;

  @Column()
  value: string;

  @Column({ type: "uuid" })
  variantId: string;

  @ManyToOne(() => ProductVariant, (variant) => variant.options, {
    onDelete: "CASCADE",
  })
  @JoinColumn({ name: "variant_id" })
  variant: ProductVariant;
}
