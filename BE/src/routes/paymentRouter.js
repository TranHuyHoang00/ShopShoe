import express from "express";
import PaymentController from '../controllers/PaymentController';
import { middleware } from '../auth/auth';
let router = express.Router();
let PaymentRouter = (app) => {

    router.get('/api/Payment', PaymentController.handleGetAllPayment);
    // router.post('/api/Payment', middleware, PaymentController.handleCreatePayment);
    // router.delete('/api/Payment', middleware, PaymentController.handleDeletePayment);
    // router.put('/api/Payment', middleware, PaymentController.handleEditPayment);

    // router.get('/api/Payment/search', PaymentController.handleSearchPayment);
    return app.use("/", router);
}
module.exports = PaymentRouter;