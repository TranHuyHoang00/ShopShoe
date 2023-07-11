import db from '../models/index';
import { Op } from "sequelize";

let getAllOrigin = () => {
    return new Promise(async (resolve, reject) => {
        try {
            let data = await db.Origin.findAll({ attributes: ['id', 'name'], })
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
let createOrigin = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let Origin = await db.Origin.findOne({
                where: { name: data.name }
            })
            if (Origin) {
                resolve({
                    errCode: 3,
                    errMessage: 'Đã tồn tại'
                })
            } else {
                await db.Origin.create({
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
let deleteOrigin = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            let Product = await db.Product.findOne({
                where: { originId: id }
            })
            if (Product) {
                resolve({
                    errCode: 3,
                    errMessage: 'Không thể xóa,đang được sử dụng'
                })
            } else {
                await db.Origin.destroy({
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
let editOrigin = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let Origin = await db.Origin.findOne({
                where: { id: data.id }
            })
            if (Origin) {
                Origin.name = data.name;
                await Origin.save();
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
let searchOrigin = (text) => {
    return new Promise(async (resolve, reject) => {
        try {
            let data = await db.Origin.findAll({
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
    getAllOrigin: getAllOrigin,
    createOrigin: createOrigin,
    deleteOrigin: deleteOrigin,
    editOrigin: editOrigin,
    searchOrigin: searchOrigin,
}