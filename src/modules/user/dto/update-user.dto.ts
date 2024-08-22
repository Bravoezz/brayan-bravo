import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateUserDto {
	@ApiProperty()
	@IsString()
	@IsOptional()
	workerCode: string | null;

	@ApiProperty()
	@IsString()
	@IsOptional()
	name: string | null;

	@ApiProperty()
	@IsString()
	@IsOptional()
	email: string | null;

	@ApiProperty()
	@IsOptional()
	@IsString()
	phone: string | null;

	@ApiProperty()
	@IsOptional()
	@IsString()
	position: string | null;

	@ApiProperty()
	@IsOptional()
	@IsString()
	password: string | null;

	@ApiProperty()
	@IsOptional()
	@IsNumber()
	roleId: number | null;
}
