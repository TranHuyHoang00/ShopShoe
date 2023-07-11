import db from '../models/index';
import { Op } from "sequelize";

let getAllColor = () => {
    return new Promise(async (resolve, reject) => {
        try {
            let data = await db.Color.findAll({ attributes: ['id', 'value', 'name'], })
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
let createColor = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let Color = await db.Color.findOne({
                where: { name: data.name }
            })
            if (Color) {
                resolve({
                    errCode: 3,
                    errMessage: 'Đã tồn tại'
                })
            } else {
                await db.Color.create({
                    value: data.value,
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
let deleteColor = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            let Detail = await db.Detail.findOne({
                where: { colorId: id }
            })
            if (Detail) {
                resolve({
                    errCode: 3,
                    errMessage: 'Không thể xóa,đang được sử dụng'
                })
            } else {
                await db.Color.destroy({
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
let editColor = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let Color = await db.Color.findOne({
                where: { id: data.id }
            })
            if (Color) {
                Color.value = data.value;
                Color.name = data.name;
                await Color.save();
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
let searchColor = (text) => {
    return new Promise(async (resolve, reject) => {
        try {
            let data = await db.Color.findAll({
                where: {
                    name: {
                        [Op.like]: '%' + text + '%'
                    }
                },
                attributes: ['id', 'value', 'name'],
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
    getAllColor: getAllColor,
    createColor: createColor,
    deleteColor: deleteColor,
    editColor: editColor,
    searchColor: searchColor,
}