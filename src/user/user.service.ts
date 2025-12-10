import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { UserRepository } from '@/user/user.repository';

@Injectable()
export class UserService {
  constructor(private readonly repository: UserRepository) {}

  async getUsers() {
    return await this.repository.find();
  }

  async createUser(body) {
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

//request -> controller -> service -> repository -> db -> repository -> service -> controller -> response
