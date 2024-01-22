import jwt from 'jsonwebtoken'

export class JwtAdapter {

  static async generateToken(payload: any, duration = '2h') {

    return new Promise((resolve) => {
      jwt.sign(payload, 'SEED', { expiresIn: duration }, (error, token) => {
        if (error) {
          resolve(null)
        }
        return resolve(token)
      })
    })
  }

  static validateToken(token: string) {

  }



}