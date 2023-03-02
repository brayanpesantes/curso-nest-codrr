import { Entity, Column, ManyToOne } from 'typeorm';
import { BaseEntity } from 'src/config/base.entity';
import { LEVEL_ACCESS } from 'src/constants/roles';
import { UserEntity } from './user.entity';
import { ProjectEntity } from 'src/project/entities/project.entity';

@Entity({ name: 'user_projects' })
export class UserProjectsEntity extends BaseEntity {
  @Column({ type: 'enum', enum: LEVEL_ACCESS })
  accessLevel: LEVEL_ACCESS;

  @ManyToOne(() => UserEntity, (user) => user.projectIncludes)
  user: UserEntity;

  @ManyToOne(() => ProjectEntity, (project) => project.userIncludes)
  project: ProjectEntity;
}
