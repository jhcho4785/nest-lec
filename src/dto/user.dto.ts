import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class UserQueryDto {
  /**
   * 사용자명
   */
  name: string;
}

export class UserDto {
  /**
   * 사용자 ID
   */
  id: string;

  // @ApiProperty({ //주석으로 대체
  //   description: '사용자명',
  //   example: '홍길동',
  // })
  /**
   * 사용자명
   * @example 홍길동
   */
  name: string;
}

export class UserWithPasswordDto extends UserDto {
  password: string;
}

export class CreateUserDto extends UserDto {
  @IsNotEmpty({ message: '암호는 비어있을 수 없습니다.' })
  password: string;
}

export class UpdateUserDto extends PartialType(CreateUserDto) {}

//dto에서 데코레이터 형태로 제어 -> 비즈니스 로직을 간결하게 만들어줌

//validator
//IsNotEmpty -> 공백을 허용하지 않음, IsNumber, IsBoolean, IsArray -> 타입검사, IsIn -> 배열에 포함된 값만 허용, IsEnum -> Enum에 포함된 값만 허용, 그 외에도 IsDateString, ArrayNotEmpty ...
//IsOptional -> 옵션(값이 있어도 되고 없어도 되고 & 다른 validator를 값이 있을때만 동작하도록 한다)
//ValidateNested -> 중첩 객체도 validator 동작
//ValidateIf -> 함수의 반환값이 true이면 다른 validator를 동작시킴

//transformer
//Type -> 형변환
//Transform -> 함수 형태로 input 값을 자유롭게 변환
