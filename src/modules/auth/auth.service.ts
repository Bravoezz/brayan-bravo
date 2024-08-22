import { IAuthService } from './auth.contracts';
import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { LoginDto, UserLogged } from './dto/login.dto';
import { IUserRepository, IUserRepositoryToken } from '../user/user.contracts';
import { EncryptHelper } from '../../shared/helpers/encrypt.helper';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from '../../shared/types/jwt.types';

@Injectable()
export class AuthService implements IAuthService {
	constructor(
		private readonly jwtService: JwtService,
		@Inject(IUserRepositoryToken) private readonly userRepository: IUserRepository,
	) {	}

	async login(loginDt: LoginDto): Promise<UserLogged> {
		//buscar usuario por email
		const foundUs = await this.userRepository.findByMatch({email: loginDt.email })
		if(!foundUs) throw new UnauthorizedException('Email/Contraseña incorrectos');

		//verificar la contraseña del usuario
		const isValidPss = await EncryptHelper.compare(loginDt.password, foundUs.password);
		if(!isValidPss) throw new UnauthorizedException('Email/Contraseña incorrectos');

		//crear la firma jwt
		const jwtPayload: JwtPayload = {id: foundUs.id, email: loginDt.email}
		const accessToken: string = await this.jwtService.signAsync(jwtPayload)

		foundUs.password = 'HIDDEN'
		return {
			...foundUs,
			accessToken
		}
	}


}