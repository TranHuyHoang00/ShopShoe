import express from "express";
import OrderController from '../controllers/OrderController';
import { middleware } from '../auth/auth';
let router = express.Router();
let OrderRouter = (app) => {

    router.post('/api/Order', middleware, OrderController.handleGetAllOrder);
    router.post('/api/Order/userId', middleware, OrderController.handleGetAllOrderByUser);
    router.post('/api/Order/Create', middleware, OrderController.handleCreateOrder);
    router.delete('/api/Order', middleware, OrderController.handleDeleteOrder);
    router.put('/api/Order', middleware, OrderController.handleEditOrder);

    router.get('/api/Order/id', middleware, OrderController.handleGetOneOrder);
    router.post('/api/Order/Statistical', middleware, OrderController.handleStatistical);

    return app.use("/", router);
}
module.exports = OrderRouter;