import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { UserRepository } from '@/user/user.repository';
import { Like } from 'typeorm';
import { CreateUserDto, UserDto, UserQueryDto } from '@/dto/user.dto';

@Injectable()
export class UserService {
  constructor(private readonly repository: UserRepository) {}

  async getUsers(query: UserQueryDto) {
    const users = await this.repository.findBy({ name: Like(`%${query.name}%`) });
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

  async updateUser(id: string, body) {
    const user = await this.repository.findOneBy({ id });
    if (!user) {
      throw new NotFoundException('User Not Found');
    }
    const newUser = this.repository.merge(user, body);
    return await this.repository.save(newUser);
  }
}
