import { prisma } from '../prisma'
import { User } from '@prisma/client'
import { hash, compare } from '@node-rs/bcrypt'

class UsersService {
  async usernameAlreadyInUse(username: string) {
    const user = await prisma.user.findFirst({
      where: {
        username
      }
    })
    return !!user
  }

  async createUser(username: string, password: string) {
    const passwordEncryption = await hash(password, 10)
    return await prisma.user.create({
      data: {
        username,
        password: passwordEncryption
      }
    })
  }

  async login(username: string, password: string): Promise<User> {
    const user = await prisma.user.findFirst({
      where: {
        username
      }
    })
    if (!user) {
      throw new Error('用户名不存在')
    } else {
      const isPasswordValid = await compare(password, user.password)
      if (!isPasswordValid) {
        throw new Error('密码错误')
      }
    }
    return user
  }
}

export default new UsersService()
