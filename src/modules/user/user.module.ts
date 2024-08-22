import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { PrismaService } from '../prisma/prisma.service';
import { IUserRepositoryToken, IUserServiceToken } from './user.contracts';
import { UserRepository } from './user.repository';

@Module({
	controllers: [UserController],
	providers: [
		{ provide: IUserServiceToken, useClass: UserService},
		{ provide: IUserRepositoryToken, useClass: UserRepository},
		PrismaService
	],
	exports: [
		{ provide: IUserRepositoryToken, useClass: UserRepository},
	]
})
export class UserModule {}
