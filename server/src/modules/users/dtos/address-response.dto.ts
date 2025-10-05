import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Address } from 'src/shared/entities/address-entity';
import { AddressType } from 'src/shared/enums/address-enum';

export class AddressResponseDto {
  @ApiProperty({ description: 'Unique identifier of the address' })
  id: string;

  @ApiProperty({
    description: 'Type of the address',
    enum: Object.values(AddressType),
    example: AddressType.HOME,
  })
  type: string;

  // ========== BASIC ADDRESS FIELDS ==========
  @ApiProperty({ description: 'First line of the street address' })
  addressLine1: string;

  @ApiPropertyOptional({ description: 'Second line of the street address' })
  addressLine2?: string;

  @ApiPropertyOptional({ description: 'Third line of the street address' })
  addressLine3?: string;

  @ApiPropertyOptional({ description: 'Street name without number' })
  street?: string;

  @ApiPropertyOptional({ description: 'Building name or number' })
  building?: string;

  @ApiPropertyOptional({ description: 'Floor number or name' })
  floor?: string;

  @ApiPropertyOptional({ description: 'Apartment, suite, or unit number' })
  apartment?: string;

  @ApiPropertyOptional({ description: 'Nearby landmark for easier location' })
  landmark?: string;

  // ========== LOCATION FIELDS ==========
  @ApiProperty({ description: 'City or town name' })
  city: string;

  @ApiPropertyOptional({ description: 'State, province, or region' })
  state?: string;

  @ApiProperty({ description: 'ZIP or postal code' })
  postalCode: string;

  @ApiProperty({ description: 'Country name' })
  country: string;

  @ApiProperty({ 
    description: 'ISO 3166-1 alpha-2 country code',
    example: 'US',
  })
  countryCode: string;

  // ========== INTERNATIONAL ADDRESS FIELDS ==========
  @ApiPropertyOptional({ description: 'Region within a country' })
  region?: string;

  @ApiPropertyOptional({ description: 'Province (used in some countries like Canada, China)' })
  province?: string;

  @ApiPropertyOptional({ description: 'District or borough' })
  district?: string;

  @ApiPropertyOptional({ description: 'Village or town' })
  village?: string;

  @ApiPropertyOptional({ description: 'Prefecture (used in Japan)' })
  prefecture?: string;

  @ApiPropertyOptional({ description: 'Department (used in France, Colombia, etc.)' })
  department?: string;

  @ApiPropertyOptional({ description: 'Municipality' })
  municipality?: string;

  @ApiPropertyOptional({ description: 'Neighborhood' })
  neighborhood?: string;

  @ApiPropertyOptional({ description: 'Suburb (used in Australia, New Zealand, etc.)' })
  suburb?: string;

  @ApiPropertyOptional({ description: 'County (used in UK, Ireland, US, etc.)' })
  county?: string;

  // ========== CONTACT INFORMATION ==========
  @ApiPropertyOptional({ 
    description: 'Recipient name',
    example: 'John Doe',
  })
  recipientName?: string;

  @ApiPropertyOptional({ 
    description: 'Company name',
    example: 'Acme Inc.',
  })
  companyName?: string;

  @ApiPropertyOptional({ 
    description: 'Contact phone number for this address',
    example: '+1234567890',
  })
  phoneNumber?: string;

  @ApiPropertyOptional({ 
    description: 'Alternate phone number',
    example: '+1987654321',
  })
  alternatePhone?: string;

  // ========== ADDRESS TYPE FLAGS ==========
  @ApiProperty({ 
    description: 'Whether this is the default address for its type',
    default: false,
  })
  isDefault: boolean;

  @ApiProperty({ 
    description: 'Whether this is a billing address',
    default: false,
  })
  isBilling: boolean;

  @ApiProperty({ 
    description: 'Whether this is a shipping address',
    default: true,
  })
  isShipping: boolean;

  // ========== LOCATION DATA ==========
  @ApiPropertyOptional({
    description: 'Latitude coordinate',
    example: 40.7128,
  })
  latitude?: number;

  @ApiPropertyOptional({
    description: 'Longitude coordinate',
    example: -74.0060,
  })
  longitude?: number;

  // ========== TIMESTAMPS ==========
  @ApiProperty({ 
    description: 'Date when the address was created',
    type: Date,
  })
  createdAt: Date;

  @ApiProperty({ 
    description: 'Date when the address was last updated',
    type: Date,
  })
  updatedAt: Date;

  constructor(address: Address) {
    // Basic info
    this.id = address.id;
    this.type = address.type;
    
    // Address lines
    this.addressLine1 = address.addressLine1;
    this.addressLine2 = address.addressLine2;
    this.addressLine3 = address.addressLine3;
    
    // Location components
    this.street = address.street;
    this.building = address.building;
    this.floor = address.floor;
    this.apartment = address.apartment;
    this.landmark = address.landmark;
    this.city = address.city;
    this.state = address.state;
    this.postalCode = address.postalCode;
    this.country = address.country;
    this.countryCode = address.countryCode;
    
    // International fields
    this.region = address.region;
    this.province = address.province;
    this.district = address.district;
    this.village = address.village;
    this.prefecture = address.prefecture;
    this.department = address.department;
    this.municipality = address.municipality;
    this.neighborhood = address.neighborhood;
    this.suburb = address.suburb;
    this.county = address.county;
    
    // Contact info
    this.recipientName = address.recipientName;
    this.companyName = address.companyName;
    this.phoneNumber = address.phoneNumber;
    this.alternatePhone = address.alternatePhone;
    
    // Flags
    this.isDefault = address.isDefault;
    this.isBilling = address.isBilling;
    this.isShipping = address.isShipping;
    
    // Location data
    this.latitude = address.latitude;
    this.longitude = address.longitude;
    
    // Timestamps
    this.createdAt = address.createdAt;
    this.updatedAt = address.updatedAt;
  }
}
