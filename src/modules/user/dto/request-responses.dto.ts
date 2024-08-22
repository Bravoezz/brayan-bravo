import { User } from '../entities/user.entity';
import { ApiProperty } from '@nestjs/swagger';
import { Role } from '../../role/entities/role.entity';

class UserWithRole extends User {
	@ApiProperty({type: Role})
	role?: Role
}

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

	@ApiProperty({ type: UserWithRole })
	data: UserWithRole
}