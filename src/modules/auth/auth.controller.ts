import { Body, Controller, Inject, Post } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { IAuthService, IAuthServiceToken } from './auth.contracts';
import { LoginResponse } from './dto/request-response.dto';
import { LoginDto } from './dto/login.dto';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
	constructor(@Inject(IAuthServiceToken) private readonly authService: IAuthService) {}

	@Post('login')
	@ApiBody({ type: LoginDto })
	@ApiOperation({ summary: 'Loguear usuario' })
	@ApiResponse({ type: LoginResponse, status: '2XX', description: 'Usuario logueado correctamente' })
	async login(@Body() loginDto: LoginDto): Promise<LoginResponse> {
		return {
			res: true,
			message: 'Usuario logueado correctamente',
			data: await this.authService.login(loginDto)
		}
	}

}