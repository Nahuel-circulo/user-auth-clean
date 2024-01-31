import { Router } from 'express';
import {  FileUploadController } from './controller';

export class FileUploadRoutes {


  static get routes(): Router {
    const router = Router();
   
    const controller = new FileUploadController();
    // api/upload/single/<user|category|product>
    // api/upload/multiple/<user|category|product>
    router.get('/single/:type', controller.uploadFile);
    router.get('/multiple/:type', controller.uploadMultipleFiles);
    return router;
  }
}

