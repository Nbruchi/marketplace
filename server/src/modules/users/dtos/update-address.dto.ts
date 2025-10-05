import { PartialType } from '@nestjs/swagger';
import { CreateAddressDto } from './create-address.dto';
import { IsOptional, ValidateIf } from 'class-validator';

export class UpdateAddressDto extends PartialType(CreateAddressDto) {
  @ValidateIf((o) => o.isDefault !== undefined)
  @IsOptional()
  isDefault?: boolean;
}
