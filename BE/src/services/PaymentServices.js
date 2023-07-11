import db from '../models/index';
import { Op } from "sequelize";

let getAllPayment = () => {
    return new Promise(async (resolve, reject) => {
        try {
            let data = await db.Payment.findAll({ attributes: ['id', 'name', 'value'], })
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
let createPayment = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let Payment = await db.Payment.findOne({
                where: { name: data.name }
            })
            if (Payment) {
                resolve({
                    errCode: 3,
                    errMessage: 'Đã tồn tại'
                })
            } else {
                await db.Payment.create({
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
let deletePayment = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            let Product = await db.Product.findOne({
                where: { PaymentId: id }
            })
            if (Product) {
                resolve({
                    errCode: 3,
                    errMessage: 'Không thể xóa,đang được sử dụng'
                })
            } else {
                await db.Payment.destroy({
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
let editPayment = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let Payment = await db.Payment.findOne({
                where: { id: data.id }
            })
            if (Payment) {
                Payment.name = data.name;
                await Payment.save();
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
let searchPayment = (text) => {
    return new Promise(async (resolve, reject) => {
        try {
            let data = await db.Payment.findAll({
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
    getAllPayment: getAllPayment,
    createPayment: createPayment,
    deletePayment: deletePayment,
    editPayment: editPayment,
    searchPayment: searchPayment,
}