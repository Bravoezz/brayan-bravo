import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';

export interface IUserRepository {
	insert(data: CreateUserDto): Promise<User>;
	findOne(id: number): Promise<User>;
	findByMatch(filter: Partial<User>): Promise<User | null>;
}

export const IUserRepositoryToken = Symbol.for('IUserRepository');

export interface IUserService {
	register(data: CreateUserDto): Promise<User>
	findOne(id: number): Promise<User>;
}

export const IUserServiceToken = Symbol.for('IUserService');