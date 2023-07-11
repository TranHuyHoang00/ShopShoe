import DetailService from '../services/DetailService'


let handleCreateDetail = async (req, res,) => {
    try {
        if (!req.body.productId || !req.body.colorId || !req.body.sizeId || !req.body.quantity || !req.body.price) {
            return res.status(400).json({
                errCode: 2,
                errMessage: 'Thiếu thông tin',
            })
        } else {
            let result = await DetailService.createDetail(req.body);
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
let handleDeleteDetail = async (req, res,) => {
    try {
        if (!req.body.id) {
            return res.status(400).json({
                errCode: 2,
                errMessage: 'Thiếu Id',
            })
        } else {
            let result = await DetailService.deleteDetail(req.body.id);
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
let handleEditDetail = async (req, res) => {
    try {
        if (!req.body.id) {
            return res.status(400).json({
                errCode: 2,
                errMessage: 'Thiếu thông tin',
            })
        }
        let result = await DetailService.editDetail(req.body);
        return res.status(200).json(result);
    } catch (e) {
        return res.status(501).json({
            errCode: 1,
            errMessage: 'Lỗi server',
            error: e
        })
    }
}

module.exports = {
    handleCreateDetail: handleCreateDetail,
    handleDeleteDetail: handleDeleteDetail,
    handleEditDetail: handleEditDetail,
}