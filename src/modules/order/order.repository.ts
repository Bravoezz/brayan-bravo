import { IOrderRepository } from './order.contract';
import { CreateOrderDto } from './dto/create-order.dto';
import { PrismaService } from '../prisma/prisma.service';
import { Order } from './entities/order.entity';
import { Injectable } from '@nestjs/common';
import { UpdateOrderStatusDto } from './dto/update-order.dto';
import { Prisma } from '@prisma/client';
import { OrderStatusEnum } from '../orderStatus/enum/order-status.enum';


@Injectable()
export class OrderRepository implements IOrderRepository {
	constructor(private readonly database: PrismaService) {}

	async create(createOrderDto: CreateOrderDto): Promise<Order> {
		return this.database.order.create({
			data: {
				orderNumber: createOrderDto.orderNumber,
				seller: { connect: { id: createOrderDto.sellerId }},
				courier: { connect: { id: createOrderDto.courierId }},
				user: { connect: { id: createOrderDto.userId }},
				status: { connect: { id: createOrderDto.statusId }},
				OrderItem: {
					create: createOrderDto.productIds.map( productId => ({
						product: { connect: { id: productId }}
					}))
				}
			},
			include: { OrderItem: true, status: true }
		});
	}

	async update(orderId: number,updateOrderStatusDto: UpdateOrderStatusDto): Promise<Order> {
		const data: Prisma.OrderUpdateInput = {
			status: { connect: { id: updateOrderStatusDto.id }}
		}

		// Actualizar fechas según el estado
		if(updateOrderStatusDto.status === OrderStatusEnum.Pending) data.orderDate = new Date();
		if(updateOrderStatusDto.status === OrderStatusEnum.InProgress) data.receptionDate = new Date();
		if(updateOrderStatusDto.status === OrderStatusEnum.InDelivery) data.dispatchDate = new Date();
		if(updateOrderStatusDto.status === OrderStatusEnum.Received) data.deliveryDate = new Date();

		return this.database.order.update({
			where: { id: orderId },
			data,
			include: {
				status: true,
				seller: { select: { id: true, workerCode: true, name: true, email: true } },
				courier: { select: { id: true, workerCode: true, name: true, email: true } },
			}
		})
	}

	async list(): Promise<Order[]> {
		return this.database.order.findMany({
			include: {
				status: true,
				seller: { select: { id: true, workerCode: true, name: true, email: true } },
				courier: { select: { id: true, workerCode: true, name: true, email: true } },
			}
		})
	}

	async findOne(id: number): Promise<(Order & {status: {status: string }}) | null> {
		return this.database.order.findUnique({ where: {id}, include: { status: true}})
	}

}