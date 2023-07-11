import express from "express";
import ProductController from '../controllers/ProductController';
import { middleware } from '../auth/auth';
let router = express.Router();
let ProductRouter = (app) => {

    router.post('/api/Get/Product', ProductController.handleGetAllProduct);
    router.post('/api/Product', middleware, ProductController.handleCreateProduct);
    router.delete('/api/Product', middleware, ProductController.handleDeleteProduct);
    router.put('/api/Product', middleware, ProductController.handleEditProduct);

    router.get('/api/Product/search', ProductController.handleSearchProduct);
    router.get('/api/Product/id', ProductController.handleGetOneProduct);
    return app.use("/", router);
}
module.exports = ProductRouter;