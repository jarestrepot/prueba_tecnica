import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import BaseModel from "./base/BaseModel";
import Country from "./Country";
import Address from "./Direction";

@Entity('cities')
export default class City extends BaseModel {

  @PrimaryGeneratedColumn()
  id!: string;

  @Column('varchar', { nullable: false, length: 255 , unique: true })
  name!: string;

  @ManyToOne(() => Country, country => country.cities )
  @JoinColumn({
    name: "country_id",
  })
  country!: Country;

  @OneToMany( () => Address, address => address.city)
  address!: Address;

}

