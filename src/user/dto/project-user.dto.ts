import { IsEnum, IsNotEmpty, IsUUID } from 'class-validator';
import { LEVEL_ACCESS } from 'src/constants/roles';
import { ProjectEntity } from 'src/project/entities/project.entity';
import { UserEntity } from '../entities/user.entity';

export class UserToProjectDto {
  @IsNotEmpty()
  @IsUUID()
  user: UserEntity;

  @IsNotEmpty()
  @IsUUID()
  project: ProjectEntity;

  @IsNotEmpty()
  @IsEnum(LEVEL_ACCESS)
  accessLevel: LEVEL_ACCESS;
}
