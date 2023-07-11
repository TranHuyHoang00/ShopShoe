import express from "express";
import OrderDetailController from '../controllers/OrderDetailController';
import { middleware } from '../auth/auth';
let router = express.Router();
let OrderDetailRouter = (app) => {

    router.get('/api/OrderDetail/orderId', middleware, OrderDetailController.handlegetAllOrder_detailByOrder);
    return app.use("/", router);
}
module.exports = OrderDetailRouter;