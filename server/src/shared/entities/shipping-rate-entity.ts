import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';
import { ShippingMethod } from './shipping-method-entity';
import { RateType } from '../enums/shipping-enum';
import { BaseEntity } from './base-entity';

@Entity('shipping_rates')
export class ShippingRate extends BaseEntity{
  @Column({ type: 'uuid' })
  shippingMethodId: string;

  @Column({ type: 'varchar', length: 50 })
  name: string;

  @Column({ type: 'enum', enum: RateType })
  rateType: RateType;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  price: number;

  @Column({ type: 'varchar', length: 3, default: 'USD' })
  currency: string;

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
  minOrderValue: number;

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
  maxOrderValue: number;

  @Column({ type: 'decimal', precision: 10, scale: 3, nullable: true })
  minWeight: number;

  @Column({ type: 'decimal', precision: 10, scale: 3, nullable: true })
  maxWeight: number;

  @Column({ type: 'boolean', default: true })
  isActive: boolean;

  @Column({ type: 'int', default: 0 })
  estimatedDeliveryMinDays: number;

  @Column({ type: 'int', default: 0 })
  estimatedDeliveryMaxDays: number;

  @ManyToOne(() => ShippingMethod, method => method.rates, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'shipping_method_id' })
  shippingMethod: ShippingMethod;

  @Column({ type: 'jsonb', nullable: true })
  metadata: Record<string, any>;
}
