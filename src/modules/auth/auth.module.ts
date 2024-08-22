import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { IAuthServiceToken } from './auth.contracts';
import { UserModule } from '../user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { JwtConstants } from '../../shared/constants/jwt.constants';


@Module({
	imports: [
		UserModule,
		JwtModule.register({ global: true, secret: JwtConstants.secret, signOptions: { expiresIn: JwtConstants.expiresIn } }),
	],
	controllers: [ AuthController ],
	providers: [
		{ provide: IAuthServiceToken, useClass: AuthService },
	],
})
export class AuthModule {}