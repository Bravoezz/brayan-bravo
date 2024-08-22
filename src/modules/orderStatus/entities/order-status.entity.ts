import { ApiProperty } from '@nestjs/swagger';

export class OrderStatus {
	@ApiProperty()
	id: number;
	@ApiProperty()
	status: string;
}