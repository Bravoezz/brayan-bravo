import { Order } from './entities/order.entity';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderStatusDto } from './dto/update-order.dto';


export interface IOrderRepository {
	create(data: CreateOrderDto): Promise<Order>;
	update(orderId: number, data: UpdateOrderStatusDto): Promise<Order>;
	list(): Promise<Order[]>;
	findOne(id: number): Promise<(Order & {status: {status: string }}) | null>;
}

export const IOrderRepositoryToken = Symbol.for('IOrderRepository')


export interface IOrderService {
	createOrder(data: CreateOrderDto): Promise<Order>;
	list(): Promise<Order[]>;
	update(orderId: number,data: UpdateOrderStatusDto): Promise<Order>;
}

export const IOrderServiceToken = Symbol.for('IOrderService')