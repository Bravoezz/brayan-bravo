import { ApiProperty } from '@nestjs/swagger';

export class Product {
	@ApiProperty()
	id: number;

	@ApiProperty()
	sku: string;

	@ApiProperty()
	name: string;

	@ApiProperty()
	type: string;

	@ApiProperty()
	tags: string | null;

	@ApiProperty()
	price: number;

	@ApiProperty()
	unitOfMeasure: string;

	@ApiProperty()
	createdAt: Date | string;

	@ApiProperty()
	updatedAt: Date | string;
}
