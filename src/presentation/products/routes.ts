import { Router } from 'express';
import { ProductController } from './controller';
import { AuthMiddleware } from '../middlewares/auth.middleware';
import { ProductService } from '../services';





export class ProductRoutes {


  static get routes(): Router {
    const router = Router();
    const service = new ProductService();
    const controller = new ProductController(service);
    router.get('/', controller.GetProducts);
    router.post('/', [AuthMiddleware.validateJWT], controller.createProduct);
    return router;
  }
}

