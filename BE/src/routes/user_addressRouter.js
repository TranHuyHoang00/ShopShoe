import express from "express";
import User_addressController from '../controllers/User_addressController';
import { middleware } from '../auth/auth';
let router = express.Router();
let User_addressRouter = (app) => {

    router.post('/api/User_address', middleware, User_addressController.handleCreateUser_address);
    router.delete('/api/User_address', middleware, User_addressController.handleDeleteUser_address);
    router.put('/api/User_address', middleware, User_addressController.handleEditUser_address);
    return app.use("/", router);
}
module.exports = User_addressRouter;