import db from '../models/index';
import { Op } from "sequelize";

let getAllRole = () => {
    return new Promise(async (resolve, reject) => {
        try {
            let data = await db.Role.findAll({ attributes: ['id', 'name', 'type'], })
            resolve({
                data,
                errCode: 0,
                errMessage: 'Thành công',
            })
        } catch (e) {
            reject(e)
        }
    })
}
let createRole = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let Role = await db.Role.findOne({
                where: { name: data.name }
            })
            if (Role) {
                resolve({
                    errCode: 3,
                    errMessage: 'Đã tồn tại'
                })
            } else {
                await db.Role.create({
                    name: data.name,
                    type: data.type,
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
let deleteRole = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            let User_role = await db.User_role.findOne({
                where: { roleId: id }
            })
            if (User_role) {
                resolve({
                    errCode: 3,
                    errMessage: 'Không thể xóa,đang được sử dụng'
                })
            } else {
                await db.Role.destroy({
                    where: { id: id }
                })
                resolve({
                    errCode: 0,
                    errMessage: 'Xóa thành công'
                })
            }
        } catch (e) {
            reject(e)
        }
    })
}
let editRole = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let Role = await db.Role.findOne({
                where: { id: data.id }
            })
            if (Role) {
                Role.name = data.name;
                Role.type = data.type;
                await Role.save();
                resolve({
                    errCode: 0,
                    errMessage: 'Thành công'
                })
            } else {
                resolve({
                    errCode: 4,
                    errMessage: 'Không tồn tại'
                })
            }
        } catch (e) {
            reject(e)
        }
    })
}
let searchRole = (text) => {
    return new Promise(async (resolve, reject) => {
        try {
            let data = await db.Role.findAll({
                where: {
                    name: {
                        [Op.like]: '%' + text + '%'
                    }
                },
                attributes: ['id', 'name', 'type'],
            })
            resolve({
                data,
                errCode: 0,
                errMessage: 'Thành công',
            })
        } catch (e) {
            reject(e)
        }
    })
}
module.exports = {
    getAllRole: getAllRole,
    createRole: createRole,
    deleteRole: deleteRole,
    editRole: editRole,
    searchRole: searchRole,
}