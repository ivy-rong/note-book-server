import express from 'express'

import { User } from '@prisma/client'

import { BaseResponse } from '@/types'
import { AuthResponse } from '@/models'
import { UsersService } from '@/services'
import { JWTManager } from '@/core'

const router = express.Router()

const validateData = (
  username: string,
  password: string,
  comfirmPassword?: string
) => {
  if (!username) {
    throw new Error('用户名不能为空')
  }
  if (!password) {
    throw new Error('密码不能为空')
  }
  if (password.length < 6 || password.length > 10) {
    throw new Error('密码长度应该在6-10之间')
  }
  if (comfirmPassword && comfirmPassword !== password) {
    throw new Error('密码和确认密码不一致')
  }
}

router.post('/login', async (req, res: BaseResponse<AuthResponse>) => {
  const { username, password } = req.body || {}
  try {
    validateData(username, password)
  } catch (e) {
    res.status(400).json({
      message: (e as Error).message
    })
    return
  }

  let user: User
  try {
    user = (await UsersService.login(username, password)) || {}
  } catch (e) {
    res.status(400).json({
      message: (e as Error).message
    })
    return
  }

  // 生成 token
  const accessToken = JWTManager.generateToken(user.id)

  return res.status(200).json({
    message: '登录成功',
    data: {
      accessToken,
      user
    }
  })
})

router.post('/signup', async (req, res: BaseResponse<AuthResponse>) => {
  // 数据验证
  const { username, password, comfirmPassword } = req.body || {}
  try {
    validateData(username, password, comfirmPassword)
  } catch (e) {
    res.status(400).json({
      code: 400,
      message: (e as Error).message
    })
    return
  }

  //验证用户名重复

  const repeat = await UsersService.usernameAlreadyInUse(username)

  if (repeat) {
    res.status(409).json({
      message: '用户名已存在'
    })
    return
  }

  // 创建用户
  const user = await UsersService.createUser(username, password)

  // 生成 token
  const accessToken = JWTManager.generateToken(user.id)

  // 附带用户信息
  res.status(200).json({
    message: '注册成功',
    data: {
      accessToken,
      user
    }
  })
})

export default {
  path: '/auth',
  router
}
