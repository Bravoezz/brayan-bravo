// src/orders/dto/create-order.dto.ts
import { IsNotEmpty, IsInt, IsArray, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateOrderDto {
	@ApiProperty()
	@IsNotEmpty()
	@IsString()
	@ApiProperty()
	orderNumber: string;

	@IsArray()
	@IsNotEmpty()
	@ApiProperty()
	productIds: number[];

	@IsInt()
	@IsNotEmpty()
	@ApiProperty()
	sellerId: number;

	@IsInt()
	@IsNotEmpty()
	@ApiProperty()
	courierId: number;

	@IsInt()
	@IsNotEmpty()
	@ApiProperty()
	userId: number;  // El ID del usuario asociado al pedido

	@IsInt()
	@IsNotEmpty()
	@ApiProperty()
	statusId: number;  // El ID del estado inicial del pedido
}

