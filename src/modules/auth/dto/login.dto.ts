import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';
import { User } from '../../user/entities/user.entity';


export class UserLogged extends User {
	@ApiProperty()
	accessToken: string
}

export class LoginDto {
	@ApiProperty()
	@IsEmail()
	@IsNotEmpty()
	email: string;

	@ApiProperty()
	@IsNotEmpty()
	password: string;
}