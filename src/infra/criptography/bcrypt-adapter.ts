import { Hasher } from '../../data/protocols/cryptography/hasher'
import bcrypt from 'bcrypt'

export class BCryptAdapter implements Hasher {
  private readonly salt: number

  constructor (salt: number) {
    this.salt = salt
  }

  async hash (value: string): Promise<string> {
    const hash = await bcrypt.hash(value, 12)
    return hash
  }
}
