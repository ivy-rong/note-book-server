import { hashSync, hash } from '@node-rs/bcrypt'

export const passwordHashSync = async (password: string) =>
  hashSync(password, 10)

export const passwordHash = async (password: string) => await hash(password, 10)
