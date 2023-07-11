import express from "express";
import RoleController from '../controllers/RoleController';
import { middleware } from '../auth/auth';
let router = express.Router();
let RoleRouter = (app) => {

    router.get('/api/Role', RoleController.handleGetAllRole);
    router.post('/api/Role', middleware, RoleController.handleCreateRole);
    router.delete('/api/Role', middleware, RoleController.handleDeleteRole);
    router.put('/api/Role', middleware, RoleController.handleEditRole);

    router.get('/api/Role/search', RoleController.handleSearchRole);
    return app.use("/", router);
}
module.exports = RoleRouter;