import { OmitType } from '@nestjs/swagger';

export class CustomerDto {
  id: number;
  name: string;
  personalId: string;
  createUserId: string;
}

export class CreateCustomerDto extends OmitType(CustomerDto, ['id']) {}
