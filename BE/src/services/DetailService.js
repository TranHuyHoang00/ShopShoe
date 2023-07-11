import db from '../models/index';
import { Op } from "sequelize";
let createDetail = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let Detail = await db.Detail.findOne({
                where: { productId: data.productId, colorId: data.colorId, sizeId: data.sizeId }
            })
            if (Detail) {
                resolve({
                    errCode: 3,
                    errMessage: 'Đã tồn tại'
                })
            } else {
                await db.Detail.create({
                    productId: data.productId,
                    colorId: data.colorId,
                    sizeId: data.sizeId,
                    quantity: data.quantity,
                    price: data.price,
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
let deleteDetail = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            let Order_detail = await db.Order_detail.findOne({
                where: { productId: id }
            })
            if (Order_detail) {
                resolve({
                    errCode: 3,
                    errMessage: 'Không thể xóa,đang được sử dụng'
                })
            } else {
                await db.Detail.destroy({
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
let editDetail = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let Detail = await db.Detail.findOne({
                where: { id: data.id }
            })
            if (Detail) {
                Detail.colorId = data.colorId;
                Detail.sizeId = data.sizeId;
                Detail.quantity = data.quantity;
                Detail.price = data.price;
                await Detail.save();
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

module.exports = {
    createDetail: createDetail,
    deleteDetail: deleteDetail,
    editDetail: editDetail,
}