import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ErrorManager } from 'src/utils/error.manager';
import { Repository, UpdateResult, DeleteResult } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UserToProjectDto } from './dto/project-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserEntity } from './entities/user.entity';
import { UserProjectsEntity } from './entities/userProject.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly UserRepository: Repository<UserEntity>,
    @InjectRepository(UserProjectsEntity)
    private readonly UserProjectsRepository: Repository<UserProjectsEntity>,
  ) {}
  async create(createUserDto: CreateUserDto): Promise<UserEntity> {
    try {
      createUserDto.password = await bcrypt.hash(
        createUserDto.password,
        +process.env.HASH_SALT,
      );

      return await this.UserRepository.save(createUserDto);
    } catch (error) {
      throw new Error(error);
    }
  }

  async findAll(): Promise<UserEntity[]> {
    try {
      const users: UserEntity[] = await this.UserRepository.find();
      if (users.length === 0) {
        throw new ErrorManager({
          type: 'BAD_REQUEST',
          message: 'No se encontro resultados',
        });
      }
      return users;
    } catch (error) {
      throw ErrorManager.createSignatureError(error.message);
    }
  }

  async findOne(id: string): Promise<UserEntity> {
    try {
      const user: UserEntity = await this.UserRepository.createQueryBuilder(
        'user',
      )
        .where({ id })
        .leftJoinAndSelect('user.projectIncludes', 'projectIncludes')
        .leftJoinAndSelect('projectIncludes.project', 'project')
        .getOne();
      if (!user)
        throw new ErrorManager({
          type: 'BAD_REQUEST',
          message: 'No se encontro resultados',
        });
      return user;
    } catch (error) {
      throw ErrorManager.createSignatureError(error.message);
    }
  }
  async findBy({ key, value }: { key: keyof CreateUserDto; value: any }) {
    try {
      const user: UserEntity = await this.UserRepository.createQueryBuilder(
        'user',
      )
        .addSelect('user.password')
        .where({ [key]: value })
        .getOne();
      return user;
    } catch (error) {
      throw ErrorManager.createSignatureError(error.message);
    }
  }
  async update(
    id: string,
    updateUserDto: UpdateUserDto,
  ): Promise<UpdateResult | undefined> {
    try {
      const user = await this.UserRepository.update(id, updateUserDto);
      if (user.affected === 0)
        new ErrorManager({
          type: 'BAD_REQUEST',
          message: 'No se encontro resultados',
        });
      return user;
    } catch (error) {
      throw ErrorManager.createSignatureError(error.message);
    }
  }

  async remove(id: string): Promise<DeleteResult | undefined> {
    try {
      const user = await this.UserRepository.delete(id);
      if (user.affected === 0)
        throw new ErrorManager({
          type: 'BAD_REQUEST',
          message: 'No se encontro resultados',
        });
      return user;
    } catch (error) {
      throw ErrorManager.createSignatureError(error.message);
    }
  }
  public async relationToProject(body: UserToProjectDto) {
    try {
      return await this.UserProjectsRepository.save(body);
    } catch (error) {
      throw ErrorManager.createSignatureError(error.message);
    }
  }
}
