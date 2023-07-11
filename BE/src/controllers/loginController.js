import LoginService from '../services/LoginService'

let handleLogin = async (req, res) => {
    try {
        if (!req.body.phone || !req.body.password) {
            return res.status(400).json({
                errCode: 1,
                errMessage: 'Thiếu thông tin',
            });
        } else {
            let result = await LoginService.login(req.body.phone, req.body.password);
            return res.status(200).json(result);
        }
    } catch (e) {
        return res.status(501).json({
            errCode: 2,
            errMessage: 'Lỗi server',
            error: e
        })
    }
}
let handleRefreshToken = async (req, res) => {
    try {
        if (!req.body.refreshToken || !req.headers.x_authorization) {
            return res.status(400).json({
                errCode: 1,
                errMessage: 'Không tìm thấy Refresh token hoặc Access token',
            });
        }
        let result = await LoginService.refresh(req.body.refreshToken, req.headers.x_authorization);
        return res.status(200).json(result);
    } catch (e) {
        return res.status(501).json({
            errCode: 2,
            errMessage: 'Lỗi server',
            error: e
        })
    }
}
module.exports = {
    handleLogin: handleLogin,
    handleRefreshToken: handleRefreshToken,
}