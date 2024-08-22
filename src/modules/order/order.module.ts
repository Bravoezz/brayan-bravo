import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { PrismaService } from '../prisma/prisma.service';
import { IOrderRepositoryToken, IOrderServiceToken } from './order.contract';
import { OrderRepository } from './order.repository';
import { UserModule } from '../user/user.module';

@Module({
	imports:[ UserModule ],
	controllers: [OrderController],
	providers: [
		PrismaService,
		{ provide: IOrderServiceToken, useClass: OrderService},
		{ provide: IOrderRepositoryToken, useClass: OrderRepository},
	],
})
export class OrderModule {}
