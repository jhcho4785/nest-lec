import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { CreateUserDto } from '@/dto/user.dto';
import { UserRepository } from '@/user/user.repository';
import { User } from '@/entities/user.entity';
import { BadRequestException } from '@nestjs/common';

describe('UserService', () => {
  let service: UserService;
  let repository: UserRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: UserRepository,
          useValue: {
            create: jest.fn(),
            save: jest.fn(),
            findOneBy: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<UserService>(UserService);
    repository = module.get<UserRepository>(UserRepository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('createUser', () => {
    const body = new CreateUserDto();
    it('ID가 중복되면 400 에러', async () => {
      body.id = '1';
      const user = new User();
      user.id = '1';
      jest.spyOn(repository, 'findOneBy').mockResolvedValue(user);
      try {
        await service.createUser(body);
      } catch (e) {
        expect(e).toBeInstanceOf(BadRequestException);
      }
    });
    it('중복되는 ID가 없으면 성공', async () => {
      body.id = '1';
      const newUser = new User();
      jest.spyOn(repository, 'findOneBy').mockResolvedValue(null);
      jest.spyOn(repository, 'create').mockReturnValue(newUser);
      jest.spyOn(repository, 'save').mockResolvedValue(newUser);
      await service.createUser(body);
    });
  });
});
