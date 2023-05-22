import {
  JsonController,
  Param,
  Body,
  Get,
  Post,
  Put,
  Delete,
  Authorized,
  QueryParams,
  BadRequestError
} from 'routing-controllers';
import { InsertResult, UpdateResult, DeleteResult } from 'typeorm';
import { Service } from 'typedi';
import { User } from '@entities/user.entity';
import { UsersService } from '@services/users.service';
import { OptionQuery } from '@queries/option.query';
import { ErrorsMessages } from '../constants/errorMessages';
import { SignUpDTO } from '@dto/signUpDTO';
import { EntityMapper } from '@clients/mapper/entityMapper.service';

@JsonController('/users')
@Service()
export class UserController {
  constructor(private readonly usersService: UsersService) {}

  @Authorized()
  @Get()
  async index(@QueryParams() query: OptionQuery): Promise<any> {
    return this.usersService.findAll(query);
  }

  @Get('/:id')
  async show(@Param('id') id: string): Promise<User | undefined> {
    return this.usersService.showUser(id);
  }

  @Post()
  async post(@Body() userDTO: SignUpDTO): Promise<InsertResult> {
    try {
      return await this.usersService.createUser(
        EntityMapper.mapTo(User, userDTO)
      );
    } catch (error: any) {
      throw new BadRequestError(
        error.detail ?? error.message ?? ErrorsMessages.INTERNAL_SERVER_ERROR
      );
    }
  }

  @Put('/:id')
  async put(
    @Param('id') id: string,
    @Body() userDTO: SignUpDTO
  ): Promise<UpdateResult> {
    const user: User = EntityMapper.mapTo(User, userDTO);
    return this.usersService.editUser({ id, user });
  }

  @Delete('/:id')
  async delete(@Param('id') id: string): Promise<DeleteResult> {
    return this.usersService.deleteUser(id);
  }
}
