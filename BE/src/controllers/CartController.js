import CartService from '../services/CartService'

let handleGetAllCartByUser = async (req, res,) => {
    try {
        if (!req.query.userId) {
            return res.status(400).json({
                errCode: 2,
                errMessage: 'Thiếu Id user',
            })
        } else {
            let result = await CartService.getAllCartByUser(req.query.userId);
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
let handleCreateCart = async (req, res,) => {
    try {
        if (!req.body.quantity || !req.body.userId || !req.body.productId) {
            return res.status(400).json({
                errCode: 2,
                errMessage: 'Thiếu thông tin',
            })
        } else {
            let result = await CartService.createCart(req.body);
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
let handleDeleteCart = async (req, res,) => {
    try {
        if (!req.body.id) {
            return res.status(400).json({
                errCode: 2,
                errMessage: 'Thiếu Id',
            })
        } else {
            let result = await CartService.deleteCart(req.body.id);
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
    handleGetAllCartByUser: handleGetAllCartByUser,
    handleCreateCart: handleCreateCart,
    handleDeleteCart: handleDeleteCart,
}