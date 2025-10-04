import {
  Entity,
  Column,
  ManyToOne,
  JoinColumn,
  Check,
} from 'typeorm';
import { User } from './user-entity';
import { Product } from './product-entity';
import { ReviewType, ReviewStatus } from "../enums/review-enum";
import { BaseEntity } from './base-entity';

interface ReviewMetadata {
  verifiedPurchase: boolean;
  helpfulCount: number;
  unhelpfulCount: number;
  reportCount: number;
  isTopReview: boolean;
  isVerifiedOwner: boolean;
  purchaseDate?: Date;
  orderId?: string;
}

interface ReviewMedia {
  type: "image" | "video";
  url: string;
  thumbnailUrl?: string;
  altText?: string;
}

@Entity('reviews')
@Check(`"rating" >= 1 AND "rating" <= 5`)
export class Review extends BaseEntity{
  // Relationships
  @Column({ type: 'uuid' })
  userId: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column({ type: 'uuid' })
  productId: string;

  @ManyToOne(() => Product, (product) => product.reviews, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'product_id' })
  product: Product;

  // Review Content
  @Column({ type: 'varchar', length: 500 })
  title: string;

  @Column({ type: 'text' })
  content: string;

  @Column({ type: 'smallint' })
  rating: number;

  @Column({ type: 'jsonb', nullable: true })
  media: ReviewMedia[];

  // Review Metadata
  @Column({
    type: 'enum',
    enum: ReviewType,
    default: ReviewType.PRODUCT,
  })
  type: ReviewType;

  @Column({
    type: 'enum',
    enum: ReviewStatus,
    default: ReviewStatus.PENDING,
  })
  status: ReviewStatus;

  @Column({ type: 'jsonb', nullable: true })
  metadata: ReviewMetadata;

  // Moderation
  @Column({ name: 'moderator_notes', type: 'text', nullable: true })
  moderatorNotes: string;

  @Column({ name: 'moderated_by', type: 'uuid', nullable: true })
  moderatedBy: string;

  @Column({ name: 'moderated_at', type: 'timestamp', nullable: true })
  moderatedAt: Date;

  // Helpers
  isHelpful(): boolean {
    return this.metadata?.helpfulCount > this.metadata?.unhelpfulCount;
  }

  isVerifiedPurchase(): boolean {
    return this.metadata?.verifiedPurchase || false;
  }

  markAsHelpful(): void {
    if (!this.metadata) {
      this.metadata = {
        helpfulCount: 0,
        unhelpfulCount: 0,
        reportCount: 0,
        isTopReview: false,
        isVerifiedOwner: false,
        verifiedPurchase: false,
      };
    }
    this.metadata.helpfulCount += 1;
  }

  markAsUnhelpful(): void {
    if (!this.metadata) {
      this.metadata = {
        helpfulCount: 0,
        unhelpfulCount: 0,
        reportCount: 0,
        isTopReview: false,
        isVerifiedOwner: false,
        verifiedPurchase: false,
      };
    }
    this.metadata.unhelpfulCount += 1;
  }

  report(): void {
    if (!this.metadata) {
      this.metadata = {
        helpfulCount: 0,
        unhelpfulCount: 0,
        reportCount: 0,
        isTopReview: false,
        isVerifiedOwner: false,
        verifiedPurchase: false,
      };
    }
    this.metadata.reportCount += 1;
    if (this.metadata.reportCount >= 5) {
      this.status = ReviewStatus.REPORTED;
    }
  }
}
