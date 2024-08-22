import { User } from '../entities/user.entity';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserResponse {
	@ApiProperty()
	res: true;

	@ApiProperty()
	message: string;

	@ApiProperty({ type: User })
	data: User
}

export class FindOneUserResponse {
	@ApiProperty()
	res: true;

	@ApiProperty()
	message: string;

	@ApiProperty({ type: User })
	data: User
}