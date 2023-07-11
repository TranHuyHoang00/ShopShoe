import express from "express";
import StatusController from '../controllers/StatusController';
import { middleware } from '../auth/auth';
let router = express.Router();
let StatusRouter = (app) => {

    router.get('/api/Status', StatusController.handleGetAllStatus);
    router.post('/api/Status', middleware, StatusController.handleCreateStatus);
    router.delete('/api/Status', middleware, StatusController.handleDeleteStatus);
    router.put('/api/Status', middleware, StatusController.handleEditStatus);

    router.get('/api/Status/search', StatusController.handleSearchStatus);
    return app.use("/", router);
}
module.exports = StatusRouter;