import { ApiProperty } from '@nestjs/swagger';

export class User {
	@ApiProperty()
	id: number;
	@ApiProperty()
	workerCode: string;
	@ApiProperty()
	name: string;
	@ApiProperty()
	email: string;
	@ApiProperty()
	phone: string | null;
	@ApiProperty()
	position: string | null;
	@ApiProperty()
	password: string;
	@ApiProperty()
	roleId: number;
	@ApiProperty()
	createdAt: string | Date;
	@ApiProperty()
	updatedAt: string | Date;
}
