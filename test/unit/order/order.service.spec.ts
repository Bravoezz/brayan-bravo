import { Test, TestingModule } from '@nestjs/testing';
import { BadRequestException, NotFoundException } from '@nestjs/common';
import { OrderService } from '../../../src/modules/order/order.service';
import { IOrderRepositoryToken } from '../../../src/modules/order/order.contract';
import { IUserRepositoryToken } from '../../../src/modules/user/user.contracts';
import { CreateOrderDto } from '../../../src/modules/order/dto/create-order.dto';
import { Order } from '@prisma/client';
import { UpdateOrderStatusDto } from '../../../src/modules/order/dto/update-order.dto';
import { OrderStatusEnum } from '../../../src/modules/orderStatus/enum/order-status.enum';

// Mocks
const mockOrderRepository = {
	create: jest.fn(),
	update: jest.fn(),
	list: jest.fn(),
	findOne: jest.fn(),
};

const mockUserRepository = {
	findOne: jest.fn(),
};

describe('OrderService', () => {
	let service: OrderService;
	let orderRepository: typeof mockOrderRepository;
	let userRepository: typeof mockUserRepository;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [
				OrderService,
				{ provide: IOrderRepositoryToken, useValue: mockOrderRepository },
				{ provide: IUserRepositoryToken, useValue: mockUserRepository },
			],
		}).compile();

		service = module.get<OrderService>(OrderService);
		orderRepository = module.get(IOrderRepositoryToken);
		userRepository = module.get(IUserRepositoryToken);
	});

	afterEach(() => {
		jest.clearAllMocks();
	});

	describe('createOrder', () => {
		it('should create a new order successfully', async () => {
			const createOrderDto: CreateOrderDto = {
				orderNumber: '123',
				userId: 1,
				sellerId: 2,
				courierId: 3,
				statusId: 1,
				productIds: [1, 2, 3],
			};

			userRepository.findOne.mockResolvedValueOnce({ id: 1 });
			userRepository.findOne.mockResolvedValueOnce({ id: 2 });
			userRepository.findOne.mockResolvedValueOnce({ id: 3 });

			const createdOrder = { id: 1, ...createOrderDto } as Partial<Order>;
			orderRepository.create.mockResolvedValue(createdOrder);

			const result = await service.createOrder(createOrderDto);

			expect(result).toEqual(createdOrder);
			expect(orderRepository.create).toHaveBeenCalledWith(createOrderDto);
		});

		it('should throw BadRequestException if user, seller, or courier is not found', async () => {
			const createOrderDto: CreateOrderDto = {
				orderNumber: '123',
				userId: 1,
				sellerId: 2,
				courierId: 3,
				statusId: 1,
				productIds: [1, 2, 3],
			};

			userRepository.findOne.mockResolvedValueOnce(null); // User not found

			await expect(service.createOrder(createOrderDto)).rejects.toThrow(BadRequestException);
		});
	});

	describe('update', () => {
		it('should update order status successfully', async () => {
			const updateOrderStatusDto: UpdateOrderStatusDto = {
				id: 1,
				status: OrderStatusEnum.InProgress,
			};

			const foundOrder = { id: 1, status: { status: OrderStatusEnum.Pending } } as Partial<Order>;
			orderRepository.findOne.mockResolvedValue(foundOrder);

			const updatedOrder = {
				id: 1, ...foundOrder,
				status: { status: OrderStatusEnum.InProgress },
			} as Partial<Order>;
			orderRepository.update.mockResolvedValue(updatedOrder);

			const result = await service.update(1, updateOrderStatusDto);

			expect(result).toEqual(updatedOrder);
			expect(orderRepository.findOne).toHaveBeenCalledWith(1);
			expect(orderRepository.update).toHaveBeenCalledWith(1, updateOrderStatusDto);
		});

		it('should throw NotFoundException if order is not found', async () => {
			const updateOrderStatusDto: UpdateOrderStatusDto = {
				id: 1,
				status: OrderStatusEnum.InProgress,
			};

			orderRepository.findOne.mockResolvedValue(null); // Order not found

			await expect(service.update(1, updateOrderStatusDto)).rejects.toThrow(NotFoundException);
		});

		it('should throw BadRequestException if status update is not allowed', async () => {
			const updateOrderStatusDto: UpdateOrderStatusDto = {
				id: 1,
				status: OrderStatusEnum.Pending,
			};

			const foundOrder = { id: 1, status: { status: OrderStatusEnum.Received } } as Partial<Order>;
			orderRepository.findOne.mockResolvedValue(foundOrder);

			await expect(service.update(1, updateOrderStatusDto)).rejects.toThrow(BadRequestException);
		});
	});

	describe('list', () => {
		it('should return a list of orders', async () => {
			const orders = [{ id: 1 }, { id: 2 }] as Order[];
			orderRepository.list.mockResolvedValue(orders);

			const result = await service.list();

			expect(result).toEqual(orders);
			expect(result.length).toEqual(orders.length)
			expect(orderRepository.list).toHaveBeenCalledTimes(1);
		});
	});
});
