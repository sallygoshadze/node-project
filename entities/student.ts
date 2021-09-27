import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity({ name: "students" })
export class Student {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  firstName!: string;

  @Column()
  lastName!: string;

  @Column()
  age!: number;

  @Column()
  faculty!: string;
}
