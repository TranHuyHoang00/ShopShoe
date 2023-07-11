import db from '../models/index';
import { Op } from "sequelize";

let getAllBrand = () => {
    return new Promise(async (resolve, reject) => {
        try {
            let data = await db.Brand.findAll({ attributes: ['id', 'name'], })
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
let createBrand = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let Brand = await db.Brand.findOne({
                where: { name: data.name }
            })
            if (Brand) {
                resolve({
                    errCode: 3,
                    errMessage: 'Đã tồn tại'
                })
            } else {
                await db.Brand.create({
                    name: data.name,
                })
                resolve({
                    errCode: 0,
                    errMessage: 'Tạo thành công'
                })
            }
        } catch (e) {
            reject(e)
        }
    })
}
let deleteBrand = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            let Product = await db.Product.findOne({
                where: { brandId: id }
            })
            if (Product) {
                resolve({
                    errCode: 3,
                    errMessage: 'Không thể xóa,đang được sử dụng'
                })
            } else {
                await db.Brand.destroy({
                    where: { id: id }
                })
                resolve({
                    errCode: 0,
                    errMessage: 'Xóa thành công'
                })
            }
        } catch (e) {
            reject(e)
        }
    })
}
let editBrand = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let Brand = await db.Brand.findOne({
                where: { id: data.id }
            })
            if (Brand) {
                Brand.name = data.name;
                await Brand.save();
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
let searchBrand = (text) => {
    return new Promise(async (resolve, reject) => {
        try {
            let data = await db.Brand.findAll({
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
module.exports = {
    getAllBrand: getAllBrand,
    createBrand: createBrand,
    deleteBrand: deleteBrand,
    editBrand: editBrand,
    searchBrand: searchBrand,
}