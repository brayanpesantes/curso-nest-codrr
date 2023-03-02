import { BaseEntity } from 'src/config/base.entity';
import { IProject } from 'src/interface/project.interface';
import { UserProjectsEntity } from 'src/user/entities/userProject.entity';
import { Entity, Column, OneToMany } from 'typeorm';

@Entity({ name: 'projects' })
export class ProjectEntity extends BaseEntity implements IProject {
  @Column()
  name: string;

  @Column()
  description: string;

  @OneToMany(() => UserProjectsEntity, (userProject) => userProject.project)
  userIncludes: UserProjectsEntity[];
}
