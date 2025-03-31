import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { City } from "./City";
import { Airport } from "./Airport";

@Entity()
export class Country {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ nullable: true })
  alt_name: string;

  @Column({ unique: true })
  country_code_two: string;

  @Column({ unique: true })
  country_code_three: string;

  @Column({ nullable: true })
  flag_app: string;

  @Column()
  mobile_code: string;

  @Column({ nullable: true })
  continent_id: number;

  @Column({ nullable: true })
  country_flag: string;

  @OneToMany(() => City, (city) => city.country)
  cities: City[];

  @OneToMany(() => Airport, (airport) => airport.country)
  airports: Airport[];
}
