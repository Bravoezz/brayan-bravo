import { CreateProductDto } from './dto/create-product.dto';
import { Product } from './entities/product.entity';

export interface IProductRepository {
	list(): Promise<Product[]>;
	create(product: CreateProductDto): Promise<Product>;
}

export const IProductRepositoryToken = Symbol.for('IProductRepository');


export interface IProductService {
	list(): Promise<Product[]>;
	create(product: CreateProductDto): Promise<Product>;
}

export const IProductServiceToken = Symbol.for('IProductService');