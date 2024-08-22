import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateProductDto {
	@ApiProperty()
	@IsString()
	sku: string;

	@ApiProperty()
	@IsString()
	name: string;

	@ApiProperty()
	@IsString()
	type: string;

	@ApiProperty()
	@IsOptional()
	@IsString()
	tags: string | null;

	@ApiProperty()
	@IsNumber()
	price: number;

	@ApiProperty()
	@IsString()
	unitOfMeasure: string;
}
