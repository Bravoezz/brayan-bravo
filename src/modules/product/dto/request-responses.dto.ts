import { ApiProperty } from '@nestjs/swagger';
import { Product } from '../entities/product.entity';

export class CreateProductResponse {
	@ApiProperty()
	res: true;

	@ApiProperty()
	message: string;

	@ApiProperty({ type: Product })
	data: Product
}

