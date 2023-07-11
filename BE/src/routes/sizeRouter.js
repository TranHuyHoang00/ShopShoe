import express from "express";
import SizeController from '../controllers/SizeController';
import { middleware } from '../auth/auth';
let router = express.Router();
let SizeRouter = (app) => {

    router.get('/api/Size', SizeController.handleGetAllSize);
    router.post('/api/Size', middleware, SizeController.handleCreateSize);
    router.delete('/api/Size', middleware, SizeController.handleDeleteSize);
    router.put('/api/Size', middleware, SizeController.handleEditSize);

    router.get('/api/Size/search', SizeController.handleSearchSize);
    return app.use("/", router);
}
module.exports = SizeRouter;