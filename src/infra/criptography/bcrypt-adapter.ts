import { Hasher } from '../../data/protocols/cryptography/hasher'
import bcrypt from 'bcrypt'
import { HashComparer } from '../../data/protocols/cryptography/hash-comparer'

export class BCryptAdapter implements Hasher, HashComparer {
  private readonly salt: number

  constructor (salt: number) {
    this.salt = salt
  }

  async compare (value: string, hash: string): Promise<boolean> {
    await bcrypt.compare(value, hash)
    return true
  }

  async hash (value: string): Promise<string> {
    const hash = await bcrypt.hash(value, 12)
    return hash
  }
}
