import { hash, compare } from "bcrypt";

export class SecretUtils {
  static async hash(raw: string): Promise<string> {
    return await hash(raw, 12);
  }

  static async compare(raw: string, hash: string): Promise<boolean> {
    return await compare(raw, hash);
  }
}
