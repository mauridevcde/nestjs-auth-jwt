import { Profile } from "src/profile/entities/profile.entity";
import { Column, DeleteDateColumn, Entity, JoinColumn, OneToOne } from "typeorm";

@Entity()
export class User {
  @Column({ primary: true, generated: true })
  id: number;

  @Column({ length: 500 })
  name: string;

  @Column({ unique: true, nullable: false })
  email: string;

  @Column({ nullable: false })
  password: string;

  @Column({ default: "user" })
  rol: string;

  @DeleteDateColumn()
  deletedAt: Date;
  
  // Relación 1 a 1 con Profile
  @OneToOne(() => Profile)
  @JoinColumn()// indica que esta tabla tendrá la FK
  profile: Profile;
}