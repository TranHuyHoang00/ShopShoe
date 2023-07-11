import express from "express";
import LoginController from '../controllers/LoginController'
let router = express.Router();
let LoginRouter = (app) => {

    router.post('/api/Login', LoginController.handleLogin);
    router.post('/api/refresh', LoginController.handleRefreshToken);

    return app.use("/", router);
}
module.exports = LoginRouter;