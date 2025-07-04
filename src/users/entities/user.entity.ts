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

  @Column({ nullable: false, select: false })
  password: string;

  @Column({ default: "user" })
  role: string;

  @DeleteDateColumn()
  deletedAt: Date;

  @OneToOne(() => Profile, (profile) => profile.user, { cascade: true })
  @JoinColumn()
  profile: Profile;
}