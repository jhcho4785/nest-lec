import { Body, Controller, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { UserService } from '@/user/user.service';
import { CreateUserDto, UpdateUserDto, UserQueryDto } from '@/dto/user.dto';

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
  @Post()
  createUser(@Body() body: CreateUserDto) {
    return this.service.createUser(body);
  }

  /**
   * 사용자 수정
   */
  @Patch(':id')
  updateUser(@Param('id') id: string, @Body() body: UpdateUserDto) {
    return this.service.updateUser(id, body);
  }
}
