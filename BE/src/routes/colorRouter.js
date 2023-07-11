import express from "express";
import ColorController from '../controllers/ColorController';
import { middleware } from '../auth/auth';
let router = express.Router();
let ColorRouter = (app) => {

    router.get('/api/Color', ColorController.handleGetAllColor);
    router.post('/api/Color', middleware, ColorController.handleCreateColor);
    router.delete('/api/Color', middleware, ColorController.handleDeleteColor);
    router.put('/api/Color', middleware, ColorController.handleEditColor);

    router.get('/api/Color/search', ColorController.handleSearchColor);
    return app.use("/", router);
}
module.exports = ColorRouter;