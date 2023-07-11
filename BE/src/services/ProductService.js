import db from '../models/index';
import { Op } from "sequelize";

let include = [
    { model: db.Type, attributes: ['id', 'name'] },
    { model: db.Brand, attributes: ['id', 'name'] },
    { model: db.Origin, attributes: ['id', 'name'] },
    { model: db.Status, attributes: ['id', 'name'] },
    { model: db.Discount, attributes: ['id', 'name', 'value', 'start_date', 'finish_date'] },
    { model: db.Image, as: "images", attributes: ['id', 'value'], through: { attributes: [], } },
    {
        model: db.Detail, attributes: ['id', 'quantity', 'price']
        , include: [
            { model: db.Color, attributes: ['id', 'name', 'value'] },
            { model: db.Size, attributes: ['id', 'value'] },
        ]
    },
]
let attributes = ['id', 'name', 'description', 'statusId', 'brandId', 'originId', 'discountId', 'typeId'];

let getAllProduct = (check) => {
    return new Promise(async (resolve, reject) => {
        try {
            // 1:mới nhất, 2:cũ nhất, 3:A-Z, 4:Z-A,
            let dataType = [];
            if (check.typeId == 0 || !check.typeId) { dataType = await db.Product.findAll({ attributes: attributes, include: include }) }
            else {
                if (check.typeId == 1) { dataType = await db.Product.findAll({ where: { typeId: { [Op.or]: [1, 5] } }, attributes: attributes, include: include }) }
                if (check.typeId == 2) { dataType = await db.Product.findAll({ where: { typeId: { [Op.or]: [2, 5] } }, attributes: attributes, include: include }) }
                if (check.typeId == 3) { dataType = await db.Product.findAll({ where: { typeId: { [Op.or]: [3, 6] } }, attributes: attributes, include: include }) }
                if (check.typeId == 4) { dataType = await db.Product.findAll({ where: { typeId: { [Op.or]: [4, 6] } }, attributes: attributes, include: include }) }
                if (check.typeId == 5) { dataType = await db.Product.findAll({ where: { typeId: { [Op.or]: [1, 2, 5] } }, attributes: attributes, include: include }) }
                if (check.typeId == 6) { dataType = await db.Product.findAll({ where: { typeId: { [Op.or]: [3, 4, 6] } }, attributes: attributes, include: include }) }
            }
            let dataBrand = [];
            if (check.brandId == 0 || !check.brandId) { dataBrand = dataType }
            else { dataBrand = dataType.filter(obj => { return obj.brandId == check.brandId; }) }

            let dataOrigin = [];
            if (check.originId == 0 || !check.originId) { dataOrigin = dataBrand }
            else { dataOrigin = dataBrand.filter(obj => { return obj.originId == check.originId; }) }

            let dataDiscount = [];
            if (check.discountId == 0 || !check.discountId) { dataDiscount = dataOrigin }
            else { dataDiscount = dataOrigin.filter(obj => { return obj.discountId == check.discountId; }) }

            let dataFilter = [];
            if (check.filter == 0 || !check.filter) { dataFilter = dataDiscount }
            if (check.filter == 1) { dataFilter = dataDiscount.sort(function (a, b) { return b.id - a.id; }) }
            if (check.filter == 2) { dataFilter = dataDiscount.sort(function (a, b) { return a.id - b.id; }) }
            if (check.filter == 3) { dataFilter = dataDiscount.sort(function (a, b) { return a.name.localeCompare(b.name) }) }
            if (check.filter == 4) { dataFilter = dataDiscount.sort(function (a, b) { return b.name.localeCompare(a.name) }) }
            if (check.filter == 5) { dataFilter = dataDiscount.sort(function (a, b) { return b.updatedAt - a.updatedAt; }) }

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
let createProduct = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let Product = await db.Product.create({
                name: data.name,
                description: data.description,
                brandId: data.brandId,
                discountId: data.discountId,
                originId: data.originId,
                statusId: data.statusId,
                typeId: data.typeId,
            })
            if (Product) {
                try {
                    for (const i of data.ListDetail) {
                        await db.Detail.create({
                            productId: Product.id,
                            colorId: i.colorId,
                            sizeId: i.sizeId,
                            quantity: i.quantity,
                            price: i.price,
                        })
                    }
                    let dataImage = []
                    for (const i of data.ListImage) {
                        let img = await db.Image.create({
                            value: i
                        })
                        dataImage.push(img.id)
                    }
                    for (const i of dataImage) {
                        await db.Product_image.create({
                            productId: Product.id,
                            imageId: i
                        })
                    }
                    resolve({
                        errCode: 0,
                        errMessage: 'Thành công'
                    })
                } catch (e) {
                    deleteProduct(Product.id),
                        resolve({
                            errCode: 3,
                            errMessage: 'Tạo chi tiết sản phẩm thất bại'
                        })
                }
            } else {
                resolve({
                    errCode: 2,
                    errMessage: 'Tạo sản phẩm thất bại'
                })
            }
        } catch (e) {
            reject(e)
        }
    })
}
let deleteProduct = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            await db.Product.destroy({
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
let editProduct = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let Product = await db.Product.findOne({
                where: { id: data.id }
            })
            if (Product) {
                Product.name = data.name;
                Product.description = data.description;
                Product.brandId = data.brandId;
                Product.discountId = data.discountId;
                Product.originId = data.originId;
                Product.typeId = data.typeId;
                Product.statusId = data.statusId;
                await Product.save();
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
let searchProduct = (text) => {
    return new Promise(async (resolve, reject) => {
        try {
            let data = await db.Product.findAll({
                where: {
                    name: {
                        [Op.like]: '%' + text + '%'
                    }
                },
                attributes: ['id', 'name'],
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
let getOneProduct = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            let data = await db.Product.findOne({
                where: { id: id },
                attributes: ['id', 'name', 'description', 'statusId', 'brandId', 'originId', 'discountId', 'typeId'],
                include: [
                    { model: db.Type, attributes: ['id', 'name'] },
                    { model: db.Brand, attributes: ['id', 'name'] },
                    { model: db.Origin, attributes: ['id', 'name'] },
                    { model: db.Status, attributes: ['id', 'name'] },
                    { model: db.Discount, attributes: ['id', 'name', 'value', 'start_date', 'finish_date'] },
                    { model: db.Image, as: "images", attributes: ['id', 'value'], through: { attributes: [], } },
                    {
                        model: db.Detail, attributes: ['id', 'quantity', 'price']
                        , include: [
                            { model: db.Color, attributes: ['id', 'name', 'value'] },
                            { model: db.Size, attributes: ['id', 'value'] },
                        ]
                    },
                ],

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
module.exports = {
    getAllProduct: getAllProduct,
    createProduct: createProduct,
    deleteProduct: deleteProduct,
    editProduct: editProduct,
    searchProduct: searchProduct,
    getOneProduct: getOneProduct,
}