import { Body, Controller, Get, Param, Patch, Post, Query, UploadedFile, UseInterceptors } from '@nestjs/common';
import { UserService } from '@/user/user.service';
import { CreateUserDto, UpdateUserDto, UploadProfileDto, UserDto, UserQueryDto } from '@/dto/user.dto';
import { ApiBadRequestResponse, ApiBody, ApiConsumes, ApiCreatedResponse, ApiNotFoundResponse } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { memoryStorage } from 'multer';

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

  /**
   * 프로필사진 업로드
   */
  @UseInterceptors(
    FileInterceptor('file', {
      storage: memoryStorage(),
    }),
  )
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    type: () => UploadProfileDto,
  })
  @Post(':id/profile')
  uploadProfile(@Param('id') id: string, @UploadedFile() file: Express.Multer.File) {
    return this.service.uploadProfile(id, file);
  }
}
