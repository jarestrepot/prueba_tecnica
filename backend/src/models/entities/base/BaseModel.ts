import { BaseEntity, CreateDateColumn, UpdateDateColumn } from 'typeorm';

export default class BaseModel extends BaseEntity {
  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}