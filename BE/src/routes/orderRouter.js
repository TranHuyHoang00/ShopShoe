import express from "express";
import OrderController from '../controllers/OrderController';
import { middleware } from '../auth/auth';
let router = express.Router();
let OrderRouter = (app) => {

    router.post('/api/Order', OrderController.handleGetAllOrder);
    router.post('/api/Order/userId', middleware, OrderController.handleGetAllOrderByUser);
    router.post('/api/Order/Create', middleware, OrderController.handleCreateOrder);
    router.delete('/api/Order', middleware, OrderController.handleDeleteOrder);
    router.put('/api/Order', middleware, OrderController.handleEditOrder);

    router.get('/api/Order/id', OrderController.handleGetOneOrder);
    router.post('/api/Order/Statistical', OrderController.handleStatistical);

    return app.use("/", router);
}
module.exports = OrderRouter;