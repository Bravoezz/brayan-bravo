import { IUserRepository } from './user.contracts';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import { PrismaService } from '../prisma/prisma.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UserRepository implements IUserRepository {
	constructor(private readonly database: PrismaService) {}

	async insert(data: CreateUserDto): Promise<User> {
		return this.database.user.create({ data });
	}

	async findOne(id: number): Promise<User> {
		return this.database.user.findUnique({ where: {id}})
	}

	async findByMatch(filter: Partial<User>): Promise<User | null> {
		return this.database.user.findUnique({ where: filter as User });
	}
}