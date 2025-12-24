import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from '@/entities/user.entity';

@Entity({ comment: '고객 정보' })
export class Customer {
  @PrimaryGeneratedColumn({ type: 'int', unsigned: true })
  id: number;

  @Column('varchar', { length: 30, nullable: false })
  name: string;

  @Column('varchar', { length: 13, nullable: false })
  personalId: string;

  @ManyToOne(() => User, (user) => user.Customers, {
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'create_user_id', foreignKeyConstraintName: 'fk_customer_create_user' })
  CreateUser: User;

  @Column('varchar', { length: 30, nullable: false })
  createUserId: string;
}

// 1:1 부모 테이블 데이터 1 - 자식 테이블 데이터 1 -> 확장 OneToOne
// 1:다 / 다:1 부모 테이블 데이터 1 - 자식 테이블 데이터 다 -> 접수 - 결과 OneToMany ManyToOne
// 다:다 부모 테이블 데이터 다 - 자식 테이블 데이터 다 -> 특수케이스 접수 종/특/일 - 검진분류 종/특/일 ManyToMany
