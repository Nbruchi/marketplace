import { Entity, Column, ManyToOne, JoinColumn } from "typeorm";
import { ProductVariant } from "./product-variant-entity";
import { InventoryStatus } from "../enums/inventory-enum";
import { BaseEntity } from "./base-entity";

/**
 * Inventory Entity
 * Tracks stock levels and status for product variants
 * @class Inventory
 */
@Entity("inventory")
export class Inventory extends BaseEntity {
  /**
   * Current stock quantity available
   * @type {number}
   * @example 100
   */
  @Column({ type: "int" })
  quantity: number;

  /**
   * Current status of the inventory
   * @type {InventoryStatus}
   * @default InventoryStatus.IN_STOCK
   */
  @Column({
    type: "enum",
    enum: InventoryStatus,
    default: InventoryStatus.IN_STOCK,
  })
  status: InventoryStatus;

  /**
   * Physical location of the inventory (e.g., warehouse, shelf)
   * @type {string}
   * @example 'Warehouse A, Shelf B2'
   */
  @Column({ type: "varchar", length: 50, nullable: true })
  location: string;

  /**
   * Batch or lot number for tracking production
   * @type {string}
   * @example 'BATCH-2023-001'
   */
  @Column({ type: "varchar", length: 100, nullable: true })
  batchNumber: string;

  /**
   * Expiration date for perishable items
   * @type {Date}
   */
  @Column({ type: "date", nullable: true })
  expiryDate: Date;

  /**
   * Additional metadata or custom fields
   * @type {Record<string, any>}
   * @example { 'supplier': 'Acme Inc', 'reorderPoint': 20 }
   */
  @Column({ type: "jsonb", nullable: true })
  metadata: Record<string, any>;

  // ========== RELATIONSHIPS ==========

  /**
   * ID of the associated product variant
   * @type {string}
   */
  @Column({ type: "uuid" })
  variantId: string;

  /**
   * The product variant this inventory belongs to
   * @type {ProductVariant}
   */
  @ManyToOne(() => ProductVariant, (variant) => variant.inventory, {
    onDelete: "CASCADE",
  })
  @JoinColumn({ name: "variant_id" })
  variant: ProductVariant;
}
