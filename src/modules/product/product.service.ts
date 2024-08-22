import { Inject, Injectable } from '@nestjs/common';
import { IProductRepository, IProductRepositoryToken, IProductService } from './product.contract';
import { CreateProductDto } from './dto/create-product.dto';
import { Product } from './entities/product.entity';

@Injectable()
export class ProductService implements IProductService {
	constructor(
		@Inject(IProductRepositoryToken) private readonly productRepository: IProductRepository,
	) {}

	async create(product: CreateProductDto): Promise<Product> {
		return this.productRepository.create(product);
	}

	async list(): Promise<Product[]> {
		return this.productRepository.list();
	}

}
