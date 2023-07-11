import db from '../models/index';
import { Op } from "sequelize";
let createUser_address = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let Address = await db.Address.create({
                name: data.name,
            })
            if (Address) {
                try {
                    await db.User_address.create({
                        userId: data.userId,
                        addressId: Address.id,
                    })
                    resolve({
                        errCode: 0,
                        errMessage: 'Tạo thành công'
                    })
                } catch (e) {
                    deleteUser_address(Address.id)
                    resolve({
                        errCode: 0,
                        errMessage: 'Tạo thất bại'
                    })
                }
            } else {
                resolve({
                    errCode: 2,
                    errMessage: 'Tạo địa chỉ thất bại'
                })
            }

        } catch (e) {
            reject(e)
        }
    })
}
let deleteUser_address = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            await db.User_address.destroy({
                where: { addressId: id }
            })
            await db.Address.destroy({
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
let editUser_address = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let Address = await db.Address.findOne({
                where: { id: data.id }
            })
            if (Address) {
                Address.name = data.name;
                await Address.save();
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

module.exports = {
    createUser_address: createUser_address,
    deleteUser_address: deleteUser_address,
    editUser_address: editUser_address,
}