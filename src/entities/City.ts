import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  JoinColumn,
  BeforeUpdate,
} from "typeorm";
import { Country } from "./Country";
import { Airport } from "./Airport";

@Entity()
export class City {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ nullable: true })
  alt_name: string;

  @ManyToOne(() => Country, (country) => country.cities, { nullable: true }) // Allow nullable country
  @JoinColumn({ name: "country_id" })
  country: Country | null;

  @Column({ default: true })
  is_active: boolean;

  @Column({ type: "datetime", default: () => "CURRENT_TIMESTAMP" })
  created_at: Date;

  @Column({ type: "datetime", default: () => "CURRENT_TIMESTAMP" })
  updated_at: Date;

  @BeforeUpdate()
  updateTimestamp() {
    this.updated_at = new Date();
  }

  @Column({ type: "float", nullable: true })
  lat: number;

  @Column({ type: "float", nullable: true })
  long: number;

  @OneToMany(() => Airport, (airport) => airport.city)
  airports: Airport[];
}
