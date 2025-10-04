export enum OrderStatus {
  PENDING = "PENDING",
  PROCESSING = "PROCESSING",
  SHIPPED = "SHIPPED",
  DELIVERED = "DELIVERED",
  CANCELLED = "CANCELLED",
  REFUNDED = "REFUNDED",
  FAILED = "FAILED",
}

export enum OrderItemStatus {
  /** Item is pending processing */
  PENDING = "PENDING",
  /** Item is being processed */
  PROCESSING = "PROCESSING",
  /** Item has been shipped */
  SHIPPED = "SHIPPED",
  /** Item has been delivered */
  DELIVERED = "DELIVERED",
  /** Item has been cancelled */
  CANCELLED = "CANCELLED",
  /** Return has been requested for this item */
  RETURN_REQUESTED = "RETURN_REQUESTED",
  /** Item has been returned */
  RETURNED = "RETURNED",
  /** Item has been refunded */
  REFUNDED = "REFUNDED",
  /** Item has been replaced */
  REPLACED = "REPLACED",
}
