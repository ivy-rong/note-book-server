import jwt from 'jsonwebtoken'

interface tokenType {
  data: any
  iat: number
  exp: number
}

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
      const { data, exp } = jwt.verify(token, 'DOP7894') as tokenType
      if (data.hasOwnProperty('id')) {
        const currentDate = Math.floor(Date.now() / 1000)
        const timeDiff = currentDate - exp
        return timeDiff > 7 ? false : true
      } else {
        return false
      }
    } catch (err) {
      // err
      console.log(err)
      return false
    }
  }
}

export default new JWTManager()
