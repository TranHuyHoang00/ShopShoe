import express from "express";
import TypeController from '../controllers/TypeController';
import { middleware } from '../auth/auth';
let router = express.Router();
let TypeRouter = (app) => {

    router.get('/api/Type', TypeController.handleGetAllType);
    router.post('/api/Type', middleware, TypeController.handleCreateType);
    router.delete('/api/Type', middleware, TypeController.handleDeleteType);
    router.put('/api/Type', middleware, TypeController.handleEditType);

    router.get('/api/Type/search', TypeController.handleSearchType);
    return app.use("/", router);
}
module.exports = TypeRouter;