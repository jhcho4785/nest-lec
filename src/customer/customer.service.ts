import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CustomerRepository } from '@/customer/customer.repository';
import { CreateCustomerDto } from '@/dto/customer.dto';

@Injectable()
export class CustomerService {
  constructor(private readonly repository: CustomerRepository) {}

  getCustomers() {
    return this.repository.find({
      relations: ['CreateUser'],
    });
  }

  async getCustomer(id: number) {
    const customer = await this.repository.findOneBy({ id });
    if (!customer) {
      throw new NotFoundException('존재하지 않는 인적입니다.'); //404
    }
    return customer;
  }

  async createCustomer(body: CreateCustomerDto) {
    if (!body.personalId) {
      throw new BadRequestException('주민번호는 필수입니다.'); //400
    }
    await this.repository.save(this.repository.create(body));
  }
}

//상태코드
//200: 성공, 201: 성공(생성 완료)
//400: 잘못된 요청(요청 query나 body의 데이터가 잘못되었을 때), 404: not found
//500: 서버 내부 오류(예외처리하지 못한 오류가 발생했을 때)
