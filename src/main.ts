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

	// Acceder a la instancia del servidor HTTP y configurar los timeouts
	const server = app.getHttpServer();

	// Configuración de timeouts en la instancia del servidor HTTP
	server.keepAliveTimeout = 120000; // 120 segundos
	server.headersTimeout = 120000;   // 120 segundos


	await app.listen(process.env.PORT || 4000, () => {
		console.log(`Server started listening: ${process.env.PORT || 4000}`);
	});
}
bootstrap();
