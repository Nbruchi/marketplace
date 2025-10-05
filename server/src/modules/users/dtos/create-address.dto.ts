import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsOptional, IsEnum, IsPostalCode, IsPhoneNumber, IsBoolean, Length, IsLatitude, IsLongitude } from 'class-validator';
import { AddressType } from 'src/shared/enums/address-enum';

export class CreateAddressDto {
  @ApiProperty({
    description: 'Type of the address (e.g., HOME, WORK, BILLING, SHIPPING)',
    enum: Object.values(AddressType),
    example: AddressType.HOME,
  })
  @IsEnum(AddressType)
  @IsNotEmpty()
  type: AddressType;

  @ApiProperty({
    description: 'First line of the street address',
    example: '123 Main St',
  })
  @IsString()
  @IsNotEmpty()
  @Length(1, 255)
  addressLine1: string;

  @ApiPropertyOptional({
    description: 'Second line of the street address (apartment, suite, etc.)',
    example: 'Apt 4B',
    required: false,
  })
  @IsString()
  @IsOptional()
  @Length(0, 255)
  addressLine2?: string;

  @ApiProperty({
    description: 'City or locality',
    example: 'New York',
  })
  @IsString()
  @IsNotEmpty()
  @Length(1, 100)
  city: string;

  @ApiPropertyOptional({
    description: 'State, province, or region',
    example: 'NY',
    required: false,
  })
  @IsString()
  @IsOptional()
  @Length(0, 100)
  state?: string;

  @ApiProperty({
    description: 'ZIP or postal code',
    example: '10001',
  })
  @IsString()
  @IsNotEmpty()
  @IsPostalCode('any')
  postalCode: string;

  @ApiProperty({
    description: 'Country name or ISO 3166-1 alpha-2 country code',
    example: 'Rwanda',
  })
  @IsString()
  @IsNotEmpty()
  @Length(2, 100)
  country: string;

  @ApiPropertyOptional({
    description: 'Contact phone number for this address',
    example: '+1234567890',
    required: false,
  })
  @IsString()
  @IsOptional()
  @IsPhoneNumber()
  phoneNumber?: string;

  @ApiPropertyOptional({
    description: 'Whether this is the default address for its type',
    default: false,
  })
  @IsBoolean()
  @IsOptional()
  isDefault?: boolean;

  @ApiPropertyOptional({
    description: 'Additional notes or instructions',
    example: 'Ring the doorbell twice',
    required: false,
  })
  @IsString()
  @IsOptional()
  @Length(0, 500)
  notes?: string;

  // Rwanda-specific fields
  @ApiPropertyOptional({
    description: 'Province (e.g., Kigali, Northern, Southern, Eastern, Western)',
    example: 'Kigali',
    required: false,
  })
  @IsString()
  @IsOptional()
  @Length(0, 100)
  province?: string;

  @ApiPropertyOptional({
    description: 'District within the province',
    example: 'Gasabo',
    required: false,
  })
  @IsString()
  @IsOptional()
  @Length(0, 100)
  district?: string;

  @ApiPropertyOptional({
    description: 'Sector within the district',
    example: 'Jali',
    required: false,
  })
  @IsString()
  @IsOptional()
  @Length(0, 100)
  sector?: string;

  @ApiPropertyOptional({
    description: 'Cell within the sector',
    example: 'Nyakabungo',
    required: false,
  })
  @IsString()
  @IsOptional()
  @Length(0, 100)
  cell?: string;

  @ApiPropertyOptional({
    description: 'Village within the cell',
    example: 'Gitaba',
    required: false,
  })
  @IsString()
  @IsOptional()
  @Length(0, 100)
  village?: string;

  @ApiPropertyOptional({
    description: 'Landmark near the address',
    example: 'Near Akagera Motors',
    required: false,
  })
  @IsString()
  @IsOptional()
  @Length(0, 255)
  landmark?: string;

  @ApiPropertyOptional({
    description: 'Latitude coordinate',
    example: -1.9501,
    required: false,
  })
  @IsOptional()
  @IsLatitude()
  latitude?: number;

  @ApiPropertyOptional({
    description: 'Longitude coordinate',
    example: 30.0588,
    required: false,
  })
  @IsOptional()
  @IsLongitude()
  longitude?: number;
}
