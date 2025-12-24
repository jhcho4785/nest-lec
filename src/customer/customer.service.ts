import { Injectable } from '@nestjs/common';
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

  async createCustomer(body: CreateCustomerDto) {
    await this.repository.save(this.repository.create(body));
  }
}
