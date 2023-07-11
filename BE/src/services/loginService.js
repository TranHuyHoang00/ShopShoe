import db from '../models/index';
import bcrypt from 'bcryptjs';
import { generateToken, decodeToken } from '../auth/auth'

let login = (phone, password) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (phone.length != 10) { resolve({ errCode: 3, errMessage: 'Số điện thoại phải là 10 số' }) }
            if (password.length <= 5) { resolve({ errCode: 4, errMessage: 'Mật khẩu phải > 5 kí tự' }) }
            let user = await db.User.findOne({
                where: { phone: phone },
                include: [
                    { model: db.Role, as: "roles", attributes: ['id', 'name', 'type'], through: { attributes: [], } },
                    { model: db.Status, attributes: ['id', 'name'] },
                    { model: db.Address, as: "addresses", attributes: ['id', 'name'], through: { attributes: [], } },

                ]
            })
            if (!user) {
                resolve({
                    errCode: 3,
                    errMessage: 'Tài khoản không tồn tại'
                })
            } else {
                let checkPassWord = await bcrypt.compareSync(password, user.password);
                let payload = {
                    id: user.id,
                    phone: user.phone
                }
                if (checkPassWord == true) {
                    let accessToken = await generateToken(
                        payload,
                        process.env.ACCESS_TOKEN_SECRET,
                        process.env.ACCESS_TOKEN_LIFE
                    );
                    if (!accessToken) {
                        resolve({
                            accessToken: accessToken,
                            errCode: 4,
                            errMessage: 'Tạo access token thất bại'
                        })
                    } else {
                        let refreshToken = await generateToken(
                            payload,
                            process.env.REFRESH_TOKEN_SECRET,
                            process.env.REFRESH_TOKEN_LIFE
                        );
                        if (!user.refreshToken) {
                            user.refreshToken = refreshToken,
                                await user.save();
                        } else {
                            refreshToken = user.refreshToken;
                        }
                        resolve({
                            accessToken: accessToken,
                            user: user,
                            errCode: 0,
                            errMessage: 'Đăng nhập thành công'
                        })
                    }
                } else {
                    resolve({
                        errCode: 5,
                        errMessage: 'Mật khẩu không chính xác'
                    })
                }
            }
        } catch (e) {
            reject(e)
        }
    })
}
let refresh = (refreshTokenFromBody, accessTokenFromHeader) => {
    return new Promise(async (resolve, reject) => {
        try {
            let decoded = await decodeToken(
                accessTokenFromHeader,
                process.env.ACCESS_TOKEN_SECRET,
            );
            if (!decoded) {
                resolve({
                    errCode: 3,
                    errMessage: 'Access token không hợp lệ'
                })
            } else {
                let user = await db.User.findOne({
                    where: { phone: decoded.payload.phone },
                })
                if (!user) {
                    resolve({
                        errCode: 4,
                        errMessage: 'Người dùng không tồn tại'
                    })
                } else {
                    if (refreshTokenFromBody !== user.refreshToken) {
                        resolve({
                            errCode: 5,
                            errMessage: 'Refresh token không hợp lệ'
                        })
                    } else {
                        let accessToken = await generateToken(
                            { phone: decoded.payload.phone },
                            process.env.ACCESS_TOKEN_SECRET,
                            process.env.ACCESS_TOKEN_LIFE,
                        );
                        if (!accessToken) {
                            resolve({
                                errCode: 6,
                                errMessage: 'Tạo Access token thất bại'
                            })
                        } else {
                            resolve({
                                errCode: 0,
                                errMessage: 'Tạo thành công Access token',
                                accessToken: accessToken
                            })
                        }
                    }
                }
            }
        } catch (e) {
            reject(e);
        }
    })
}

module.exports = {
    login: login,
    refresh: refresh,
}