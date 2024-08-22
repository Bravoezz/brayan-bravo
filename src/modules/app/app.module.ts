import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from '../prisma/prisma.module';
import { UserModule } from '../user/user.module';
import { AuthModule } from '../auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { OrderModule } from '../order/order.module';
import { ProductModule } from '../product/product.module';

@Module({
	imports: [
		PrismaModule,
		UserModule,
		AuthModule,
		OrderModule,
		ProductModule,
		ConfigModule.forRoot({ isGlobal: true, envFilePath: '.env'})
	],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule {}
