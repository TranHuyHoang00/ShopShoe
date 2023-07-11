import express from "express";
import User_roleController from '../controllers/User_roleController';
import { middleware } from '../auth/auth';
let router = express.Router();
let User_roleRouter = (app) => {

    router.post('/api/User_role', middleware, User_roleController.handleCreateUser_role);
    router.delete('/api/User_role', middleware, User_roleController.handleDeleteUser_role);
    return app.use("/", router);
}
module.exports = User_roleRouter;