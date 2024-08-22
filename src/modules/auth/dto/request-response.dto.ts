import { ApiProperty } from '@nestjs/swagger';
import { UserLogged } from './login.dto';

export class LoginResponse {
	@ApiProperty()
	res: true;

	@ApiProperty()
	message: string;

	@ApiProperty({ type: UserLogged })
	data: UserLogged
}