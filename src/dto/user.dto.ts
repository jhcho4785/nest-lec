import { PartialType } from '@nestjs/swagger';

export class UserQueryDto {
  name: string;
}

export class UserDto {
  id: string;
  name: string;
}

export class UserWithPasswordDto extends UserDto {
  password: string;
}

export class CreateUserDto extends UserDto {
  password: string;
}

export class UpdateUserDto extends PartialType(CreateUserDto) {}
