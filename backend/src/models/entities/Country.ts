import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import BaseModel from "./base/BaseModel";
import City from "./City";

@Entity('country')
export default class Country extends BaseModel {

  @PrimaryGeneratedColumn('uuid')
  id!: number;

  @Column('text')
  name!:string;

  @OneToMany( () => City, city => city.country )
  cities?: City[]

}

