import BrandService from '../services/BrandService'

let handleGetAllBrand = async (req, res,) => {
    try {
        let result = await BrandService.getAllBrand();
        return res.status(200).json(result);
    } catch (e) {
        return res.status(501).json({
            errCode: 1,
            errMessage: 'Lỗi server',
            error: e
        })
    }
}
let handleCreateBrand = async (req, res,) => {
    try {
        if (!req.body.name) {
            return res.status(400).json({
                errCode: 2,
                errMessage: 'Thiếu thông tin',
            })
        } else {
            let result = await BrandService.createBrand(req.body);
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
let handleDeleteBrand = async (req, res,) => {
    try {
        if (!req.body.id) {
            return res.status(400).json({
                errCode: 2,
                errMessage: 'Thiếu Id',
            })
        } else {
            let result = await BrandService.deleteBrand(req.body.id);
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
let handleEditBrand = async (req, res) => {
    try {
        if (!req.body.id || !req.body.name) {
            return res.status(400).json({
                errCode: 2,
                errMessage: 'Thiếu thông tin',
            })
        }
        let result = await BrandService.editBrand(req.body);
        return res.status(200).json(result);
    } catch (e) {
        return res.status(501).json({
            errCode: 1,
            errMessage: 'Lỗi server',
            error: e
        })
    }
}
let handleSearchBrand = async (req, res,) => {
    try {
        if (!req.query.text) {
            return res.status(400).json({
                errCode: 2,
                errMessage: 'Thiếu text',
            })
        } else {
            let result = await BrandService.searchBrand(req.query.text);
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
    handleGetAllBrand: handleGetAllBrand,
    handleCreateBrand: handleCreateBrand,
    handleDeleteBrand: handleDeleteBrand,
    handleEditBrand: handleEditBrand,
    handleSearchBrand: handleSearchBrand,
}