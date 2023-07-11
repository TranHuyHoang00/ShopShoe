import OrderService from '../services/OrderService'

let handleGetAllOrder = async (req, res,) => {
    try {
        if (!req.body) {
            return res.status(400).json({
                errCode: 1,
                errMessage: 'Thiếu thông tin',
            })
        } else {
            let result = await OrderService.getAllOrder(req.body);
            return res.status(200).json(result);
        }
    } catch (e) {
        return res.status(501).json({
            errCode: 1,
            errMessage: 'Lỗi server',
            error: e
        })
    }
}
let handleGetAllOrderByUser = async (req, res,) => {
    try {
        if (!req.body || req.body.length == 0) {
            return res.status(400).json({
                errCode: 2,
                errMessage: 'Thiếu Id user',
            })
        } else {
            let result = await OrderService.getAllOrderByUser(req.body);
            return res.status(200).json(result);
        }
    } catch (e) {
        return res.status(501).json({
            errCode: 1,
            errMessage: 'Lỗi server',
            error: e
        })
    }
}
let handleCreateOrder = async (req, res,) => {
    try {
        if (!req.body.customerId || !req.body.paymentId || !req.body.total || !req.body.statusId || req.body.dataPrice.length == 0) {
            return res.status(400).json({
                errCode: 2,
                errMessage: 'Thiếu thông tin',
            })
        } else {
            let result = await OrderService.createOrder(req.body);
            return res.status(200).json(result);
        }
    } catch (e) {
        return res.status(501).json({
            errCode: 1,
            errMessage: 'Lỗi server',
            error: e
        })
    }
}
let handleDeleteOrder = async (req, res,) => {
    try {
        if (!req.body.id) {
            return res.status(400).json({
                errCode: 2,
                errMessage: 'Thiếu Id',
            })
        } else {
            let result = await OrderService.deleteOrder(req.body.id);
            return res.status(200).json(result);
        }
    } catch (e) {
        return res.status(501).json({
            errCode: 1,
            errMessage: 'Lỗi server',
            error: e
        })
    }
}
let handleEditOrder = async (req, res) => {
    try {
        if (!req.body.id) {
            return res.status(400).json({
                errCode: 2,
                errMessage: 'Thiếu thông tin',
            })
        }
        let result = await OrderService.editOrder(req.body);
        return res.status(200).json(result);
    } catch (e) {
        return res.status(501).json({
            errCode: 1,
            errMessage: 'Lỗi server',
            error: e
        })
    }
}
let handleGetOneOrder = async (req, res,) => {
    try {
        if (!req.query.id) {
            return res.status(400).json({
                errCode: 2,
                errMessage: 'Thiếu Id',
            })
        } else {
            let result = await OrderService.getOneOrder(req.query.id);
            return res.status(200).json(result);
        }
    } catch (e) {
        return res.status(501).json({
            errCode: 1,
            errMessage: 'Lỗi server',
            error: e
        })
    }
}
let handleStatistical = async (req, res,) => {
    try {
        if (!req.body) {
            return res.status(400).json({
                errCode: 1,
                errMessage: 'Thiếu thông tin',
            })
        } else {
            let result = await OrderService.Statistical(req.body);
            return res.status(200).json(result);
        }
    } catch (e) {
        return res.status(501).json({
            errCode: 1,
            errMessage: 'Lỗi server',
            error: e
        })
    }
}
module.exports = {
    handleGetAllOrder: handleGetAllOrder,
    handleGetAllOrderByUser: handleGetAllOrderByUser,
    handleCreateOrder: handleCreateOrder,
    handleDeleteOrder: handleDeleteOrder,
    handleEditOrder: handleEditOrder,
    handleGetOneOrder: handleGetOneOrder,
    handleStatistical: handleStatistical,
}