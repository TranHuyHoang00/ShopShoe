import express from "express";
import UserController from '../controllers/UserController'
import { middleware } from '../auth/auth';

let router = express.Router();
let UserRouter = (app) => {

    router.post('/api/Get/User', UserController.handleGetAllUser);
    router.post('/api/User', UserController.handleCreateUser);
    router.delete('/api/User', middleware, UserController.handleDeleteUser);
    router.put('/api/User', middleware, UserController.handleEditUser);

    router.get('/api/User/search', UserController.handleSearchUser);
    router.get('/api/User/type', UserController.handleGetAllUser_User);
    router.get('/api/User/id', UserController.handleGetOneUser);

    router.post('/api/User/password', middleware, UserController.handleChangePassword);

    return app.use("/", router);
}
module.exports = UserRouter;