import { Column, ManyToOne, OneToMany, JoinColumn, Entity } from "typeorm";
import { SellerProfile } from "./seller-profile-entity";
import { Product } from "./product-entity";
import { BaseEntity } from "./base-entity";

/**
 * SellerShop Entity
 * Represents an individual shop/storefront that a seller operates in the marketplace.
 * A seller (via their `SellerProfile`) can own multiple shops, and products are published under a specific shop.
 */
@Entity("seller_shops")
export class SellerShop extends BaseEntity {
  /**
   * The seller profile that owns this shop
   */
  @Column({ name: "seller_profile_id", type: "uuid" })
  sellerProfileId: string;

  @ManyToOne(() => SellerProfile, (seller) => seller.shops, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  @JoinColumn({ name: "seller_profile_id" })
  sellerProfile: SellerProfile;

  /**
   * Public display name of the shop
   */
  @Column({ length: 150 })
  name: string;

  /**
   * URL-friendly identifier for the shop (unique marketplace slug)
   */
  @Column({ unique: true })
  slug: string;

  /**
   * Short description or tagline for the shop
   */
  @Column({ type: "text", nullable: true })
  description: string;

  /**
   * URL to the shop's logo image
   */
  @Column({ name: "logo_url", nullable: true })
  logoUrl: string;

  /**
   * URL to the shop's banner/hero image
   */
  @Column({ name: "banner_url", nullable: true })
  bannerUrl: string;

  /**
   * Arbitrary storefront configuration (theme, featured collections, etc.)
   */
  @Column({ type: "jsonb", nullable: true })
  storefrontSettings: Record<string, any>;

  /**
   * Whether the shop is visible and allowed to publish products
   */
  @Column({ name: "is_active", default: true })
  isActive: boolean;

  /**
   * Optional aggregated rating for the shop
   */
  @Column({ type: "decimal", precision: 3, scale: 2, default: 0 })
  rating: number;

  /**
   * Total number of ratings contributing to the shop score
   */
  @Column({ name: "total_ratings", default: 0 })
  totalRatings: number;

  /**
   * Products currently assigned to this shop
   */
  @OneToMany(() => Product, (product) => product.shop)
  products: Product[];

  /**
   * Helper to generate the public URL path for this shop
   */
  getShopUrl(): string {
    return `/shops/${this.slug}`;
  }
}
