import db from '../models/index';
import { Op } from "sequelize";

let getAllStatus = () => {
    return new Promise(async (resolve, reject) => {
        try {
            let data = await db.Status.findAll({ attributes: ['id', 'name'], })
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
let createStatus = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let Status = await db.Status.findOne({
                where: { name: data.name }
            })
            if (Status) {
                resolve({
                    errCode: 3,
                    errMessage: 'Đã tồn tại'
                })
            } else {
                await db.Status.create({
                    name: data.name,
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
let deleteStatus = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            let Product = await db.Product.findOne({
                where: { statusId: id }
            })
            let User = await db.User.findOne({
                where: { statusId: id }
            })
            let Order = await db.Order.findOne({
                where: { statusId: id }
            })
            if (Product || User || Order) {
                resolve({
                    errCode: 3,
                    errMessage: 'Không thể xóa,đang được sử dụng'
                })
            } else {
                await db.Status.destroy({
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
let editStatus = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let Status = await db.Status.findOne({
                where: { id: data.id }
            })
            if (Status) {
                Status.name = data.name;
                await Status.save();
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
let searchStatus = (text) => {
    return new Promise(async (resolve, reject) => {
        try {
            let data = await db.Status.findAll({
                where: {
                    name: {
                        [Op.like]: '%' + text + '%'
                    }
                },
                attributes: ['id', 'name'],
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
    getAllStatus: getAllStatus,
    createStatus: createStatus,
    deleteStatus: deleteStatus,
    editStatus: editStatus,
    searchStatus: searchStatus,
}