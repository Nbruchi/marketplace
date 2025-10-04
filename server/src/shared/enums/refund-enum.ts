/**
 * Represents the possible statuses of a refund request
 */
export enum RefundStatus {
  /** The refund request has been submitted but not yet processed */
  PENDING = "PENDING",

  /** The refund has been approved and is being processed */
  PROCESSING = "PROCESSING",

  /** The refund has been successfully processed */
  COMPLETED = "COMPLETED",

  /** The refund request has been rejected */
  REJECTED = "REJECTED",

  /** The refund has been cancelled by the customer or admin */
  CANCELLED = "CANCELLED",

  /** The refund is under review by the support team */
  UNDER_REVIEW = "UNDER_REVIEW",
}
