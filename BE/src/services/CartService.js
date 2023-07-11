import db from '../models/index';
import { Op } from "sequelize";

let getAllCartByUser = (userId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let data = await db.Cart.findAll({
                where: { userId: userId },
                attributes: ['id', 'quantity'],
                include: [
                    {
                        model: db.Detail, attributes: ['id', 'price'],
                        include: [
                            {
                                model: db.Product, attributes: ['id', 'name'],
                                include: [{ model: db.Discount, attributes: ['id', 'value'] },
                                { model: db.Image, as: "images", attributes: ['id', 'value'], through: { attributes: [], } },
                                ]
                            },
                            { model: db.Color, attributes: ['id', 'name', 'value'] },
                            { model: db.Size, attributes: ['id', 'value'] }
                        ],
                    },
                ]
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
let createCart = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let Cart = await db.Cart.findOne({
                where: { productId: data.productId }
            })
            if (Cart) {
                resolve({
                    errCode: 3,
                    errMessage: 'Đã tồn tại'
                })
            } else {
                await db.Cart.create({
                    productId: data.productId,
                    userId: data.userId,
                    quantity: data.quantity,
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
let deleteCart = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            await db.Cart.destroy({
                where: { id: id }
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
    getAllCartByUser: getAllCartByUser,
    createCart: createCart,
    deleteCart: deleteCart,
}