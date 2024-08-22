import { IProductRepository } from './product.contract';
import { CreateProductDto } from './dto/create-product.dto';
import { Product } from './entities/product.entity';
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ProductRepository implements IProductRepository {
	constructor(
		private readonly database: PrismaService
	) {	}

	async create(product: CreateProductDto): Promise<Product> {
		return this.database.product.create({ data: product });
	}

	async list(): Promise<Product[]> {
		return this.database.product.findMany();
	}

}