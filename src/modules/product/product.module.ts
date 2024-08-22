import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { PrismaService } from '../prisma/prisma.service';
import { IProductRepositoryToken, IProductServiceToken } from './product.contract';
import { ProductRepository } from './product.repository';

@Module({
	controllers: [ProductController],
	providers: [
		PrismaService,
		{ provide: IProductServiceToken, useClass: ProductService},
		{ provide: IProductRepositoryToken, useClass: ProductRepository},
	],
})
export class ProductModule {}
