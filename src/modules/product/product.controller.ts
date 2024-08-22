import { Controller, Get, Post, Body, Inject, UseGuards } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { CreateProductResponse } from './dto/request-responses.dto';
import { IProductService, IProductServiceToken } from './product.contract';
import { AuthGuard } from '../auth/guards/auth.guard';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Product } from './entities/product.entity';

@ApiBearerAuth()
@ApiTags('product')
@Controller('product')
export class ProductController {
	constructor(@Inject(IProductServiceToken) private readonly productService: IProductService) {}

	@Post('create')
	@UseGuards(AuthGuard) //login jwt
	@ApiBody({ type: CreateProductDto})
	@ApiOperation({ summary: 'Crea un producto' })
	@ApiResponse({ type: CreateProductResponse, status: '2XX', description: 'El producto ah sido creado correctamente' })
	async create(@Body() createProductDto: CreateProductDto): Promise<CreateProductResponse> {
		return {
			res: true,
			message: 'El producto ah sido creado correctamente',
			data: await this.productService.create(createProductDto),
		}
	}

	@Get('list')
	@UseGuards(AuthGuard) //login jwt
	@ApiOperation({ summary: 'Lista todos los producto' })
	@ApiResponse({ type: [Product], status: '2XX' })
	async listAll(): Promise<Product[]> {
		return await this.productService.list()
	}


}
