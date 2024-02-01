import { Router } from 'express';
import { FileUploadController } from './controller';
import { FileUploadService } from '../services/file-upload.service';
import { FileUploadMiddleware } from '../middlewares/file-upload.middleware';
import { TypeMiddleware } from '../middlewares/type.middleware';

export class FileUploadRoutes {


  static get routes(): Router {
    const router = Router();

    const service = new FileUploadService()
    const controller = new FileUploadController(service);

    router.use(FileUploadMiddleware.containFiles)

    // este tipo de middleware aun no save la request.params por lo tanto no puede acceder a ella
    router.use(TypeMiddleware.validTypes(['user', 'products', 'categories']))
    
    // api/upload/single/<user|category|product>
    // api/upload/multiple/<user|category|product>
    router.post('/single/:type', controller.uploadFile);
    router.post('/multiple/:type', controller.uploadMultipleFiles);
    return router;
  }
}

