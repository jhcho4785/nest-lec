import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { UserRepository } from '@/user/user.repository';
import { Like } from 'typeorm';
import { CreateUserDto, UpdateUserDto, UserDto, UserQueryDto } from '@/dto/user.dto';

@Injectable()
export class UserService {
  constructor(private readonly repository: UserRepository) {}

  async getUsers(query: UserQueryDto) {
    const users = await this.repository.find({ where: { name: query.name ? Like(`%${query.name}%`) : undefined } });
    return users.map<UserDto>((v) => ({ id: v.id, name: v.name }));
  }

  async createUser(body: CreateUserDto) {
    const dup = await this.repository.findOneBy({ id: body.id });
    if (dup) {
      throw new BadRequestException('ID 중복');
    }
    const user = this.repository.create(body);
    return await this.repository.save(user);
  }

  async updateUser(id: string, body: UpdateUserDto): Promise<UserDto> {
    const user = await this.repository.findOneBy({ id });
    if (!user) {
      throw new NotFoundException('User Not Found');
    }
    const newUser = await this.repository.save(this.repository.merge(user, body));
    return {
      id: newUser.id,
      name: newUser.name,
    };
  }
}
