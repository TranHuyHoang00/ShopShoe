import React from 'react';
import { toast } from 'react-toastify';
import { withRouter } from 'react-router-dom';
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { Select } from 'antd';
import { createUser } from '../../../../services/UserService';
import { getAllRole } from '../../../../services/RoleService';

class UserCreate extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            is_showPassword: false,
            dataRole: [],
            dataCreate: {
                gender: 0,
                statusId: 1,
                avatar: 'a.jpg',
                ListRole: []
            },
        }
    }
    async componentDidMount() {
        await this.getAllRole();
    }
    getAllRole = async () => {
        try {
            let data = await getAllRole();
            let dataRaw = data.data.data;
            let dataFilter = [];
            for (const i of dataRaw) {
                let obj = {};
                obj.value = i.id;
                obj.label = i.name;
                dataFilter.push(obj);
            }
            if (data && data.data && data.data.errCode == 0) {
                this.setState({ dataRole: dataFilter })
            } else {
                this.setState({ dataRole: [] })
            }
        } catch (e) {
            toast.success('Lỗi')
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
    handleCreateAccount = async () => {
        let phone = this.state.dataCreate.phone;
        let name = this.state.dataCreate.name;
        let statusId = this.state.dataCreate.statusId;
        let ListRole = this.state.dataCreate.ListRole;
        if (!phone || !name || statusId == '' || ListRole.length == 0) {
            toast.error("Vui lòng điền đầy đủ thông tin")
            return;
        }
        if (phone.length != 10) {
            toast.error("Số điện thoải phải là 10 số ")
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
    onChangeRole = (value) => {
        let arr = []
        for (const i of value) {
            let obj = {};
            obj.id = i;
            arr.push(obj);
        }
        this.setState({
            dataCreate: {
                ...this.state.dataCreate,
                ListRole: arr,
            }
        })
    }
    render() {
        return (
            <div className=' flex items-center justify-center'>
                <div className='text-center bg-white space-y-[10px] border p-[20px] shadow-md rounded-[5px]'>
                    < h1 className='text-[22px] sm:text-[25px] font-[700] font-serif' >Tạo người dùng</h1 >
                    <div className='md:flex md:space-x-[10px] md:space-y-0 space-y-[10px]'>
                        <input onChange={(event) => this.handleOnChangeInput(event, 'phone')}
                            placeholder='Số điện thoại *' className='w-[200px] sm:w-[300px] h-[40px] rounded-[5px] border-[2px] px-[20px]
                     shadow-md border-red-500' />
                        <div className='relative'>
                            <input onChange={(event) => this.handleOnChangeInput(event, 'password')}
                                placeholder='Mật khẩu *' type={this.state.is_showPassword == false ? 'password' : 'text'}
                                className='block w-[200px] sm:w-[300px] h-[40px] rounded-[5px] border-[2px] border-red-500 px-[20px]
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
                                placeholder='Email' className='w-[200px] sm:w-[300px] h-[40px] rounded-[5px] border px-[20px]
                     shadow-md' />
                        </div>
                        <div>
                            <input onChange={(event) => this.handleOnChangeInput(event, 'name')}
                                placeholder='Họ và tên *' className='w-[200px] sm:w-[300px] h-[40px] rounded-[5px] border-[2px] border-red-500 px-[20px]
                     shadow-md' />
                        </div>
                    </div>
                    <div className='md:flex md:space-x-[10px] md:space-y-0 space-y-[10px] '>
                        <div className='md:text-left text-[#bdc3d4]'>
                            <span className=' text-[14px]  '>Ngày sinh *</span><br />
                            <input type='date' onChange={(event) => this.handleOnChangeInput(event, 'dateOfbirth')}
                                className='w-[200px] sm:w-[300px] h-[40px] rounded-[5px] border px-[20px] text-black
                     shadow-md' />
                        </div>
                        <div className='md:text-left'>
                            <span className='text-[14px] text-[#bdc3d4]'>Giới tính *</span><br />
                            <select value={this.state.dataCreate.gender}
                                onChange={(event) => this.handleOnChangeInput(event, 'gender')}
                                className='w-[200px] sm:w-[300px] h-[40px] rounded-[5px] border px-[20px]
                     shadow-md' >
                                <option></option>
                                <option value='1'>Nam</option>
                                <option value='0'>Nữ</option>
                            </select>
                        </div>
                    </div>
                    <div className='md:flex md:space-x-[10px] md:space-y-0 space-y-[10px] '>
                        <div className='md:text-left text-[#bdc3d4]'>
                            <span className=' text-[14px] text-red-500 '>Vai trò *</span><br />
                            <Select className='w-[200px] sm:w-[300px] h-[40px] '
                                mode="tags" allowClear maxTagCount='responsive'
                                placeholder="Chọn phân quyền" size='large'
                                onChange={(event) => this.onChangeRole(event)}
                                options={this.state.dataRole}
                            />
                        </div>
                        <div className='md:text-left'>
                            <span className='text-[14px] text-red-500'>Trạng thái *</span><br />
                            <select value={this.state.dataCreate.statusId}
                                onChange={(event) => this.handleOnChangeInput(event, 'statusId')}
                                className='w-[200px] sm:w-[300px] h-[40px] rounded-[5px] border px-[20px] shadow-md' >
                                <option value='1'>Hoạt động</option>
                                <option value='2'>Khóa</option>
                            </select>
                        </div>
                    </div>
                    <div className='text-white font-[500] text-[16px] sm:text-[18px] md:pb-[20px]'>
                        <button onClick={() => this.handleCreateAccount()}
                            className='bg-[#343a40] w-full h-[40px] rounded-[5px] '>
                            Đăng ký
                        </button>
                    </div>
                </div >
            </div >
        )
    }
}

export default withRouter(UserCreate);