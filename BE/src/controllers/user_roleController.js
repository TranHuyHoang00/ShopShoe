import User_roleService from '../services/User_roleService';

let handleCreateUser_role = async (req, res,) => {
    try {
        if (!req.body.roleId || !req.body.userId) {
            return res.status(400).json({
                errCode: 2,
                errMessage: 'Thiếu thông tin',
            })
        } else {
            let result = await User_roleService.createUser_role(req.body);
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
let handleDeleteUser_role = async (req, res,) => {
    try {
        if (!req.body.roleId || !req.body.userId) {
            return res.status(400).json({
                errCode: 2,
                errMessage: 'Thiếu thông tin',
            })
        } else {
            let result = await User_roleService.deleteUser_role(req.body);
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
    handleCreateUser_role: handleCreateUser_role,
    handleDeleteUser_role: handleDeleteUser_role,
}