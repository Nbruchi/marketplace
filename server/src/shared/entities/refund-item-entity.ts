import { Entity, Column, ManyToOne, JoinColumn } from "typeorm";
import { RefundRequest } from "./refund-request-entity";
import { OrderItem } from "./order-item-entity";
import { BaseEntity } from "./base-entity";

@Entity("refund_items")
export class RefundItem extends BaseEntity {
  @Column({ type: "uuid" })
  refundRequestId: string;

  @Column({ type: "uuid" })
  orderItemId: string;

  @Column({ type: "int" })
  quantity: number;

  @Column({ type: "decimal", precision: 10, scale: 2 })
  amount: number;

  @Column({ type: "text", nullable: true })
  reason: string;

  @ManyToOne(() => RefundRequest, (refundRequest) => refundRequest.items, {
    onDelete: "CASCADE",
  })
  @JoinColumn({ name: "refund_request_id" })
  refundRequest: RefundRequest;

  @ManyToOne(() => OrderItem)
  @JoinColumn({ name: "order_item_id" })
  orderItem: OrderItem;
}
