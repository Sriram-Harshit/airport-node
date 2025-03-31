import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  BeforeUpdate,
} from "typeorm";
import { City } from "./City";
import { Country } from "./Country";

@Entity()
export class Airport {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  icao_code: string;

  @Column({ unique: true })
  iata_code: string;

  @Column()
  name: string;

  @Column()
  type: string;

  @ManyToOne(() => City, (city) => city.airports, { nullable: true })
  @JoinColumn({ name: "city_id" })
  city: City | null;

  @ManyToOne(() => Country, (country) => country.airports, { nullable: true })
  @JoinColumn({ name: "country_id" })
  country: Country | null;

  @Column({ nullable: true })
  continent_id: number;

  @Column({ nullable: true })
  website_url: string;

  @Column({ type: "datetime", default: () => "CURRENT_TIMESTAMP" })
  created_at: Date;

  @Column({ type: "datetime", default: () => "CURRENT_TIMESTAMP" })
  updated_at: Date;

  @BeforeUpdate()
  updateTimestamp() {
    this.updated_at = new Date();
  }

  @Column({ type: "float", nullable: true })
  latitude_deg: number;

  @Column({ type: "float", nullable: true })
  longitude_deg: number;

  @Column({ type: "int", nullable: true })
  elevation_ft: number;

  @Column({ nullable: true })
  wikipedia_link: string;
}
