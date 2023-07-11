import StatusService from '../services/StatusService'

let handleGetAllStatus = async (req, res,) => {
    try {
        let result = await StatusService.getAllStatus();
        return res.status(200).json(result);
    } catch (e) {
        return res.status(501).json({
            errCode: 1,
            errMessage: 'Lỗi server',
            error: e
        })
    }
}
let handleCreateStatus = async (req, res,) => {
    try {
        if (!req.body.name) {
            return res.status(400).json({
                errCode: 2,
                errMessage: 'Thiếu thông tin',
            })
        } else {
            let result = await StatusService.createStatus(req.body);
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
let handleDeleteStatus = async (req, res,) => {
    try {
        if (!req.body.id) {
            return res.status(400).json({
                errCode: 2,
                errMessage: 'Thiếu Id',
            })
        } else {
            let result = await StatusService.deleteStatus(req.body.id);
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
let handleEditStatus = async (req, res) => {
    try {
        if (!req.body.id || !req.body.name) {
            return res.status(400).json({
                errCode: 2,
                errMessage: 'Thiếu thông tin',
            })
        }
        let result = await StatusService.editStatus(req.body);
        return res.status(200).json(result);
    } catch (e) {
        return res.status(501).json({
            errCode: 1,
            errMessage: 'Lỗi server',
            error: e
        })
    }
}
let handleSearchStatus = async (req, res,) => {
    try {
        if (!req.query.text) {
            return res.status(400).json({
                errCode: 2,
                errMessage: 'Thiếu text',
            })
        } else {
            let result = await StatusService.searchStatus(req.query.text);
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
    handleGetAllStatus: handleGetAllStatus,
    handleCreateStatus: handleCreateStatus,
    handleDeleteStatus: handleDeleteStatus,
    handleEditStatus: handleEditStatus,
    handleSearchStatus: handleSearchStatus,
}