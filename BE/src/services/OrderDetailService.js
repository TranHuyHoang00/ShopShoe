import db from '../models/index';
import { Op } from "sequelize";

let getAllOrder_detailByOrder = (orderId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let data = await db.Order_detail.findAll({
                where: { orderId: orderId },
                attributes: ['id', 'quantity'],
                include: [
                    {
                        model: db.Detail, attributes: ['id', 'price'],
                        include: [
                            { model: db.Size, attributes: ['id', 'value'], },
                            { model: db.Color, attributes: ['id', 'name', 'value'], },
                            {
                                model: db.Product, attributes: ['id', 'name',],
                                include: [
                                    { model: db.Discount, attributes: ['id', 'value'] },
                                ]
                            }
                        ]
                    }
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
module.exports = {
    getAllOrder_detailByOrder: getAllOrder_detailByOrder,
}