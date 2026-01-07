import { OmitType } from '@nestjs/swagger';
import { IsDateString, IsNotEmpty, IsOptional, ValidateIf, ValidateNested } from 'class-validator';
import { CreateUserDto } from '@/dto/user.dto';
import { Type } from 'class-transformer';

export class CustomerDto {
  id: number;
  @IsNotEmpty()
  name: string;

  personalId: string;
  createUserId: string;
  @IsOptional()
  address?: string;

  @ValidateIf((o) => !o.personalId) //주민번호가 없으면 생년월일을 date 형태로 검사하겠다.
  @IsDateString()
  birthday?: string;

  age?: number;

  @ValidateNested()
  @Type(() => CreateUserDto)
  User: CreateUserDto;
}

export class CustomerQueryDto {
  name?: string;
  @Type(() => Number) //형변환
  age?: number;
}

export class CreateCustomerDto extends OmitType(CustomerDto, ['id']) {}
