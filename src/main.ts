import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { AppModule } from './modules/app/app.module';
import { AllExceptionsFilter } from './filters/all.exceptions.filter';
import { InvalidFormExceptionFilter } from './filters/invalid.form.exception.filter';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
	const app = await NestFactory.create(AppModule);

	app.setGlobalPrefix('/api/v1')
	app.useGlobalFilters(
		new AllExceptionsFilter(app.get(HttpAdapterHost)),
		new InvalidFormExceptionFilter()
	);
	app.enableCors({ credentials: true, origin: '*' });
	app.useGlobalPipes(new ValidationPipe())

	//swagger
	const options = new DocumentBuilder()
		.setTitle('XYZ Boutique')
		.setDescription('Api para gestion de productos')
		.setVersion('1.0')
		.addTag('New')
		.setContact('Autor','https://github.com/bravoezz','Bravoezz')
		.addBearerAuth()
		.build();
	const document = SwaggerModule.createDocument(app, options);
	SwaggerModule.setup('/api/v1/docs', app, document);

	await app.listen(4000, () => {
		console.log(`Server started listening: 4000`);
	});
}
bootstrap();
