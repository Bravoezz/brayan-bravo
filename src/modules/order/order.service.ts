import { BadRequestException, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { IOrderRepository, IOrderRepositoryToken, IOrderService } from './order.contract';
import { Order } from './entities/order.entity';
import { IUserRepository, IUserRepositoryToken } from '../user/user.contracts';
import { UpdateOrderStatusDto } from './dto/update-order.dto';
import { OrderStatusEnum } from '../orderStatus/enum/order-status.enum';

@Injectable()
export class OrderService implements IOrderService {
	constructor(
		@Inject(IOrderRepositoryToken) private readonly orderRepository: IOrderRepository,
		@Inject(IUserRepositoryToken) private readonly userRepository: IUserRepository,
	) {}

	async createOrder(createOrderDto: CreateOrderDto): Promise<Order> {
		//verificar ids
		const [user, seller, courier] = await Promise.all([
			this.userRepository.findOne(createOrderDto.userId),
			this.userRepository.findOne(createOrderDto.sellerId),
			this.userRepository.findOne(createOrderDto.courierId),
		])
		if(!user || !seller || !courier) throw new BadRequestException('Datos ingresados incorrectos');

		return this.orderRepository.create(createOrderDto)
	}

	async update(orderId: number,updateOrderStatusDto: UpdateOrderStatusDto): Promise<Order> {
		//verificar si el pedido existe
		const foundOrder = await this.orderRepository.findOne(orderId)
		if(!foundOrder) throw new NotFoundException('No se econtro el pedido con id ' + orderId);

		//validar el cambio de estado
		if (!this.canUpdateOrderStatus(foundOrder.status.status, updateOrderStatusDto.status))
			throw new BadRequestException(`No se puede actualizar el estado del pedido de ${foundOrder.status.status} a ${updateOrderStatusDto.status}`);

		return await this.orderRepository.update(orderId,updateOrderStatusDto)
	}

	private canUpdateOrderStatus(currentStatus: string, newStatus: OrderStatusEnum): boolean{
		const statusHierarchy: OrderStatusEnum[] = [
			OrderStatusEnum.Pending,
			OrderStatusEnum.InProgress,
			OrderStatusEnum.InDelivery,
			OrderStatusEnum.Received,
		]

		const currentIndex = statusHierarchy.indexOf(currentStatus as OrderStatusEnum);
		const newIndex = statusHierarchy.indexOf(newStatus);

		// Validar que el nuevo estado sea mayor en la jerarquía o si es menor
		return newIndex >= currentIndex;
	}

	async list(): Promise<Order[]> {
		return this.orderRepository.list()
	}

}
