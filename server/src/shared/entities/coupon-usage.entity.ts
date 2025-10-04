import { Entity, Column, ManyToOne, JoinColumn } from "typeorm";
import { Coupon } from "./coupon-entity";
import { Order } from "./order-entity";
import { User } from "./user-entity";
import { BaseEntity } from "./base-entity";

@Entity("coupon_usages")
export class CouponUsage extends BaseEntity {
  @Column({ type: "uuid" })
  couponId: string;

  @Column({ type: "uuid" })
  orderId: string;

  @Column({ type: "uuid" })
  userId: string;

  @Column({ type: "decimal", precision: 10, scale: 2 })
  discountAmount: number;

  @Column({ type: "varchar", length: 3, default: "USD" })
  currency: string;

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  usedAt: Date;

  @Column({ type: "jsonb", nullable: true })
  orderDetails: Record<string, any>;

  @ManyToOne(() => Coupon, (coupon) => coupon.usages, { onDelete: "CASCADE" })
  @JoinColumn({ name: "coupon_id" })
  coupon: Coupon;

  @ManyToOne(() => Order, { onDelete: "CASCADE" })
  @JoinColumn({ name: "order_id" })
  order: Order;

  @ManyToOne(() => User, { onDelete: "CASCADE" })
  @JoinColumn({ name: "user_id" })
  user: User;

  @Column({ type: "jsonb", nullable: true })
  metadata: Record<string, any>;
}
