import { Body, Controller, Get, Post } from '@nestjs/common';
import { CustomerService } from '@/customer/customer.service';
import { CreateCustomerDto } from '@/dto/customer.dto';

@Controller('customer')
export class CustomerController {
  constructor(private readonly service: CustomerService) {}

  @Get()
  getCustomers() {
    return this.service.getCustomers();
  }

  @Post()
  createCustomer(@Body() body: CreateCustomerDto) {
    return this.service.createCustomer(body);
  }
}
