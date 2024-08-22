import { Controller, Get, Post, Body, Param, Inject, ParseIntPipe, UseGuards } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { IUserService, IUserServiceToken } from './user.contracts';
import { CreateUserResponse, FindOneUserResponse } from './dto/request-responses.dto';
import { AuthGuard } from '../auth/guards/auth.guard';

@ApiBearerAuth()
@ApiTags('user')
@Controller('user')
export class UserController {
	constructor(@Inject(IUserServiceToken) private readonly userService: IUserService) {}

	@Post('create')
	@ApiBody({ type: CreateUserDto})
	@ApiOperation({ summary: 'Crea un nuevo usuario' })
	@ApiResponse({ type: CreateUserResponse, status: '2XX', description: 'Usuario creado correctamente' })
	async create(@Body() createUserDto: CreateUserDto): Promise<CreateUserResponse> {
		return {
			res: true,
			message: 'Usuario creado correctamente',
			data: await this.userService.register(createUserDto)
		}
	}

	//@ApiBearerAuth()// beare auth in swagger para endpoint especifico
	@Get('list/:id')
	@UseGuards(AuthGuard) //login jwt
	@ApiOperation({ summary: 'Encontrar un usuario' })
	@ApiResponse({ type: FindOneUserResponse, status: '2XX', description: 'Usuario encontrado correctamente' })
	async findOne(@Param('id', ParseIntPipe) id: number): Promise<FindOneUserResponse> {
		return {
			res: true,
			message: 'Usuario encontrado correctamente',
			data: await this.userService.findOne(id),
		};
	}
}

/**
{
	"workerCode": "yerzon-238-dt",
	"name": "yerzon valentin",
	"email": "yerzon-valentin@gmail.com",
	"phone": "987455858",
	"position": "Trabajador",
	"password": "passwordyer344",
	"roleId": 2
}

 **/