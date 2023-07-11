import OrderDetailService from '../services/OrderDetailService'

let handlegetAllOrder_detailByOrder = async (req, res,) => {
    try {
        if (!req.query.orderId) {
            return res.status(501).json({
                errCode: 2,
                errMessage: 'Thiếu Id',
            })
        } else {
            let result = await OrderDetailService.getAllOrder_detailByOrder(req.query.orderId);
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
    handlegetAllOrder_detailByOrder: handlegetAllOrder_detailByOrder,

}