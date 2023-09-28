import type { Request, NextFunction } from 'express'

import { JWTManager } from '@/core'
import { BaseResponse } from '@/types'
import { UsersService } from '@/services'

/**
 * 验证中间件
 */
export const validateToken = async (
  request: Request<any>,
  response: BaseResponse,
  next: NextFunction
) => {
  const { authorization } = request.headers || {}
  const currentPath = request.url

  //注册不走这个中间件
  if (currentPath.includes('signup') || currentPath.includes('login')) {
    console.log(currentPath)
    next()
    return
  }
  if (!authorization) {
    response.status(401).json({ message: 'token不存在' })
    return
  }

  //验证token是否有效
  const result = JWTManager.verificationToken(authorization)
  if (!result) {
    response.status(401).json({ message: 'token无效' })
    return
  }

  //获取当前用户信息
  const user = await UsersService.getUserById(result as number)
  if (user) {
    //当前用户挂在request对象上
    request.currentUser = user
  } else {
    response.status(401).json({ message: 'token无效' })
    return
  }
  next()
}
