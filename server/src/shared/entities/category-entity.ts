import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToMany,
  Tree,
  TreeChildren,
  TreeParent,
  JoinTable,
} from 'typeorm';
import { Product } from './product-entity';
import { BaseEntity } from './base-entity';

/**
 * Category Entity
 * Represents a product category in the e-commerce system.
 * Categories can be organized in a hierarchical tree structure.
 */
@Entity('categories')
@Tree('materialized-path') // Enables tree structure using materialized path pattern
export class Category extends BaseEntity{
  /**
   * Display name of the category
   * @example 'Smartphones', 'Laptops', 'Men's Clothing'
   */
  @Column()
  name: string;

  /**
   * URL-friendly version of the name for use in URLs
   * @example 'smartphones', 'laptops', 'mens-clothing'
   */
  @Column({ unique: true })
  slug: string;

  /**
   * Detailed description of the category
   * Can include HTML or markdown content
   */
  @Column('text', { nullable: true })
  description: string;

  /**
   * URL or path to the category's main image
   * @example '/images/categories/electronics.jpg'
   */
  @Column({ nullable: true })
  image: string;

  /**
   * Whether the category is active and visible to users
   * @default true
   */
  @Column({ name: 'is_active', default: true })
  isActive: boolean;

  /**
   * Whether the category should be featured/prominently displayed
   * @default false
   */
  @Column({ name: 'is_featured', default: false })
  isFeatured: boolean;

  /**
   * Flexible field for storing additional category data
   * Can include SEO metadata, display settings, etc.
   * @example { seoTitle: 'Best Electronics Deals', seoDescription: '...' }
   */
  @Column('jsonb', { nullable: true })
  metadata: Record<string, any>;

  /**
   * Child categories in the hierarchy
   * For example: 'Electronics' might have children: 'Phones', 'Laptops', 'TVs'
   */
  @TreeChildren()
  children: Category[];

  /**
   * Parent category in the hierarchy
   * Null for top-level categories
   */
  @TreeParent()
  parent: Category;

  /**
   * Products associated with this category
   * Many-to-many relationship with Product entity
   */
  @ManyToMany(() => Product, (product) => product.categories, {
    onDelete: 'NO ACTION',
    onUpdate: 'CASCADE',
  })
  @JoinTable({
    name: 'category_products',
    joinColumn: { name: 'category_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'product_id', referencedColumnName: 'id' },
  })
  products: Product[];

  /**
   * Gets the full category path as a string
   * @param separator - The string to separate category names with
   * @returns Full category path (e.g., 'Electronics > Phones > Smartphones')
   * @example
   * const category = new Category();
   * category.name = 'Smartphones';
   * category.parent = { name: 'Phones', parent: { name: 'Electronics' } };
   * category.getFullPath(); // 'Electronics > Phones > Smartphones'
   */
  getFullPath(separator: string = ' > '): string {
    return this.parent
      ? `${this.parent.getFullPath(separator)}${separator}${this.name}`
      : this.name;
  }
}
