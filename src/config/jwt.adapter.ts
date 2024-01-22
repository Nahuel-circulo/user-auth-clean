import jwt from 'jsonwebtoken'
import { envs } from './envs'

//dependencia oculta
const JWT_SEED = envs.JWT_SEED

export class JwtAdapter {

  static async generateToken(payload: any, duration = '2h') {

    return new Promise((resolve) => {
      jwt.sign(payload, JWT_SEED, { expiresIn: duration }, (error, token) => {
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