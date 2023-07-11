import React from 'react';
import { toast } from 'react-toastify';
import { withRouter } from 'react-router-dom';
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import bg from '../../assets/images/bg2.jpg';
import { createUser } from '../../services/UserService';
class register extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            is_showPassword: false,
            dataCreate: {
                statusId: 1,
                avatar: 'a.jpg',
                ListRole: [{ id: 6 }]
            },
        }
    }
    handleOnChangeInput = (event, id) => {
        let copyState = { ...this.state.dataCreate };
        copyState[id] = event.target.value;
        this.setState({
            dataCreate: {
                ...copyState
            }
        });
    }
    onClickShowPassWord = () => {
        this.setState({ is_showPassword: !this.state.is_showPassword })
    }
    onClickPage = (input) => {
        this.props.history.push(`/${input}`)

    }
    handleCreateAccount = async () => {
        let phone = this.state.dataCreate.phone;
        let password = this.state.dataCreate.password;
        let name = this.state.dataCreate.name;
        if (!phone || !password || !name) {
            toast.error("Vui lòng điền đầy đủ thông tin")
            return;
        }
        if (password.length <= 5 || phone.length != 10) {
            toast.error("Số điện thoải phải là 10 số và mật khẩu phải > 5 kí tự")
            return;
        }
        else {
            try {
                let data = await createUser(this.state.dataCreate)
                if (data && data.data && data.data.errCode == 0) {
                    toast.success(data.data.errMessage)
                    return;
                } else {
                    toast.error(data.data.errMessage)
                    return;
                }
            } catch (e) {
                toast.error("Lỗi Server")
            }
        }
    }
    render() {
        return (
            <div className='h-screen w-screen flex items-center justify-center bg-cover' style={{ backgroundImage: `url(${bg})` }}>
                <div className='text-center bg-white  bg-opacity-10 space-y-[10px] border p-[20px] shadow-md rounded-[5px]'>
                    <h1 className='text-[22px] text-white sm:text-[25px] font-[700] font-serif'>Đăng ký tài khoản</h1>
                    <div className='md:flex md:space-x-[10px] md:space-y-0 space-y-[10px]'>
                        <input onChange={(event) => this.handleOnChangeInput(event, 'phone')}
                            placeholder='Số điện thoại *' className='w-[300px] h-[40px] rounded-[5px] border-[2px] px-[20px]
                     shadow-md border-red-500' />
                        <div className='relative'>
                            <input onChange={(event) => this.handleOnChangeInput(event, 'password')}
                                placeholder='Mật khẩu *' type={this.state.is_showPassword == false ? 'password' : 'text'}
                                className='block w-[300px] h-[40px] rounded-[5px] border-[2px] border-red-500 px-[20px]
                     shadow-md' />
                            <button onClick={() => this.onClickShowPassWord()}
                                className='absolute top-[14px] right-[10px] text-[#4d4d4d]'><AiFillEye /></button>
                            {this.state.is_showPassword == true &&
                                <button onClick={() => this.onClickShowPassWord()}
                                    className='absolute top-[14px] right-[10px] text-[#4d4d4d]'><AiFillEyeInvisible /></button>
                            }
                        </div>
                    </div>
                    <div className='md:flex md:space-x-[10px] md:space-y-0 space-y-[10px]'>
                        <div>
                            <input onChange={(event) => this.handleOnChangeInput(event, 'email')}
                                placeholder='Email' className='w-[300px] h-[40px] rounded-[5px] border px-[20px]
                     shadow-md' />
                        </div>
                        <div>
                            <input onChange={(event) => this.handleOnChangeInput(event, 'name')}
                                placeholder='Họ và tên *' className='w-[300px] h-[40px] rounded-[5px] border-[2px] border-red-500 px-[20px]
                     shadow-md' />
                        </div>
                    </div>
                    <div className='md:flex md:space-x-[10px] md:space-y-0 space-y-[10px] '>
                        <div className='md:text-left text-[#bdc3d4]'>
                            <span className=' text-[14px]  '>Ngày sinh *</span><br />
                            <input type='date' onChange={(event) => this.handleOnChangeInput(event, 'dateOfbirth')}
                                className='w-[300px] h-[40px] rounded-[5px] border px-[20px] text-black
                     shadow-md' />
                        </div>
                        <div className='md:text-left'>
                            <span className='text-[14px] text-[#bdc3d4]'>Giới tính *</span><br />
                            <select onChange={(event) => this.handleOnChangeInput(event, 'gender')}
                                className='w-[300px] h-[40px] rounded-[5px] border px-[20px]
                     shadow-md' >
                                <option></option>
                                <option value='1'>Nam</option>
                                <option value='0'>Nữ</option>
                            </select>
                        </div>
                    </div>
                    <div className='text-white font-[500] text-[16px] sm:text-[18px] md:pb-[20px]'>
                        <button onClick={() => this.handleCreateAccount()}
                            className='bg-[#35c235] w-[300px] h-[40px] rounded-[5px] '>
                            Đăng ký
                        </button>
                    </div>
                    <div className='text-white font-[500] text-[16px] sm:text-[18px] space-x-[10px]'>
                        <button onClick={() => this.onClickPage('login')}
                            className='bg-[#1b76f4] w-[300px] h-[40px] rounded-[5px] '>
                            Đăng nhập ngay
                        </button>
                    </div>
                    <div className='text-white font-[500] text-[16px] sm:text-[18px]'>
                        <button onClick={() => this.onClickPage('home')}
                            className='bg-[#db0001] w-[300px] h-[40px] rounded-[5px] '>
                            Quay về trang chủ
                        </button>
                    </div>
                </div>
            </div>
        )
    }
}

export default withRouter(register);