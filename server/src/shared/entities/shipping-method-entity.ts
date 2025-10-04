import { Entity, Column, OneToMany } from "typeorm";
import { ShippingRate } from "./shipping-rate-entity";
import { ShippingZone } from "./shipping-zone-entity";
import { ShippingMethodType } from "../enums/shipping-enum";
import { BaseEntity } from "./base-entity";

@Entity("shipping_methods")
export class ShippingMethod extends BaseEntity {
  @Column({ type: "varchar", length: 100 })
  name: string;

  @Column({ type: "text", nullable: true })
  description: string;

  @Column({
    type: "enum",
    enum: ShippingMethodType,
    default: ShippingMethodType.STANDARD,
  })
  type: ShippingMethodType;

  @Column({ type: "boolean", default: true })
  isActive: boolean;

  @Column({ type: "int", default: 0 })
  sortOrder: number;

  @Column({ type: "jsonb", nullable: true })
  metadata: Record<string, any>;

  @OneToMany(() => ShippingRate, (rate) => rate.shippingMethod)
  rates: ShippingRate[];

  @OneToMany(() => ShippingZone, (zone) => zone.shippingMethod)
  zones: ShippingZone[];
}
