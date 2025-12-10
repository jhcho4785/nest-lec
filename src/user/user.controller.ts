import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { UserService } from '@/user/user.service';

@Controller('user')
export class UserController {
  constructor(private readonly service: UserService) {}

  /**
   * 사용자 조회
   */
  @Get()
  getUsers() {
    return this.service.getUsers();
  }

  /**
   * 사용자 생성
   */
  @Post()
  createUser(@Body() body) {
    return this.service.createUser(body);
  }

  /**
   * 사용자 수정
   */
  @Patch(':id')
  updateUser(@Param('id') id: string, @Body() body) {
    return this.service.updateUser(id, body);
  }
}
