import express from "express";
import BrandController from '../controllers/BrandController';
import { middleware } from '../auth/auth';
let router = express.Router();
let BrandRouter = (app) => {

    router.get('/api/Brand', BrandController.handleGetAllBrand);
    router.post('/api/Brand', middleware, BrandController.handleCreateBrand);
    router.delete('/api/Brand', middleware, BrandController.handleDeleteBrand);
    router.put('/api/Brand', middleware, BrandController.handleEditBrand);

    router.get('/api/Brand/search', BrandController.handleSearchBrand);
    return app.use("/", router);
}
module.exports = BrandRouter;