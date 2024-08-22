import { ApiProperty } from '@nestjs/swagger';

export class Order {
	@ApiProperty()
	id: number;

	@ApiProperty()
	orderNumber: string;

	@ApiProperty()
	orderDate: Date;

	@ApiProperty()
	receptionDate: Date | null;

	@ApiProperty()
	dispatchDate: Date | null;

	@ApiProperty()
	deliveryDate: Date | null;

	@ApiProperty()
	statusId: number;

	@ApiProperty()
	courierId: number;

	@ApiProperty()
	sellerId: number;

	@ApiProperty()
	userId: number;

	@ApiProperty()
	createdAt: Date | string;

	@ApiProperty()
	updatedAt: Date | string;
}
