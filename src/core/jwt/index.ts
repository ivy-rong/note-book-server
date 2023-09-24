import jwt from 'jsonwebtoken'

class JWTManager {
  generateToken(id: number) {
    return jwt.sign(
      {
        data: {
          id
        }
      },
      'DOP7894',
      { expiresIn: '7d' }
    )
  }

  verificationToken(token: string) {
    try {
      const decodeResult = jwt.verify(token, 'DOP7894')
      console.log(decodeResult)
      return decodeResult
    } catch (err) {
      // err
      return false
    }
  }
}

export default new JWTManager()
