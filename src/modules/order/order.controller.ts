import { Body, Controller, Get, Inject, Param, ParseIntPipe, Patch, Post, Put, UseGuards } from '@nestjs/common';
import { IOrderService, IOrderServiceToken } from './order.contract';
import { CreateOrderDto } from './dto/create-order.dto';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '../auth/guards/auth.guard';
import { CreateOrderResponse, OrderWithRelations, UpdateStatusOrderResponse } from './dto/request-responses.dto';
import { UpdateOrderStatusDto } from './dto/update-order.dto';

@ApiBearerAuth()
@ApiTags('order')
@Controller('order')
export class OrderController {
	constructor(@Inject(IOrderServiceToken) private readonly orderService: IOrderService) {}

	@Post('create')
	@UseGuards(AuthGuard) //login jwt
	@ApiBody({ type: CreateOrderDto})
	@ApiOperation({ summary: 'Crea una nuevo pedido' })
	@ApiResponse({ type: CreateOrderResponse, status: '2XX', description: 'El pedido ah sido creada correctamente' })
	async create(@Body() createOrderDto: CreateOrderDto): Promise<CreateOrderResponse> {
		return {
			res: true,
			message: 'El pedido ah sido creada correctamente',
			data: await this.orderService.createOrder(createOrderDto)
		}
	}

	@Patch('update/:id')
	@UseGuards(AuthGuard) //login jwt
	@ApiBody({ type: UpdateOrderStatusDto})
	@ApiOperation({ summary: 'Actualizar el estado de un pedido' })
	@ApiResponse({ type: UpdateStatusOrderResponse, status: '2XX', description: 'El estado del pedido se ah actualizado satisfactoriamente' })
	async updateOrderStatus(
		@Body() updateOrderStatusDto: UpdateOrderStatusDto,
		@Param('id', ParseIntPipe) id: number): Promise<UpdateStatusOrderResponse> {
		return {
			res: true,
			message: 'El estado del pedido se ah actualizado satisfactoriamente',
			data: await this.orderService.update(id,updateOrderStatusDto)
		}
	}

	@Get('list')
	@UseGuards(AuthGuard) //login jwt
	@ApiOperation({ summary: 'Lista los pedidos' })
	@ApiResponse({ type: [OrderWithRelations], status: '2XX', description: 'Pedidos encontrados correctamente' })
	async listAll(): Promise<OrderWithRelations[]> {
		return await this.orderService.list()
	}

}
