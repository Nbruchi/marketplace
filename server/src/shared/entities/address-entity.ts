import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { BaseEntity } from "./base-entity";
import { User } from "./user-entity";
import { AddressType } from "../enums/address-enum";

/**
 * Address Entity
 * Represents a physical address that can be associated with a user for shipping, billing, or other purposes.
 * Supports international addresses with fields for various address formats worldwide.
 */
@Entity("addresses")
export class Address extends BaseEntity {
  // ========== USER RELATIONSHIP ==========

  /**
   * ID of the user this address belongs to
   */
  @Column({ type: "uuid" })
  userId: string;

  /**
   * The user this address belongs to
   */
  @ManyToOne(() => User, (user) => user.addresses, { onDelete: "CASCADE" })
  @JoinColumn({ name: "user_id" })
  user: User;

  // ========== BASIC ADDRESS INFORMATION ==========

  /**
   * First line of the street address
   * @example '123 Main St'
   */
  @Column({ name: "address_line1", nullable: true })
  addressLine1: string;

  /**
   * Second line of the street address (apartment, suite, etc.)
   * @example 'Apt 4B'
   */
  @Column({ name: "address_line2", nullable: true })
  addressLine2: string;

  /**
   * Third line of the street address (additional information)
   */
  @Column({ name: "address_line3", nullable: true })
  addressLine3: string;

  /**
   * Street name without number
   * @example 'Main Street'
   */
  @Column({ nullable: true })
  street: string;

  /**
   * Building name or number
   * @example 'Tower A' or '123'
   */
  @Column({ nullable: true })
  building: string;

  /**
   * Floor number or name
   * @example '3' or 'Ground Floor'
   */
  @Column({ nullable: true })
  floor: string;

  /**
   * Apartment, suite, or unit number
   * @example '4B' or 'Suite 100'
   */
  @Column({ nullable: true })
  apartment: string;

  /**
   * Nearby landmark for easier location
   * @example 'Next to Central Park'
   */
  @Column({ nullable: true })
  landmark: string;

  // ========== LOCATION INFORMATION ==========

  /**
   * City or town name
   * @example 'New York'
   */
  @Column({ nullable: true })
  city: string;

  /**
   * State, province, or region name
   * @example 'California' or 'ON' for Ontario
   */
  @Column({ nullable: true })
  state: string;

  /**
   * Postal or ZIP code
   * @example '10001' or 'SW1A 1AA'
   */
  @Column({ name: "postal_code", nullable: true })
  postalCode: string;

  /**
   * Full country name
   * @example 'United States'
   */
  @Column({ nullable: true })
  country: string;

  /**
   * ISO 3166-1 alpha-2 country code
   * @example 'US' for United States
   */
  @Column({ name: "country_code", length: 2, nullable: true })
  countryCode: string;

  /**
   * Region within a country (used in some countries)
   * @example 'California' or 'Bavaria'
   */
  @Column({ name: "region", nullable: true })
  region: string;

  /**
   * Province (used in some countries like Canada, China)
   * @example 'Ontario' or 'Guangdong'
   */
  @Column({ name: "province", nullable: true })
  province: string;

  /**
   * District or borough (used in some countries)
   * @example 'Manhattan' or 'Westminster'
   */
  @Column({ name: "district", nullable: true })
  district: string;

  /**
   * Village or town (used in some countries)
   * @example 'Arugam Bay' or 'Oia'
   */
  @Column({ name: "village", nullable: true })
  village: string;

  // ========== INTERNATIONAL ADDRESS FIELDS ==========

  /**
   * Prefecture (used in Japan)
   * @example 'Tokyo' or 'Osaka'
   */
  @Column({ name: "prefecture", nullable: true })
  prefecture: string;

  /**
   * Department (used in France, Colombia, etc.)
   * @example 'Île-de-France' or 'Antioquia'
   */
  @Column({ name: "department", nullable: true })
  department: string;

  /**
   * Municipality (used in many countries)
   * @example 'Bogotá D.C.' or 'Mexico City'
   */
  @Column({ name: "municipality", nullable: true })
  municipality: string;

  /**
   * Neighborhood (used in Brazil, Mexico, etc.)
   * @example 'Copacabana' or 'Condesa'
   */
  @Column({ name: "neighborhood", nullable: true })
  neighborhood: string;

  /**
   * Suburb (used in Australia, New Zealand, etc.)
   * @example 'Bondi Beach' or 'Ponsonby'
   */
  @Column({ name: "suburb", nullable: true })
  suburb: string;

  /**
   * County (used in UK, Ireland, US, etc.)
   * @example 'Los Angeles County' or 'Greater London'
   */
  @Column({ name: "county", nullable: true })
  county: string;

  // ========== CONTACT INFORMATION ==========

  /**
   * Full name of the recipient
   * @example 'John Smith'
   */
  @Column({ name: "recipient_name", nullable: true })
  recipientName: string;

  /**
   * Company name (if applicable)
   * @example 'Acme Corp.'
   */
  @Column({ name: "company_name", nullable: true })
  companyName: string;

  /**
   * Primary contact phone number
   * @example '+1 (555) 123-4567'
   */
  @Column({ name: "phone_number", nullable: true })
  phoneNumber: string;

  /**
   * Alternate contact phone number
   * @example '+1 (555) 987-6543'
   */
  @Column({ name: "alternate_phone", nullable: true })
  alternatePhone: string;

  // ========== ADDRESS METADATA ==========

  /**
   * Type of address (home, work, etc.)
   * @default AddressType.HOME
   */
  @Column({
    type: "enum",
    enum: AddressType,
    default: AddressType.HOME,
    nullable: false,
  })
  type: AddressType;

  /**
   * Whether this is the user's default address
   * @default false
   */
  @Column({ name: "is_default", default: false })
  isDefault: boolean;

  /**
   * Whether this address can be used for billing
   * @default false
   */
  @Column({ name: "is_billing", default: false })
  isBilling: boolean;

  /**
   * Whether this address can be used for shipping
   * @default true
   */
  @Column({ name: "is_shipping", default: true })
  isShipping: boolean;

  /**
   * Additional custom fields for specific use cases
   * @example { deliveryInstructions: 'Leave at front door', securityCode: '1234' }
   */
  @Column({ type: "json", nullable: true })
  customFields: Record<string, any>;

  // ========== GEOCODING ==========

  /**
   * Latitude coordinate for mapping
   * @example 40.7128
   */
  @Column({ type: "decimal", precision: 10, scale: 8, nullable: true })
  latitude: number;

  /**
   * Longitude coordinate for mapping
   * @example -74.0060
   */
  @Column({ type: "decimal", precision: 11, scale: 8, nullable: true })
  longitude: number;

  // ========== HELPER METHODS ==========

  /**
   * Returns a formatted address string
   * @returns A formatted address string with all available address components
   * @example "123 Main St, Apt 4B, New York, NY 10001, United States"
   */
  getFullAddress(): string {
    const parts = [
      this.addressLine1,
      this.addressLine2,
      this.addressLine3,
      this.street,
      this.building,
      this.floor
        ? `${this.floor}${this.apartment ? `-${this.apartment}` : ""}`
        : "",
      this.district,
      this.city,
      this.state,
      this.postalCode,
      this.country,
    ].filter(Boolean);

    return parts.join(", ");
  }
}
