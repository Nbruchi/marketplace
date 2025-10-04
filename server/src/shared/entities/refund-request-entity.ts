import { Entity, Column, ManyToOne, JoinColumn, OneToMany } from "typeorm";
import { Order } from "./order-entity";
import { User } from "./user-entity";
import { RefundStatus } from "../enums/refund-enum";
import { RefundItem } from "./refund-item-entity";
import { BaseEntity } from "./base-entity";

@Entity("refund_requests")
export class RefundRequest extends BaseEntity {
  @Column({ type: "varchar", length: 50 })
  requestNumber: string;

  @Column({ type: "text", nullable: true })
  reason: string;

  @Column({ type: "enum", enum: RefundStatus, default: RefundStatus.PENDING })
  status: RefundStatus;

  @Column({ type: "decimal", precision: 10, scale: 2 })
  amount: number;

  @Column({ type: "varchar", length: 3 })
  currency: string;

  @Column({ type: "text", nullable: true })
  adminNotes: string;

  @Column({ type: "timestamp", nullable: true })
  processedAt: Date;

  @Column({ type: "uuid", nullable: true })
  processedById: string;

  @Column({ type: "uuid" })
  orderId: string;

  @Column({ type: "uuid" })
  userId: string;

  @ManyToOne(() => User, (user) => user.refundRequests, { onDelete: "CASCADE" })
  @JoinColumn({ name: "user_id" })
  user: User;

  @ManyToOne(() => Order, (order) => order.refundRequests, {
    onDelete: "CASCADE",
  })
  @JoinColumn({ name: "order_id" })
  order: Order;

  @OneToMany(() => RefundItem, (item) => item.refundRequest)
  items: RefundItem[];

  @Column({ type: "jsonb", nullable: true })
  metadata: Record<string, any>;
}
