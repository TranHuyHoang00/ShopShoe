import express from "express";
import DetailController from '../controllers/DetailController';
import { middleware } from '../auth/auth';
let router = express.Router();
let DetailRouter = (app) => {

    router.post('/api/Detail', middleware, DetailController.handleCreateDetail);
    router.delete('/api/Detail', middleware, DetailController.handleDeleteDetail);
    router.put('/api/Detail', middleware, DetailController.handleEditDetail);

    return app.use("/", router);
}
module.exports = DetailRouter;