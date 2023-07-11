import db from '../models/index';
import { Op } from "sequelize";

let getAllDiscount = () => {
    return new Promise(async (resolve, reject) => {
        try {
            let data = await db.Discount.findAll({ attributes: ['id', 'name', 'value', 'start_date', 'finish_date'], })
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
let createDiscount = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let Discount = await db.Discount.findOne({
                where: { value: data.value }
            })
            if (Discount) {
                resolve({
                    errCode: 3,
                    errMessage: 'Khuyến mãi đã tồn tại'
                })
            } else {
                let DateNow = new Date();
                if (new Date(data.finish_date) < DateNow) {
                    resolve({
                        errCode: 4,
                        errMessage: 'Ngày kết thúc phải lớn hơn ngày hiện tại'
                    })
                } else {
                    if (new Date(data.finish_date) < new Date(data.start_date)) {
                        resolve({
                            errCode: 5,
                            errMessage: 'Ngày kết thúc phải lớn hơn ngày bắt đầu'
                        })
                    } else {
                        await db.Discount.create({
                            name: data.name,
                            value: data.value,
                            start_date: data.start_date,
                            finish_date: data.finish_date,
                        })
                        resolve({
                            errCode: 0,
                            errMessage: 'Tạo thành công'
                        })
                    }
                }


            }
        } catch (e) {
            reject(e)
        }
    })
}
let deleteDiscount = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            let Product = await db.Product.findOne({
                where: { DiscountId: id }
            })
            if (Product) {
                resolve({
                    errCode: 3,
                    errMessage: 'Không thể xóa,đang được sử dụng'
                })
            } else {
                await db.Discount.destroy({
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
let editDiscount = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let Discount = await db.Discount.findOne({
                where: { id: data.id }
            })
            if (Discount) {
                let DateNow = new Date();
                if (new Date(data.finish_date) < DateNow) {
                    resolve({
                        errCode: 6,
                        errMessage: 'Ngày kết thúc phải lớn hơn ngày hiện tại'
                    })
                }
                if (new Date(data.finish_date) < new Date(data.start_date)) {
                    resolve({
                        errCode: 7,
                        errMessage: 'Ngày kết thúc phải lớn hơn ngày bắt đầu'
                    })
                } else {
                    Discount.name = data.name;
                    Discount.value = data.value;
                    Discount.start_date = data.start_date;
                    Discount.finish_date = data.finish_date;
                    await Discount.save();
                    resolve({
                        errCode: 0,
                        errMessage: 'Thành công'
                    })
                }

            } else {
                resolve({
                    errCode: 4,
                    errMessage: 'Khuyến mãi không tồn tại'
                })
            }
        } catch (e) {
            reject(e)
        }
    })
}
let searchDiscount = (text) => {
    return new Promise(async (resolve, reject) => {
        try {
            let data = await db.Discount.findAll({
                where: {
                    [Op.or]: [
                        { name: { [Op.like]: '%' + text + '%' } },
                        { value: { [Op.like]: '%' + text + '%' } },
                        { start_date: { [Op.like]: '%' + text + '%' } },
                        { finish_date: { [Op.like]: '%' + text + '%' } },
                    ]

                },
                attributes: ['id', 'name', 'value', 'start_date', 'finish_date'],
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
    getAllDiscount: getAllDiscount,
    createDiscount: createDiscount,
    deleteDiscount: deleteDiscount,
    editDiscount: editDiscount,
    searchDiscount: searchDiscount,
}