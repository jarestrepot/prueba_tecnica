import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import BaseModel from "./base/BaseModel";
import Address from "./Direction";

@Entity('users')
export default class UserModel extends BaseModel {
  @PrimaryGeneratedColumn('uuid')
  id!: number;

  @Column("text")
  nickName!: string;

  @Column("text")
  name!: string;

  @Column("text")
  password!: string;

  @Column("text")
  surname!: string;

  @Column("text")
  secondSurname!: string;

  @ManyToOne(() => Address, (address) => address.user)
  @JoinColumn({
    name: "address_id",
  })
  address?: Address;

  @Column("text")
  email!: string;

  @Column("text", { nullable: true })
  token?: string;

}