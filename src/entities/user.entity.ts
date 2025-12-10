import { Column, DeleteDateColumn, Entity, PrimaryColumn } from 'typeorm';

// 테이블과 1:1 관계
@Entity()
export class User {
  @PrimaryColumn('varchar', { length: 30 })
  id: string; // PK id varchar(30)

  @Column('varchar', { nullable: false, length: 30 })
  name: string;

  @Column('varchar', { nullable: false, length: 100, select: false })
  password: string;

  @DeleteDateColumn({ type: 'timestamp' })
  deletedAt?: Date;
}

// UserAuth -> Pascal (class, type)
// var, func -> camel
// snake -> db
