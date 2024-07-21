import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import BaseModel from "./base/BaseModel";
import City from "./City";

@Entity('countries')
export default class Country extends BaseModel {

  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column('text')
  name!:string;

  @OneToMany( () => City, city => city.country )
  cities?: City[]

}

