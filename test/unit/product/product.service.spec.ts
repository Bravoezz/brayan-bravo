import { Test, TestingModule } from '@nestjs/testing';
import { ProductService } from '../../../src/modules/product/product.service';
import { IProductRepository, IProductRepositoryToken } from '../../../src/modules/product/product.contract';
import { CreateProductDto } from '../../../src/modules/product/dto/create-product.dto';
import { Product } from '@prisma/client';
import { PrismaService } from '../../../src/modules/prisma/prisma.service';

describe('ProductService', () => {
	let productService: ProductService;
	let productRepository: IProductRepository;

	beforeEach(async () => {
		// Crear un mock del PrismaService
		const prismaServiceMock = {
			product: {
				create: jest.fn(),
				findMany: jest.fn(),
			},
		};

		const productRepositoryMock = {
			create: jest.fn().mockImplementation((dto: CreateProductDto) => {
				return {
					id: 1,
					...dto,
					createdAt: new Date(),
					updatedAt: new Date(),
				} as Product;
			}),
			list: jest.fn().mockResolvedValue([
				{
					id: 1,
					name: 'Test Product',
					price: 100.0,
					sku: 'SKU123',
					type: 'Physical',
					unitOfMeasure: 'pcs',
					createdAt: new Date(),
					updatedAt: new Date(),
				},
			]),
		};

		const module: TestingModule = await Test.createTestingModule({
			providers: [
				ProductService,
				{ provide: IProductRepositoryToken, useValue: productRepositoryMock },
				{ provide: PrismaService, useValue: prismaServiceMock },
			],
		}).compile();

		productService = module.get<ProductService>(ProductService);
		productRepository = module.get<IProductRepository>(IProductRepositoryToken);
	});

	test('should be defined', () => {
		expect(productService).toBeDefined();
		expect(productRepository).toBeDefined();
	});

	test('create - should create a new product', async () => {
		const createProductDto: CreateProductDto = {
			name: 'Test Product',
			price: 100.0,
			sku: 'SKU123',
			type: 'Physical',
			unitOfMeasure: 'pcs',
			tags: '',
		};

		const result = await productService.create(createProductDto);

		expect(result).toHaveProperty('id');
		expect(result.name).toEqual('Test Product');
		expect(result.price).toEqual(100.0);
		expect(productRepository.create).toHaveBeenCalledWith(createProductDto);
	});

	test('list - should return a list of products', async () => {
		const result = await productService.list();

		expect(result).toBeInstanceOf(Array);
		expect(result).toHaveLength(1);
		expect(result[0].name).toEqual('Test Product');
		expect(productRepository.list).toHaveBeenCalled();
	});
});
