import {
  Entity,
  BaseEntity,
  Column,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'reports' })
export class Reports extends BaseEntity {
  @PrimaryGeneratedColumn({ name: 'id' })
  id: number;

  @Column('varchar', { length: 255, name: 'name' })
  name: string;

  @Column('varchar', { length: 255, name: 'unitName' })
  unitName: string;

  @Column('int', { name: 'weeklyAmount' })
  weeklyAmount: number;
}
