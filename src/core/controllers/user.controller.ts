import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiUseTags, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '../../shared/guard/auth.guard';
import { CreateUserDto } from '../dtos/user/createUser.dto';
import { PaginateUserDto } from '../dtos/user/paginateUser.dto';
import { UpdateUserDto } from '../dtos/user/updateUser.dto';
import { ICreateUserHandler } from '../interfaces/handlers/user/createUserHandler.interface';
import { IDeleteUserHandler } from '../interfaces/handlers/user/deleteUserHandler.interface';
import { IPaginateUserHandler } from '../interfaces/handlers/user/paginateHandler.interface';
import { IUpdateUserHandler } from '../interfaces/handlers/user/updateUserHandler.interface';

@ApiUseTags('Users')
@ApiBearerAuth()
@Controller('/v1/users')
export class UserController {
  constructor(
    @Inject('IPaginateUserHandler')
    private readonly paginateUserHandler: IPaginateUserHandler,
    @Inject('ICreateUserHandler')
    private readonly createUserHandler: ICreateUserHandler,
    @Inject('IUpdateUserHandler')
    private readonly updateUserHandler: IUpdateUserHandler,
    @Inject('IDeleteUserHandler')
    private readonly deleteUserHandler: IDeleteUserHandler,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  async find(@Query() model: PaginateUserDto) {
    return await this.paginateUserHandler.handle(model);
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Body() model: CreateUserDto) {
    return await this.createUserHandler.handle(model);
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  async update(@Param('id') id: string, @Body() model: UpdateUserDto) {
    return await this.updateUserHandler.handle(id, model);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async delete(@Param('id') id: string) {
    return await this.deleteUserHandler.handle(id);
  }
}
