import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { IUserRepository, IUserRepositoryToken, IUserService } from './user.contracts';
import { User } from './entities/user.entity';

@Injectable()
export class UserService implements IUserService {
	constructor(@Inject(IUserRepositoryToken) private readonly userRepository: IUserRepository) {}

	async findOne(id: number): Promise<User> {
		const foundUs = await this.userRepository.findOne(id);
		foundUs.password = 'HIDDEN'
		return foundUs
	}

	async register(data: CreateUserDto): Promise<User> {
		const foundUs: User | null = await this.userRepository.findByMatch({ email: data.email })
		if (foundUs) throw new BadRequestException('El usuario ya existe existe');

		const userCreated = await this.userRepository.insert(data)
		userCreated.password = 'HIDDEN'
		return userCreated
	}

}
