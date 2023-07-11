import db from '../models/index';
import { Op } from "sequelize";
let attributes = ['id', 'total', 'createdAt'];
let include = [
    {
        model: db.User_address, attributes: ['id',],
        include: [
            { model: db.User, attributes: ['id', 'name', 'phone', 'email', 'gender', 'dateOfbirth', 'avatar'] },
            { model: db.Address, attributes: ['id', 'name'] },
        ]
    },
    { model: db.User, attributes: ['id', 'name'] },
    { model: db.Status, attributes: ['id', 'name'] },
    { model: db.Payment, attributes: ['id', 'name'] },
]
let getAllOrder = (check) => {
    return new Promise(async (resolve, reject) => {
        try {
            let dataStatus = [];
            if (check.statusId == 0) { dataStatus = await db.Order.findAll({ include: include }) }
            else {
                dataStatus = await db.Order.findAll({ where: { statusId: check.statusId }, include: include })
            }
            let dataPayment = [];
            if (check.paymentId == 0) { dataPayment = dataStatus }
            else {
                dataPayment = dataStatus.filter(obj => { return obj.paymentId == check.paymentId; });
            }
            let dataFilter = [];
            if (check.filter == 1) { dataFilter = dataPayment.sort(function (a, b) { return b.id - a.id; }) }
            if (check.filter == 2) { dataFilter = dataPayment.sort(function (a, b) { return a.id - b.id; }) }
            if (check.filter == 3) { dataFilter = dataPayment.sort(function (a, b) { return b.total - a.total; }) }
            if (check.filter == 4) { dataFilter = dataPayment.sort(function (a, b) { return a.total - b.total; }) }
            let data = [];
            data = dataFilter.splice((check.page * check.quantity), check.quantity);
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
let getAllOrderByUser = (userId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let data = await db.Order.findAll({
                where: { customerId: { [Op.or]: userId } },
                attributes: attributes,
                include: include
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
let createOrder = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let Order = await db.Order.create({
                customerId: data.customerId,
                paymentId: data.paymentId,
                total: data.total,
                statusId: data.statusId,
            })
            if (Order) {
                try {
                    for (const i of data.dataPrice) {
                        await db.Order_detail.create({
                            orderId: Order.id,
                            productId: i.productId,
                            quantity: i.quantity,
                        })
                    }
                    resolve({
                        errCode: 0,
                        errMessage: 'Tạo thành công'
                    })
                } catch (e) {
                    deleteOrderOther(Order.id)
                    resolve({
                        errCode: 4,
                        errMessage: 'Tạo thất bại'
                    })
                }
            } else {
                resolve({
                    errCode: 3,
                    errMessage: 'Tạo đơn thất bại'
                })
            }

        } catch (e) {
            reject(e)
        }
    })
}
let deleteOrderOther = (id) => {
    return new Promise(async (resolve, reject) => {
        try {

            await db.Order.destroy({
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
let deleteOrder = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            let Order = await db.Order.findOne({ where: { id: id } })
            if (Order) {
                if (Order.statusId == 5 || Order.statusId == 6 || Order.statusId == 7 || Order.statusId == 9) {
                    resolve({
                        errCode: 3,
                        errMessage: 'Không thể xóa'
                    })
                } if (Order.statusId == 8 || Order.statusId == 10) {
                    await db.Order.destroy({
                        where: { id: id }
                    })
                    resolve({
                        errCode: 0,
                        errMessage: 'Xóa thành công'
                    })
                }
            } else {
                resolve({
                    errCode: 2,
                    errMessage: 'Không tìm thấy'
                })
            }
        } catch (e) {
            reject(e)
        }
    })
}
let editOrder = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let Order = await db.Order.findOne({
                where: { id: data.id }
            })
            if (Order) {
                Order.customerId = data.customerId;
                Order.paymentId = data.paymentId;
                Order.statusId = data.statusId;
                Order.staffId = data.staffId;
                Order.total = data.total;
                await Order.save();
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
let getOneOrder = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            let data = await db.Order.findOne({
                where: { id: id },
                attributes: attributes,
                include: include,
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
let Statistical = (check) => {
    return new Promise(async (resolve, reject) => {
        try {
            let dataStatus = [];
            if (check.statusId == 0) {
                dataStatus = await db.Order.findAll({
                    where: { createdAt: { [Op.gte]: check.date[0], [Op.lte]: check.date[1] } }, include: include
                })
            }
            else {
                dataStatus = await db.Order.findAll({ where: { statusId: check.statusId, createdAt: { [Op.gte]: check.date[0], [Op.lte]: check.date[1] } }, include: include })
            }
            let dataPayment = [];
            if (check.paymentId == 0) { dataPayment = dataStatus }
            else {
                dataPayment = dataStatus.filter(obj => { return obj.paymentId == check.paymentId; });
            }
            let dataFilter = [];
            if (check.filter == 1) { dataFilter = dataPayment.sort(function (a, b) { return b.id - a.id; }) }
            if (check.filter == 2) { dataFilter = dataPayment.sort(function (a, b) { return a.id - b.id; }) }
            if (check.filter == 3) { dataFilter = dataPayment.sort(function (a, b) { return b.total - a.total; }) }
            if (check.filter == 4) { dataFilter = dataPayment.sort(function (a, b) { return a.total - b.total; }) }
            let data = [];
            data = dataFilter.splice((check.page * check.quantity), check.quantity);
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
    getAllOrder: getAllOrder,
    getAllOrderByUser: getAllOrderByUser,
    createOrder: createOrder,
    deleteOrder: deleteOrder,
    editOrder: editOrder,
    getOneOrder: getOneOrder,
    Statistical: Statistical,
}