import { Request, Response } from "express";
import { CustomError } from "../../domain";


export class CategoryController {

  constructor(
  ) { }

  private handleError = (error: unknown, res: Response) => {
    if (error instanceof CustomError) {
      return res.status(error.statusCode).json({ error: error.message });
    } else {
      return res.status(500).json({ error: 'Internal server error' })
    }
  }


  createCategory = async (req: Request, res: Response) => {
    res.json({ message: 'createCategory' })
  }
  GetCategories = async (req: Request, res: Response) => {
    res.json({ message: 'getCategories' })
  }

}