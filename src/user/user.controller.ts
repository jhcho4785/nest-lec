import { Body, Controller, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { UserService } from '@/user/user.service';
import { CreateUserDto, UpdateUserDto, UserDto, UserQueryDto } from '@/dto/user.dto';
import { ApiBadRequestResponse, ApiCreatedResponse, ApiNotFoundResponse } from '@nestjs/swagger';

@Controller('user')
export class UserController {
  constructor(private readonly service: UserService) {}

  /**
   * 사용자 조회
   */
  @Get()
  getUsers(@Query() query: UserQueryDto) {
    return this.service.getUsers(query);
  }

  /**
   * 사용자 생성
   */
  @ApiBadRequestResponse({
    description: '잘못된 요청',
  })
  @ApiCreatedResponse({
    description: '성공',
    type: () => UserDto,
  })
  @Post()
  createUser(@Body() body: CreateUserDto) {
    return this.service.createUser(body);
  }

  /**
   * 사용자 수정
   */
  @ApiNotFoundResponse({
    description: '사용자가 존재하지 않을 때',
  })
  @Patch(':id')
  updateUser(@Param('id') id: string, @Body() body: UpdateUserDto): Promise<UserDto> {
    return this.service.updateUser(id, body);
  }
}
