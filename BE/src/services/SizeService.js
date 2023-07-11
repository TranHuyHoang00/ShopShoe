import db from '../models/index';
import { Op } from "sequelize";

let getAllSize = () => {
    return new Promise(async (resolve, reject) => {
        try {
            let data = await db.Size.findAll({ attributes: ['id', 'value'], })
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
let createSize = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let Size = await db.Size.findOne({
                where: { value: data.value }
            })
            if (Size) {
                resolve({
                    errCode: 3,
                    errMessage: 'Đã tồn tại'
                })
            } else {
                await db.Size.create({
                    value: data.value,
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
let deleteSize = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            let Detail = await db.Detail.findOne({
                where: { sizeId: id }
            })
            if (Detail) {
                resolve({
                    errCode: 3,
                    errMessage: 'Không thể xóa,đang được sử dụng'
                })
            } else {
                await db.Size.destroy({
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
let editSize = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let Size = await db.Size.findOne({
                where: { id: data.id }
            })
            if (Size) {
                Size.value = data.value;
                await Size.save();
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
let searchSize = (text) => {
    return new Promise(async (resolve, reject) => {
        try {
            let data = await db.Size.findAll({
                where: {
                    value: {
                        [Op.like]: '%' + text + '%'
                    }
                },
                attributes: ['id', 'value'],
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
    getAllSize: getAllSize,
    createSize: createSize,
    deleteSize: deleteSize,
    editSize: editSize,
    searchSize: searchSize,
}