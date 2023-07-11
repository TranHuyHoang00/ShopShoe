import express from "express";
import DiscountController from '../controllers/DiscountController';
import { middleware } from '../auth/auth';
let router = express.Router();
let DiscountRouter = (app) => {

    router.get('/api/Discount', DiscountController.handleGetAllDiscount);
    router.post('/api/Discount', middleware, DiscountController.handleCreateDiscount);
    router.delete('/api/Discount', middleware, DiscountController.handleDeleteDiscount);
    router.put('/api/Discount', middleware, DiscountController.handleEditDiscount);

    router.get('/api/Discount/search', DiscountController.handleSearchDiscount);
    return app.use("/", router);
}
module.exports = DiscountRouter;