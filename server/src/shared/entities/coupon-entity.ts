import { Entity, Column, OneToMany } from "typeorm";
import { CouponType, DiscountType } from "../enums/coupon-enum";
import { BaseEntity } from "./base-entity";
import { CouponUsage } from "./coupon-usage.entity";

@Entity("coupons")
export class Coupon extends BaseEntity {
  @Column({ type: "varchar", length: 50, unique: true })
  code: string;

  @Column({ type: "varchar", length: 100 })
  name: string;

  @Column({ type: "text", nullable: true })
  description: string;

  @Column({ type: "enum", enum: CouponType, default: CouponType.PUBLIC })
  type: CouponType;

  @Column({ type: "enum", enum: DiscountType })
  discountType: DiscountType;

  @Column({ type: "decimal", precision: 10, scale: 2 })
  discountValue: number;

  @Column({ type: "decimal", precision: 10, scale: 2, nullable: true })
  minPurchaseAmount: number;

  @Column({ type: "timestamp", nullable: true })
  validFrom: Date;

  @Column({ type: "timestamp", nullable: true })
  validUntil: Date;

  @Column({ type: "int", nullable: true })
  usageLimit: number;

  @Column({ type: "int", default: 0 })
  usageCount: number;

  @Column({ type: "boolean", default: true })
  isActive: boolean;

  @Column({ type: "boolean", default: false })
  isSingleUse: boolean;

  @Column({ type: "boolean", default: false })
  isFirstOrderOnly: boolean;

  @Column({ type: "jsonb", nullable: true })
  productIds: string[];

  @Column({ type: "jsonb", nullable: true })
  categoryIds: string[];

  @OneToMany(() => CouponUsage, (usage) => usage.coupon)
  usages: CouponUsage[];

  @Column({ type: "jsonb", nullable: true })
  metadata: Record<string, any>;

  isExpired(): boolean {
    return this.validUntil ? new Date() > this.validUntil : false;
  }

  isRedeemable(): boolean {
    if (!this.isActive) return false;
    if (this.usageLimit && this.usageCount >= this.usageLimit) return false;
    if (this.validFrom && new Date() < this.validFrom) return false;
    if (this.validUntil && new Date() > this.validUntil) return false;
    return true;
  }
}
