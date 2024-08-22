import { Test, TestingModule } from '@nestjs/testing';
import { BadRequestException } from '@nestjs/common';
import { UserService } from '../../../src/modules/user/user.service';
import { IUserRepository, IUserRepositoryToken } from '../../../src/modules/user/user.contracts';
import { PrismaService } from '../../../src/modules/prisma/prisma.service';
import { CreateUserDto } from '../../../src/modules/user/dto/create-user.dto';
import { User } from '@prisma/client';

// Mock para IUserRepository
const mockUserRepository = {
	insert: jest.fn(),
	findOne: jest.fn(),
	findByMatch: jest.fn(),
};

describe('UserService', () => {
	let userService: UserService;
	let userRepository: IUserRepository;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [
				UserService,
				{ provide: IUserRepositoryToken, useValue: mockUserRepository },
				PrismaService,
			],
		}).compile();

		userService = module.get<UserService>(UserService);
		userRepository = module.get<IUserRepository>(IUserRepositoryToken);
	});

	it('should be defined', () => {
		expect(userService).toBeDefined();
		expect(userRepository).toBeDefined();
	});

	describe('register', () => {
		it('should throw BadRequestException if user already exists', async () => {
			const createUserDto = { email: 'test@example.com', password: 'password' } as CreateUserDto;
			mockUserRepository.findByMatch.mockResolvedValueOnce({} as User); // Simular que el usuario ya existe

			await expect(userService.register(createUserDto)).rejects.toThrow(BadRequestException);
		});

		it('should create and return a new user', async () => {
			const createUserDto = { email: 'test@example.com', password: 'password' } as CreateUserDto;
			const createdUser = { id: 1, email: 'test@example.com', password: 'HIDDEN' } as User;
			mockUserRepository.findByMatch.mockResolvedValueOnce(null); // Simular que el usuario no existe
			mockUserRepository.insert.mockResolvedValueOnce(createdUser); // Simular creación de usuario

			const result = await userService.register(createUserDto);

			expect(result).toEqual(createdUser);
			expect(result.password).toBe('HIDDEN');
		});
	});

	describe('findOne', () => {
		it('should return a user with hidden password', async () => {
			const userId = 1;
			const foundUser = { id: userId, email: 'test@example.com', password: 'password' } as User;
			mockUserRepository.findOne.mockResolvedValueOnce(foundUser);

			const result = await userService.findOne(userId);

			expect(result).toEqual({ ...foundUser, password: 'HIDDEN' });
		});
	});
});
