import { LoginDto, UserLogged } from './dto/login.dto';


export interface IAuthService {
	login(loginDt: LoginDto): Promise<UserLogged>;
}

export const IAuthServiceToken = Symbol.for('IAuthService');