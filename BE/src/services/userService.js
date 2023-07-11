import db from '../models/index';
import { Op } from "sequelize";
import bcrypt from 'bcryptjs';
const salt = bcrypt.genSaltSync(10);
let attributes = ['id', 'email', 'name', 'phone', 'dateOfbirth', 'gender', 'avatar', 'statusId', 'createdAt', 'updatedAt'];
let include = [
    { model: db.Status, attributes: ['id', 'name'] },
    { model: db.Address, as: "addresses", attributes: ['id', 'name'], through: { attributes: [], } },
    { model: db.Role, as: "roles", attributes: ['id', 'name'], through: { attributes: [], } },
];
let getAllUser = (check) => {
    return new Promise(async (resolve, reject) => {
        try {
            let dataRole = [];
            if (check.roleId == 0) { dataRole = await db.User.findAll({ attributes: attributes, include: include }) }
            else {
                dataRole = await db.User.findAll({
                    attributes: attributes,
                    include: [
                        { model: db.Status, attributes: ['id', 'name'] },
                        { model: db.Address, as: "addresses", attributes: ['id', 'name'], through: { attributes: [], } },
                        { model: db.Role, as: "roles", where: { id: check.roleId }, attributes: ['id', 'name'], through: { attributes: [], } },
                    ]
                })
            }
            let dataStatus = [];
            if (check.statusId == 0) { dataStatus = dataRole }
            else { dataStatus = dataRole.filter(obj => { return obj.statusId == check.statusId; }); }
            let dataFilter = [];
            if (check.filter == 1) { dataFilter = dataStatus.sort(function (a, b) { return b.id - a.id; }) }
            if (check.filter == 2) { dataFilter = dataStatus.sort(function (a, b) { return a.id - b.id; }) }
            if (check.filter == 3) { dataFilter = dataStatus.sort(function (a, b) { return a.name.localeCompare(b.name) }) }
            if (check.filter == 4) { dataFilter = dataStatus.sort(function (a, b) { return b.name.localeCompare(a.name) }) }
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
let createUser = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            // Tạo tài khoản
            if (data.password) {
                if (data.phone.length != 10) { resolve({ errCode: 3, errMessage: 'Số điện thoại phải là 10 số' }) }
                if (data.password.length <= 5) { resolve({ errCode: 4, errMessage: 'Mật khẩu phải > 5 kí tự' }) }
                let user = await db.User.findOne({ where: { phone: data.phone } })
                if (user) { resolve({ errCode: 5, errMessage: 'Đã tồn tại' }) }
                else {
                    let hashPassWordFromBcrypt = await bcrypt.hashSync(data.password, salt);
                    let user = await db.User.create({
                        phone: data.phone,
                        password: hashPassWordFromBcrypt,
                        name: data.name,
                        email: data.email,
                        dateOfbirth: data.dateOfbirth,
                        gender: data.gender,
                        statusId: data.statusId,
                        avatar: data.avatar,
                    })
                    if (user) {
                        try {
                            for (const i of data.ListRole) {
                                await db.User_role.create({
                                    userId: user.id,
                                    roleId: i.id
                                })
                            }
                            resolve({
                                errCode: 0,
                                errMessage: 'Tạo thành công'
                            })
                        } catch (error) {
                            deleteUser(user.id)
                            resolve({
                                errCode: 7,
                                errMessage: 'Tạo role thất bại'
                            })
                        }
                    } else {
                        resolve({
                            errCode: 6,
                            errMessage: 'Tạo thất bại'
                        })
                    }
                }
            }
            // Tạo thông tin
            else {
                if (data.phone.length != 10) {
                    resolve({ errCode: 8, errMessage: 'Số điện thoại phải là 10 số' })
                } else {
                    let user = await db.User.findOne({ where: { phone: data.phone } })
                    if (user) {
                        resolve({ errCode: 9, errMessage: 'Đã tồn tại' })
                    } else {
                        let user = await db.User.create({
                            phone: data.phone,
                            name: data.name,
                            email: data.email,
                            dateOfbirth: data.dateOfbirth,
                            gender: data.gender,
                            statusId: data.statusId,
                            avatar: data.avatar,
                        })
                        if (user) {
                            try {
                                for (const i of data.ListRole) {
                                    await db.User_role.create({
                                        userId: user.id,
                                        roleId: i.id
                                    })
                                }
                                resolve({
                                    errCode: 0,
                                    errMessage: 'Tạo thành công'
                                })
                            } catch (error) {
                                deleteUser(user.id)
                                resolve({
                                    errCode: 7,
                                    errMessage: 'Tạo role thất bại'
                                })
                            }
                        } else {
                            resolve({
                                errCode: 10,
                                errMessage: 'Tạo thất bại'
                            })
                        }
                    }
                }

            }
        } catch (e) {
            reject(e)
        }
    })
}
let deleteUser = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            await db.User.destroy({
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
let editUser = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let User = await db.User.findOne({
                where: { id: data.id }
            })
            if (User) {
                User.name = data.name;
                User.email = data.email;
                User.dateOfbirth = data.dateOfbirth;
                User.gender = data.gender;
                User.avatar = data.avatar;
                User.statusId = data.statusId;
                await User.save();
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
let searchUser = (text) => {
    return new Promise(async (resolve, reject) => {
        try {
            let data = await db.User.findAll({
                where: {
                    [Op.or]: [
                        { name: { [Op.like]: '%' + text + '%' } },
                        { phone: { [Op.like]: '%' + text + '%' } },
                        { cccd: { [Op.like]: '%' + text + '%' } },
                        { email: { [Op.like]: '%' + text + '%' } },
                    ]

                },
                attributes: ['id', 'phone', 'name', 'email', 'dateOfbirth', 'gender', 'cccd', 'avatar'],
                include: [
                    { model: db.Status, attributes: ['id', 'name'] },
                    { model: db.Adress, as: "addresses", attributes: ['id', 'address'], through: { attributes: [], } },
                    { model: db.Role, as: "roles", attributes: ['id', 'name'], through: { attributes: [], } },
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
let getAllUser_Type = (roleId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let data = await db.User.findAll({
                attributes: ['id', 'phone', 'name', 'email', 'dateOfbirth', 'gender', 'cccd', 'avatar'],
                include: [
                    { model: db.Status, attributes: ['id', 'name'] },
                    { model: db.Adress, as: "addresses", attributes: ['id', 'address'], through: { attributes: [], } },
                    {
                        model: db.Role, as: "roles", where: { roleId: roleId },
                        attributes: ['id', 'name'], through: { attributes: [], }
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
let getOneUser = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            let data = await db.User.findOne({
                where: { id: id },
                attributes: attributes,
                include: include,
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
let changePassword = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (data.passwordNew.length <= 5) {
                resolve({
                    errCode: 5,
                    errMessage: 'Mật khẩu mới phải >5 kí tự'
                })
            } else {
                let User = await db.User.findOne({
                    where: { id: data.id }
                })
                if (User) {
                    let checkPassWord = await bcrypt.compareSync(data.passwordInput, User.password);
                    if (checkPassWord == true) {
                        let hashPassWordFromBcrypt = await bcrypt.hashSync(data.passwordNew, salt);
                        User.password = hashPassWordFromBcrypt;
                        await User.save();
                        resolve({
                            errCode: 0,
                            errMessage: 'Thành công'
                        })
                    } else {
                        resolve({
                            errCode: 4,
                            errMessage: 'Mật khẩu hiện tại không chính xác'
                        })
                    }
                } else {
                    resolve({
                        errCode: 3,
                        errMessage: 'Không tồn tại'
                    })
                }
            }
        } catch (e) {
            reject(e)
        }
    })
}
module.exports = {
    getAllUser: getAllUser,
    createUser: createUser,
    deleteUser: deleteUser,
    editUser: editUser,
    searchUser: searchUser,
    getAllUser_Type: getAllUser_Type,
    getOneUser: getOneUser,
    changePassword: changePassword,

}