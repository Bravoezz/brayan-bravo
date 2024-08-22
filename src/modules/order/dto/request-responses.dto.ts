import { ApiProperty } from '@nestjs/swagger';
import { Order } from '../entities/order.entity';
import { OrderStatus } from '../../orderStatus/entities/order-status.entity';
import { User } from '../../user/entities/user.entity';

class OrderItem {
	@ApiProperty()
	id: number;
	@ApiProperty()
	quantity: number | null;
	@ApiProperty()
	orderId: number;
	@ApiProperty()
	productId: number;
}

export class OrderWithRelations extends Order {
	@ApiProperty({ type: [OrderItem] })
	OrderItem?: OrderItem[]
	@ApiProperty({ type: OrderStatus })
	status?: OrderStatus;
	@ApiProperty({ type: User })
	courier?: User;
	@ApiProperty({ type: User })
	seller?: User;
}

export class CreateOrderResponse {
	@ApiProperty()
	res: true;

	@ApiProperty()
	message: string;

	@ApiProperty({ type: OrderWithRelations })
	data: OrderWithRelations
}

export class UpdateStatusOrderResponse {
	@ApiProperty()
	res: true;

	@ApiProperty()
	message: string;

	@ApiProperty({ type: OrderWithRelations })
	data: OrderWithRelations
}

