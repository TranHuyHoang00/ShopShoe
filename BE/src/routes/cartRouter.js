import express from "express";
import CartController from '../controllers/CartController';
import { middleware } from '../auth/auth';
let router = express.Router();
let CartRouter = (app) => {

    router.get('/api/Cart/userId', middleware, CartController.handleGetAllCartByUser);
    router.post('/api/Cart', middleware, CartController.handleCreateCart);
    router.delete('/api/Cart', middleware, CartController.handleDeleteCart);
    return app.use("/", router);
}
module.exports = CartRouter;