import { Exclude } from 'class-transformer';
import { BaseEntity } from 'src/config/base.entity';
import { ROLES } from 'src/constants/roles';
import { IUser } from 'src/interface/user.interface';
import { Entity, Column, OneToMany } from 'typeorm';
import { UserProjectsEntity } from './userProject.entity';

@Entity({ name: 'users' })
export class UserEntity extends BaseEntity implements IUser {
  @Column()
  frist_name: string;

  @Column()
  last_name: string;

  @Column()
  age: number;

  @Column({ unique: true })
  email: string;

  @Column({ unique: true })
  username: string;

  @Exclude()
  @Column()
  password: string;

  @Column({ type: 'enum', enum: ROLES })
  role: ROLES;

  @OneToMany(() => UserProjectsEntity, (userProjects) => userProjects.user)
  projectIncludes: UserProjectsEntity[];
}
