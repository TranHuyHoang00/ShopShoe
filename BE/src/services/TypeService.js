import db from '../models/index';
import { Op } from "sequelize";

let getAllType = () => {
    return new Promise(async (resolve, reject) => {
        try {
            let data = await db.Type.findAll({ attributes: ['id', 'name'], })
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
let createType = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let Type = await db.Type.findOne({
                where: { name: data.name }
            })
            if (Type) {
                resolve({
                    errCode: 3,
                    errMessage: 'Đã tồn tại'
                })
            } else {
                await db.Type.create({
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
let deleteType = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            let Product = await db.Product.findOne({
                where: { typeId: id }
            })
            if (Product) {
                resolve({
                    errCode: 3,
                    errMessage: 'Không thể xóa,đang được sử dụng'
                })
            } else {
                await db.Type.destroy({
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
let editType = (data) => {
    return new Promise(async (resolve, reject) => {
        try {

            let Type = await db.Type.findOne({
                where: { id: data.id }
            })
            if (Type) {
                Type.name = data.name;
                await Type.save();
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
let searchType = (text) => {
    return new Promise(async (resolve, reject) => {
        try {
            let data = await db.Type.findAll({
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
    getAllType: getAllType,
    createType: createType,
    deleteType: deleteType,
    editType: editType,
    searchType: searchType,
}