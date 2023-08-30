import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import RealEstate from "./realEstates.entity";

@Entity("addresses")
class Address {
  @PrimaryGeneratedColumn("increment")
  id: number;

  @Column({ type: "varchar", length: 45 })
  street: string;

  @Column({ type: "varchar", length: 8 })
  zipCode: string;

  @Column({ type: "integer" })
  number: number ;

  @Column({ type: "varchar", length: 20 })
  city: string;

  @Column({ type: "varchar", length: 2 })
  state: string;

  @OneToOne(() => RealEstate, (realState) => realState.address)
  realState: RealEstate;
}

export default Address;
