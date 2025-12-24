import { Column, DeleteDateColumn, Entity, OneToMany, PrimaryColumn } from 'typeorm';
import { Customer } from '@/entities/customer.entity';

// 테이블과 1:1 관계
@Entity({ comment: '사용자 정보' })
export class User {
  @PrimaryColumn('varchar', { length: 30 })
  id: string; // PK id varchar(30)

  @Column('varchar', { nullable: false, length: 30 })
  name: string;

  @Column('varchar', { nullable: false, length: 100, select: false })
  password: string;

  @DeleteDateColumn({ type: 'timestamp' })
  deletedAt?: Date;

  @OneToMany(() => Customer, (customer) => customer.CreateUser)
  Customers: Customer[];
}
