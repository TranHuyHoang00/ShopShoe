import User_addressService from '../services/User_addressServices';

let handleCreateUser_address = async (req, res,) => {
    try {
        if (!req.body.name || !req.body.userId) {
            return res.status(400).json({
                errCode: 2,
                errMessage: 'Thiếu thông tin',
            })
        } else {
            let result = await User_addressService.createUser_address(req.body);
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
let handleDeleteUser_address = async (req, res,) => {
    try {
        if (!req.body.id) {
            return res.status(400).json({
                errCode: 2,
                errMessage: 'Thiếu Id',
            })
        } else {
            let result = await User_addressService.deleteUser_address(req.body.id);
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
let handleEditUser_address = async (req, res) => {
    try {
        if (!req.body.id || !req.body.name) {
            return res.status(400).json({
                errCode: 2,
                errMessage: 'Thiếu thông tin',
            })
        }
        let result = await User_addressService.editUser_address(req.body);
        return res.status(200).json(result);
    } catch (e) {
        return res.status(501).json({
            errCode: 1,
            errMessage: 'Lỗi server',
            error: e
        })
    }
}

module.exports = {
    handleCreateUser_address: handleCreateUser_address,
    handleDeleteUser_address: handleDeleteUser_address,
    handleEditUser_address: handleEditUser_address,
}