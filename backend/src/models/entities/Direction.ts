import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import BaseModel from "./base/BaseModel";
import UserModel from "./User";
import City from "./City";

@Entity('direction')
export default class Address extends BaseModel {

  @PrimaryGeneratedColumn('uuid')
  protected id!: number;

  @OneToMany(() => UserModel, (user) => user.address )
  user!: UserModel[];

  @ManyToOne( () => City, city => city.address )
  @JoinColumn({
    name: 'city_id'
  })
  city!: City;

  @Column('int')
  post_code!: number;

  @Column('text')
  street!: string;

  @Column('int')
  number_street!: number;

  @Column('text')
  apartment!: string;

}

