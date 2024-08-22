import { ApiProperty } from '@nestjs/swagger';
import { OrderStatusEnum } from '../../orderStatus/enum/order-status.enum';
import { IsEnum, IsInt, IsNotEmpty } from 'class-validator';

export class UpdateOrderStatusDto {
	@ApiProperty()
	@IsNotEmpty()
	@IsInt()
	id: number

	@ApiProperty({ example: 'Por atender | En proceso | En delivery | Recibido'})
	@IsNotEmpty()
	@IsEnum(OrderStatusEnum)
	status: OrderStatusEnum;
}
