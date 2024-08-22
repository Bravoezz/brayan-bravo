import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateUserDto {
	@ApiProperty()
	@IsString()
	workerCode: string;

	@ApiProperty()
	@IsString()
	name: string;

	@ApiProperty()
	@IsString()
	@IsEmail()
	email: string;

	@ApiProperty()
	@IsOptional()
	@IsString()
	phone: string | null;

	@ApiProperty()
	@IsOptional()
	@IsString()
	position: string | null;

	@ApiProperty()
	@IsString()
	password: string;

	@ApiProperty()
	@IsNumber()
	roleId: number;
}
