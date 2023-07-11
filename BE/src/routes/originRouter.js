import express from "express";
import OriginController from '../controllers/OriginController';
import { middleware } from '../auth/auth';
let router = express.Router();
let OriginRouter = (app) => {

    router.get('/api/Origin', OriginController.handleGetAllOrigin);
    router.post('/api/Origin', middleware, OriginController.handleCreateOrigin);
    router.delete('/api/Origin', middleware, OriginController.handleDeleteOrigin);
    router.put('/api/Origin', middleware, OriginController.handleEditOrigin);

    router.get('/api/Origin/search', OriginController.handleSearchOrigin);
    return app.use("/", router);
}
module.exports = OriginRouter;