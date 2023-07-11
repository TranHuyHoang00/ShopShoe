import UserService from '../services/UserService'

let handleGetAllUser = async (req, res,) => {
    try {
        if (!req.body) {
            return res.status(400).json({
                errCode: 1,
                errMessage: 'Thiếu thông tin',
            })
        } else {
            let result = await UserService.getAllUser(req.body);
            return res.status(200).json(result);
        }
    } catch (e) {
        return res.status(501).json({
            errCode: 1,
            errMessage: 'Lỗi server',
            error: e
        })
    }
}
let handleCreateUser = async (req, res,) => {
    try {
        if (!req.body.phone || !req.body.name || !req.body.statusId) {
            return res.status(400).json({
                errCode: 2,
                errMessage: 'Thiếu thông tin',
            })
        } else {
            let result = await UserService.createUser(req.body);
            return res.status(200).json(result);
        }

    } catch (e) {
        return res.status(501).json({
            errCode: 1,
            errMessage: 'Lỗi server',
            error: e
        })
    }
}
let handleDeleteUser = async (req, res,) => {
    try {
        if (!req.body.id) {
            return res.status(400).json({
                errCode: 2,
                errMessage: 'Thiếu Id',
            })
        } else {
            let result = await UserService.deleteUser(req.body.id);
            return res.status(200).json(result);
        }

    } catch (e) {
        return res.status(501).json({
            errCode: 1,
            errMessage: 'Lỗi server',
            error: e
        })
    }
}
let handleEditUser = async (req, res) => {
    try {
        if (!req.body.id) {
            return res.status(400).json({
                errCode: 2,
                errMessage: 'Thiếu Id ',
            })
        }
        if (!req.body.name) {
            return res.status(400).json({
                errCode: 2,
                errMessage: 'Thiếu tên',
            })
        }
        let result = await UserService.editUser(req.body);
        return res.status(200).json(result);
    } catch (e) {
        return res.status(501).json({
            errCode: 1,
            errMessage: 'Lỗi server',
            error: e
        })
    }
}
let handleSearchUser = async (req, res,) => {
    try {
        if (!req.query.text) {
            return res.status(400).json({
                errCode: 2,
                errMessage: 'Thiếu text',
            })
        } else {
            let result = await UserService.searchUser(req.query.text);
            return res.status(200).json(result);
        }
    } catch (e) {
        return res.status(501).json({
            errCode: 1,
            errMessage: 'Lỗi server',
            error: e
        })
    }
}
let handleGetAllUser_User = async (req, res,) => {
    try {
        let result = await UserService.getAllUser_Type(req.query.type);
        return res.status(200).json(result);
    } catch (e) {
        return res.status(501).json({
            errCode: 1,
            errMessage: 'Lỗi server',
            error: e
        })
    }
}
let handleGetOneUser = async (req, res,) => {
    try {
        if (!req.query.id) {
            return res.status(400).json({
                errCode: 2,
                errMessage: 'Thiếu Id',
            })
        } else {
            let result = await UserService.getOneUser(req.query.id);
            return res.status(200).json(result);
        }
    } catch (e) {
        return res.status(501).json({
            errCode: 1,
            errMessage: 'Lỗi server',
            error: e
        })
    }
}
let handleChangePassword = async (req, res,) => {
    try {
        if (!req.body.id || !req.body.passwordNew || !req.body.passwordInput) {
            return res.status(400).json({
                errCode: 2,
                errMessage: 'Thiếu thông tin',
            })
        } else {
            let result = await UserService.changePassword(req.body);
            return res.status(200).json(result);
        }
    } catch (e) {
        return res.status(501).json({
            errCode: 1,
            errMessage: 'Lỗi server',
            error: e
        })
    }
}
module.exports = {
    handleGetAllUser: handleGetAllUser,
    handleCreateUser: handleCreateUser,
    handleDeleteUser: handleDeleteUser,
    handleEditUser: handleEditUser,
    handleSearchUser: handleSearchUser,
    handleGetAllUser_User: handleGetAllUser_User,
    handleGetOneUser: handleGetOneUser,
    handleChangePassword: handleChangePassword,
}