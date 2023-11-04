import React, { Component } from 'react';
import { toast } from 'react-toastify';
import { withRouter } from 'react-router-dom';
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import bg from '../../assets/images/bg2.jpg';
import { Login } from '../../services/LoginService';
class login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            is_showPassword: false,
            phone: '',
            password: '',
            whoLogin: '0'
        }
    }
    handleOnchangeWhoLogin = (event) => {
        this.setState({ whoLogin: event.target.value })
    }
    async componentDidMount() {
    }
    handleOnchangePhone = (event) => {
        this.setState({ phone: event.target.value })
    }
    handleOnchangePassword = (event) => {
        this.setState({ password: event.target.value })
    }
    onClickShowPassWord = () => {
        this.setState({ is_showPassword: !this.state.is_showPassword })
    }
    onClickPage = (input) => {
        this.props.history.push(`/${input}`)
    }
    handleLogin = async () => {
        let phone = this.state.phone;
        let password = this.state.password;
        if (phone.length == 0 || password.length == 0) {
            toast.error('Vui lòng nhập số điện thoại và mật khẩu')
            return;
        }
        if (password.length < 5 || phone.length != 10) {
            toast.error('Số điện thoải phải là 10 số và mật khẩu phải > 5 kí tự')
            return;
        }
        else {
            let data = await Login(this.state.phone, this.state.password);
            let whoLogin = this.state.whoLogin;
            if (data && data.data && data.data.errCode == 0) {
                let listRole = data.data.user.roles;
                if (whoLogin == 0) {
                    var result = listRole.find(item => item.type == 2);
                    if (result) {
                        localStorage.setItem('customerAccount', JSON.stringify(
                            { isLogin: true, data: data.data, }
                        ))
                        this.props.history.push(`/home`);
                    } else {
                        toast.error('Tài khoản không tồn tại')
                    }
                } else {
                    var result = listRole.find(item => item.type == 1);
                    if (result) {
                        localStorage.setItem('staffAccount', JSON.stringify(
                            { isLogin: true, data: data.data, }
                        ))
                        this.props.history.push(`/dashboard`);
                    } else {
                        toast.error('Tài khoản không tồn tại')
                    }
                }
            } else {
                toast.error(data.data.errMessage);
                return;
            }
        }
    }
    render() {
        return (
            <div className='h-screen w-screen flex items-center justify-center bg-cover' style={{ backgroundImage: `url(${bg})` }}>
                <div className='text-center bg-white text-white bg-opacity-10 space-y-[10px] border p-[20px] shadow-md rounded-[5px]'>
                    <h1 className='text-[22px] sm:text-[25px] font-[700] font-serif'>Đăng nhập</h1>
                    <div className='text-black'>
                        <select value={this.state.whoLogin}
                            onChange={(event) => this.handleOnchangeWhoLogin(event)}
                            className='w-[150px] h-[30px] text-center rounded-[5px]'>
                            <option value={0}>KHÁCH HÀNG</option>
                            <option value={1}>NHÂN VIÊN</option>
                        </select>
                    </div>
                    <input onChange={(event) => this.handleOnchangePhone(event)}
                        placeholder='Số điện thoại ( 10 số )' className='w-[300px] h-[40px] rounded-[5px] border px-[20px] shadow-md text-black' />
                    <div className='relative'>
                        <input onChange={(event) => this.handleOnchangePassword(event)}
                            placeholder='Mật khẩu (>5 kí tự)' type={this.state.is_showPassword == false ? 'password' : 'text'}
                            className='block w-[300px] h-[40px] rounded-[5px] border px-[20px] shadow-md text-black' />
                        <button onClick={() => this.onClickShowPassWord()}
                            className='absolute top-[14px] right-[10px] text-[#4d4d4d]'><AiFillEye /></button>
                        {this.state.is_showPassword == true &&
                            <button onClick={() => this.onClickShowPassWord()}
                                className='absolute top-[14px] right-[10px] text-[#4d4d4d]'><AiFillEyeInvisible /></button>
                        }
                    </div>
                    <div className='space-x-[10px]'>
                        <input type='checkbox' />
                        <label>Nhớ mật khẩu</label>
                    </div>
                    <div className='text-white font-[500] text-[16px] sm:text-[18px]'>
                        <button onClick={() => this.handleLogin()}
                            className='bg-[#202020] w-[300px] h-[40px] rounded-[5px]'>
                            Đăng nhập
                        </button>
                    </div>
                    <div className=' pb-[30px] sm:pb-[50px] '>
                        <span className='underline cursor-pointer hover:text-[#ee0303e0]'>Quên mật khẩu ?</span>
                    </div>
                    <div className=' font-[500] text-[16px] sm:text-[18px]'>
                        <button onClick={() => this.onClickPage('register')}
                            className='bg-[#202020] w-[300px] h-[40px] rounded-[5px]'>
                            Tạo tài khoản
                        </button>
                    </div>
                    <div className='font-[500] text-[16px] sm:text-[18px]'>
                        <button onClick={() => this.onClickPage('home')}
                            className='bg-[#202020] w-[300px] h-[40px] rounded-[5px]'>
                            Quay về trang chủ
                        </button>
                    </div>
                </div>
            </div>
        );
    }

}


export default withRouter(login);
