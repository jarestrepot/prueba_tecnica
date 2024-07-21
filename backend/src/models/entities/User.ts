import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import BaseModel from "./base/BaseModel";
import Address from "./Direction";

@Entity('users')
export default class UserModel extends BaseModel {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column("varchar", { nullable: false, unique: true, length: 50 })
  nick_name!: string;

  @Column("text")
  name!: string;

  @Column("text")
  password!: string;

  @Column("text")
  surname!: string;

  @Column("text", { nullable: true })
  secondSurname?: string;

  @ManyToOne(() => Address, (address) => address.user)
  @JoinColumn({
    name: "address_id",
  })
  address?: Address;

  @Column("varchar", { nullable: false, unique: true, length: 255 })
  email!: string;

  @Column("text", { nullable: true })
  token?: string;

}