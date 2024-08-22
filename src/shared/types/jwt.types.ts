import { Request } from 'express';

export interface JwtPayload {
	id: number;
	email: string;
	iat?: number;
	exp?: number;
}

export interface JwtRequest extends Request {
	user: JwtPayload
}