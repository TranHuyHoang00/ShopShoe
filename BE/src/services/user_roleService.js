import db from '../models/index';
import { Op } from "sequelize";
let createUser_role = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let User = await db.User_role.findOne({
                where: { userId: data.userId, roleId: data.roleId }
            })
            if (User) {
                resolve({
                    errCode: 2,
                    errMessage: 'Đã tồn tại'
                })
            } else {
                await db.User_role.create({
                    userId: data.userId,
                    roleId: data.roleId,
                })
                resolve({
                    errCode: 0,
                    errMessage: 'Tạo thành công'
                })
            }
        } catch (e) {
            reject(e)
        }
    })
}
let deleteUser_role = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            await db.User_role.destroy({
                where: { userId: data.userId, roleId: data.roleId }
            })
            resolve({
                errCode: 0,
                errMessage: 'Xóa thành công'
            })
        } catch (e) {
            reject(e)
        }
    })
}

module.exports = {
    createUser_role: createUser_role,
    deleteUser_role: deleteUser_role,
}