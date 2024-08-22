import { ApiProperty } from '@nestjs/swagger';

export class Role {
	@ApiProperty()
	id: number;
	@ApiProperty()
	name: string;
}