import { Request, Response } from "express";

export class AuthController {
  constructor() { }


  registerUser = (req: Request, res: Response) => {
    res.json('registerUser')
  }

  loginUser = (req: Request, res: Response) => {
    res.json('loginUser')
  }

  validateUser = (req: Request, res: Response) => {
    res.json('validateUser')
  }
}