import { NextFunction, Request, Response } from "express";
import { JwtAdapter } from "../../config";
import { UserModel } from "../../data";
import { UserEntity } from "../../domain";



export class AuthMiddleware {



  static async validateJWT(req: Request, res: Response, next: NextFunction) {

    const authorizacion = req.header('Authorization');
    if (!authorizacion) return res.status(401).json({ error: 'No token provided' })

    if (!authorizacion.startsWith('Bearer')) return res.status(401).json({ error: 'Invalid token' })

    const token = authorizacion.split(' ').at(1) || '';

    try {

      const payload = await JwtAdapter.validateToken<{ id: string }>(token)

      if (!payload) return res.status(401).json({ error: 'Invalid token' });

      const user = await UserModel.findById(payload.id);

      if (!user) return res.status(401).json({ error: 'Invalid token - user' });

      // todo: validar si el usuario esta activo

      req.body.user = UserEntity.fronObject(user);

      next();

    } catch (error) {
      console.log({ error });
      res.status(500).json({ error: 'Internal Server Error' })
    }

  }



}