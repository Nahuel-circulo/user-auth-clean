import { Request, Response } from "express";
import { CustomError, PaginationDto } from "../../domain";


export class ProductController {



  constructor(
    //TODO: private readonly producService: ProductService
  ){}


  private handleError = (error: unknown, res: Response) => {
    if (error instanceof CustomError) {
      return res.status(error.statusCode).json({ error: error.message });
    } else {
      return res.status(500).json({ error: 'Internal server error' })
    }
  }

  createProduct = async (req: Request, res: Response) => {

    // const [error, createProductDto] = CreateProductDto.create(req.body);
    // if (error) return res.status(400).json({ error });

    // this.productService.createProduct(createProductDto!, req.body.user)
    //   .then(product => res.status(201).json(product))
    //   .catch(error => this.handleError(error, res));
    res.json('Create Products')
  }

  GetProducts = async (req: Request, res: Response) => {

    const { page = 1, limit = 10 } = req.query
    const [error, paginationDto] = PaginationDto.create(+page, +limit);
    if (error) return res.status(400).json({ error });

    res.json('Get Products')

    // this.categoryService.getProducts(paginationDto!)
    //   .then(products => res.json(products))
    //   .catch(error => this.handleError(error, res));
  }

}