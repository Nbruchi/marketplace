import { Entity, Column, ManyToOne, JoinColumn, OneToMany } from "typeorm";
import { User } from "./user-entity";
import { WishlistItem } from "./wishlist-item-entity";
import { BaseEntity } from "./base-entity";

@Entity("wishlists")
export class Wishlist extends BaseEntity {
  @Column({ type: "varchar", length: 100, default: "My Wishlist" })
  name: string;

  @Column({ type: "text", nullable: true })
  description: string;

  @Column({ type: "boolean", default: false })
  isDefault: boolean;

  @Column({ type: "boolean", default: true })
  isPrivate: boolean;

  @Column({ type: "uuid" })
  userId: string;

  @ManyToOne(() => User, { onDelete: "CASCADE" })
  @JoinColumn({ name: "user_id" })
  user: User;

  @OneToMany(() => WishlistItem, (item) => item.wishlist, { cascade: true })
  items: WishlistItem[];

  @Column({ type: "jsonb", nullable: true })
  metadata: Record<string, any>;

  get itemCount(): number {
    return this.items ? this.items.length : 0;
  }
}
