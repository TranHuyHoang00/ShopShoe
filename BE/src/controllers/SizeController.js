import SizeService from '../services/SizeService'

let handleGetAllSize = async (req, res,) => {
    try {
        let result = await SizeService.getAllSize();
        return res.status(200).json(result);
    } catch (e) {
        return res.status(501).json({
            errCode: 1,
            errMessage: 'Lỗi server',
            error: e
        })
    }
}
let handleCreateSize = async (req, res,) => {
    try {
        if (!req.body.value) {
            return res.status(400).json({
                errCode: 2,
                errMessage: 'Thiếu thông tin',
            })
        } else {
            let result = await SizeService.createSize(req.body);
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
let handleDeleteSize = async (req, res,) => {
    try {
        if (!req.body.id) {
            return res.status(400).json({
                errCode: 2,
                errMessage: 'Thiếu Id',
            })
        } else {
            let result = await SizeService.deleteSize(req.body.id);
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
let handleEditSize = async (req, res) => {
    try {
        if (!req.body.id || !req.body.value) {
            return res.status(400).json({
                errCode: 2,
                errMessage: 'Thiếu thông tin',
            })
        }
        let result = await SizeService.editSize(req.body);
        return res.status(200).json(result);
    } catch (e) {
        return res.status(501).json({
            errCode: 1,
            errMessage: 'Lỗi server',
            error: e
        })
    }
}
let handleSearchSize = async (req, res,) => {
    try {
        if (!req.query.text) {
            return res.status(400).json({
                errCode: 2,
                errMessage: 'Thiếu text',
            })
        } else {
            let result = await SizeService.searchSize(req.query.text);
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
    handleGetAllSize: handleGetAllSize,
    handleCreateSize: handleCreateSize,
    handleDeleteSize: handleDeleteSize,
    handleEditSize: handleEditSize,
    handleSearchSize: handleSearchSize,
}