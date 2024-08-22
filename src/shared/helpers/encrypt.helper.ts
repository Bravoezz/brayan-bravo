import * as bcryptjs from 'bcryptjs'

export class EncryptHelper {
	static async hash(srt: string): Promise<string> {
		return bcryptjs.hash(srt, 12)
	}

	static async compare(prev: string, hash: string): Promise<boolean> {
		return bcryptjs.compare(prev,hash)
	}
}