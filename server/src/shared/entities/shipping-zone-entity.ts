import { Entity, Column, ManyToOne, JoinColumn } from "typeorm";
import { ShippingMethod } from "./shipping-method-entity";
import { BaseEntity } from "./base-entity";
import { ZoneType } from "../enums/shipping-enum";

@Entity("shipping_zones")
export class ShippingZone extends BaseEntity {
  @Column({ type: "uuid" })
  shippingMethodId: string;

  @Column({ type: "varchar", length: 100 })
  name: string;

  @Column({ type: "enum", enum: ZoneType })
  zoneType: ZoneType;

  @Column({ type: "text", array: true, default: "{}" })
  countries: string[];

  @Column({ type: "text", array: true, default: "{}" })
  states: string[];

  @Column({ type: "text", array: true, default: "{}" })
  postalCodes: string[];

  @Column({ type: "boolean", default: true })
  isActive: boolean;

  @ManyToOne(() => ShippingMethod, (method) => method.zones, {
    onDelete: "CASCADE",
  })
  @JoinColumn({ name: "shipping_method_id" })
  shippingMethod: ShippingMethod;

  @Column({ type: "jsonb", nullable: true })
  metadata: Record<string, any>;
}
