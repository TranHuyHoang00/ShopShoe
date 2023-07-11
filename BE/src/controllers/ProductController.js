import ProductService from '../services/ProductService'

let handleGetAllProduct = async (req, res,) => {
    try {
        if (!req.body) {
            return res.status(400).json({
                errCode: 1,
                errMessage: 'Thiếu thông tin',
            })
        } else {
            let result = await ProductService.getAllProduct(req.body);
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
let handleCreateProduct = async (req, res,) => {
    try {
        if (!req.body.name || !req.body.brandId || !req.body.originId || !req.body.statusId || !req.body.typeId
            || req.body.ListDetail.length == 0) {
            return res.status(400).json({
                errCode: 2,
                errMessage: 'Thiếu thông tin',
            })
        } else {
            let result = await ProductService.createProduct(req.body);
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
let handleDeleteProduct = async (req, res,) => {
    try {
        if (!req.body.id) {
            return res.status(400).json({
                errCode: 2,
                errMessage: 'Thiếu Id',
            })
        } else {
            let result = await ProductService.deleteProduct(req.body.id);
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
let handleEditProduct = async (req, res) => {
    try {
        if (!req.body.id) {
            return res.status(400).json({
                errCode: 2,
                errMessage: 'Thiếu thông tin',
            })
        }
        let result = await ProductService.editProduct(req.body);
        return res.status(200).json(result);
    } catch (e) {
        return res.status(501).json({
            errCode: 1,
            errMessage: 'Lỗi server',
            error: e
        })
    }
}
let handleSearchProduct = async (req, res,) => {
    try {
        if (!req.query.text) {
            return res.status(400).json({
                errCode: 2,
                errMessage: 'Thiếu text',
            })
        } else {
            let result = await ProductService.searchProduct(req.query.text);
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
let handleGetOneProduct = async (req, res,) => {
    try {
        if (!req.query.id) {
            return res.status(400).json({
                errCode: 2,
                errMessage: 'Thiếu Id',
            })
        } else {
            let result = await ProductService.getOneProduct(req.query.id);
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
    handleGetAllProduct: handleGetAllProduct,
    handleCreateProduct: handleCreateProduct,
    handleDeleteProduct: handleDeleteProduct,
    handleEditProduct: handleEditProduct,
    handleSearchProduct: handleSearchProduct,
    handleGetOneProduct: handleGetOneProduct,
}