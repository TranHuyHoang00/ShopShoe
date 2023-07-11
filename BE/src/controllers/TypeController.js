import TypeService from '../services/TypeService'

let handleGetAllType = async (req, res,) => {
    try {
        let result = await TypeService.getAllType();
        return res.status(200).json(result);
    } catch (e) {
        return res.status(501).json({
            errCode: 1,
            errMessage: 'Lỗi server',
            error: e
        })
    }
}
let handleCreateType = async (req, res,) => {
    try {
        if (!req.body.name) {
            return res.status(400).json({
                errCode: 2,
                errMessage: 'Thiếu thông tin',
            })
        } else {
            let result = await TypeService.createType(req.body);
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
let handleDeleteType = async (req, res,) => {
    try {
        if (!req.body.id) {
            return res.status(400).json({
                errCode: 2,
                errMessage: 'Thiếu Id',
            })
        } else {
            let result = await TypeService.deleteType(req.body.id);
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
let handleEditType = async (req, res) => {
    try {
        if (!req.body.id || !req.body.name) {
            return res.status(400).json({
                errCode: 2,
                errMessage: 'Thiếu thông tin',
            })
        }
        let result = await TypeService.editType(req.body);
        return res.status(200).json(result);
    } catch (e) {
        return res.status(501).json({
            errCode: 1,
            errMessage: 'Lỗi server',
            error: e
        })
    }
}
let handleSearchType = async (req, res,) => {
    try {
        if (!req.query.text) {
            return res.status(400).json({
                errCode: 2,
                errMessage: 'Thiếu text',
            })
        } else {
            let result = await TypeService.searchType(req.query.text);
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
    handleGetAllType: handleGetAllType,
    handleCreateType: handleCreateType,
    handleDeleteType: handleDeleteType,
    handleEditType: handleEditType,
    handleSearchType: handleSearchType,
}