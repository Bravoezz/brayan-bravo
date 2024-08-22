import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { Request } from 'express';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload, JwtRequest } from '../../../shared/types/jwt.types';
import { JwtConstants } from '../../../shared/constants/jwt.constants';

@Injectable()
export class AuthGuard implements CanActivate {
	constructor(
		private readonly jwtService: JwtService,
	) {}

	async canActivate(ctx: ExecutionContext): Promise<boolean> {
		const request = ctx.switchToHttp().getRequest() as JwtRequest;
		const bearerToken = this.getBearerToken(request)
		if(!bearerToken) throw new UnauthorizedException('Usuario no autorizado');

		try {
			const jwtPayload: JwtPayload = await this.jwtService.verify(bearerToken, { secret: JwtConstants.secret });
			request.user = jwtPayload;
		}catch (err) {
			throw new UnauthorizedException('Usuario no autorizado');
		}
		return true
	}

	private getBearerToken(req: Request): string | undefined {
		const [type,token] = req.headers.authorization?.split(' ') || []
		return type === 'Bearer' && !!token ? token : undefined
	}
}
