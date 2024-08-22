import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { EncryptHelper } from '../../shared/helpers/encrypt.helper';

@Injectable()
export class AuthListener {
	static async onCreated(params: Prisma.MiddlewareParams, next: any) {
		// Check incoming query type
		if (params.model == 'User' && (params.action === 'create' || params.action === 'update')) {
			const password = params.args.data.password;

			const encryptedPass = await EncryptHelper.hash(password);

			params.args.data = {
				...params.args.data,
				password: encryptedPass,
			}
		}

		return next(params);
	}
}