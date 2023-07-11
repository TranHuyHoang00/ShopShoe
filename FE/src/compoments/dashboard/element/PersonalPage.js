import React from 'react';
import { toast } from 'react-toastify';
import { getOneUser, editUser, changePassword } from '../../../services/UserService';
import {
    AiOutlineUser, AiTwotonePhone, AiOutlineMail, AiOutlineCalendar, AiOutlineGitlab,
    AiOutlineMeh, AiOutlineIdcard, AiOutlinePlus, AiOutlineEye, AiOutlineEdit, AiOutlineDelete
} from "react-icons/ai";
import { Modal, Input, Button } from 'antd';
import { createUser_address, deleteUser_address, editUser_address } from '../../../services/User_addressService';
class PersonalPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            dataUser: {},
            dataStatus: {},
            dataAddress: [],
            isActive: '',
            dataCreateAddress: {
                name: '',
                userId: '',
                id: 0,
            },
            accessToken: '',
            dataPassword: {
                id: null,
            },
        }
    }
    async componentDidMount() {
        let infor = JSON.parse(window.localStorage.getItem('staffAccount'));
        if (infor && infor.data && infor.data.user) {
            this.setState({
                dataCreateAddress: {
                    ...this.state.dataCreateAddress,
                    userId: infor.data.user.id,
                },
                accessToken: infor.data.accessToken,
                dataPassword: {
                    id: infor.data.user.id,
                }
            })
            await this.getOneUser()
        } else {
            this.setState({ dataUser: {} })
        }
    }
    getOneUser = async () => {
        try {
            let infor = JSON.parse(window.localStorage.getItem('staffAccount'));
            let data = await getOneUser(infor.data.user.id);
            let dataUser = data.data.data;
            if (data && data.data && data.data.errCode == 0) {
                this.setState({
                    dataUser: dataUser,
                    dataStatus: dataUser.Status,
                    dataAddress: dataUser.addresses,
                })
            } else {
                this.setState({ dataUser: {} })
            }
        } catch (e) {
            toast.success('Lỗi')
        }
    }

    onChangeAddress = (event) => {
        this.setState({
            dataCreateAddress: {
                ...this.state.dataCreateAddress,
                name: event.target.value,
            }
        })
    }
    onChangeEditAddress = (item) => {
        this.setState({
            dataCreateAddress: {
                ...this.state.dataCreateAddress,
                name: item.name,
                id: item.id
            }
        })
    }
    handleAddress = async () => {
        try {
            let dataCreateAddress = this.state.dataCreateAddress;
            if (dataCreateAddress.id == 0) {
                if (!dataCreateAddress.name || dataCreateAddress.userId == '') {
                    toast.error('Không được để trống địa chỉ')
                } else {
                    let data = await createUser_address(dataCreateAddress, this.state.accessToken);
                    if (data && data.data && data.data.errCode == 0) {
                        toast.success(data.data.errMessage)
                        await this.getOneUser()
                        this.setState({
                            dataCreateAddress: {
                                ...this.state.dataCreateAddress,
                                name: '',
                                id: 0
                            }
                        })
                        return;
                    } else {
                        toast.error(data.data.errMessage)
                        return;
                    }
                }
            } else {
                if (!dataCreateAddress.name || dataCreateAddress.id == 0) {
                    toast.error('Không được để trống địa chỉ')
                } else {
                    let data = await editUser_address(dataCreateAddress, this.state.accessToken);
                    if (data && data.data && data.data.errCode == 0) {
                        await this.getOneUser()
                        toast.success(data.data.errMessage)
                        this.setState({
                            dataCreateAddress: {
                                ...this.state.dataCreateAddress,
                                name: '',
                                id: 0
                            }
                        })
                        return;
                    } else {
                        toast.error(data.data.errMessage)
                        return;
                    }
                }
            }
        } catch (e) {
            toast.error('Lỗi')
        }

    }
    handleDeleteUser_addresss = async (id) => {
        try {
            let data = await deleteUser_address(id, this.state.accessToken);
            if (data && data.data && data.data.errCode == 0) {
                toast.success(data.data.errMessage);
                await this.getOneUser()
            } else {
                toast.error(data.data.errMessage)
            }
        } catch (e) {
            toast.success('Lỗi')
        }
    }
    handleOnChangeInput = (event, id) => {
        let copyState = { ...this.state.dataUser };
        copyState[id] = event.target.value;
        this.setState({
            dataUser: {
                ...copyState
            }
        });
    }
    handleEditUser = async () => {
        try {
            let data = await editUser(this.state.dataUser, this.state.accessToken)
            if (data && data.data && data.data.errCode == 0) {
                toast.success(data.data.errMessage)
                await this.getOneUser()
                return;
            } else {
                toast.error(data.data.errMessage)
                return;
            }
        } catch (e) {
            toast.error('Lỗi')
        }
    }
    handleOnchangeImg = (event) => {
        let file = event.target.files[0];
        if (file) {
            this.setState({
                dataUser: {
                    ...this.state.dataUser,
                    avatar: file.name,
                }
            })
        } else {
            toast.error('Lỗi')
        }
    }
    handleOnChangeInputPassword = (event, id) => {
        let copyState = { ...this.state.dataPassword };
        copyState[id] = event.target.value;
        this.setState({
            dataPassword: {
                ...copyState
            }
        });
    }
    handleChangePassword = async () => {
        try {
            let dataPassword = this.state.dataPassword;
            if (!dataPassword.passwordInput || !dataPassword.passwordNew) {
                toast.error('Vui lòng nhập mật khẩu cũ và mới')
                return;
            }
            if (dataPassword.passwordInput.length <= 5 || dataPassword.passwordNew.length <= 5) {
                toast.error('Mật khẩu cũ và mới phải >5 kí tự')
                return;
            }
            let data = await changePassword(dataPassword, this.state.accessToken);
            if (data && data.data && data.data.errCode == 0) {
                toast.success(data.data.errMessage)
                this.setState({ isActive: '' })
                await this.getOneUser()
                return;
            } else {
                toast.error(data.data.errMessage)
                return;
            }
        } catch (e) {
            toast.error('Lỗi')
        }
    }
    onClickOpen = (input) => { this.setState({ isActive: input }) }
    onClickClose = () => { this.setState({ isActive: '' }) }
    render() {
        let dataUser = this.state.dataUser;
        console.log(dataUser);
        let dataAddress = this.state.dataAddress;
        return (
            <>
                <div className='px-[10px] sm:px-[30px] lg:px-[50px] space-y-[5px] sm:text-[14px] lg:text-[16px]'>
                    <div className='font-[600] text-[#595959]'>
                        <label>Trang cá nhân</label>
                    </div>
                    <div className='block md:grid grid-cols-3 gap-[20px] bg-white p-[20px] space-y-[20px] md:space-y-0 border shadow-md rounded-[5px]'>
                        <div className='flex items-center justify-center'>
                            <div className='text-center text-white space-y-[10px]'>
                                {dataUser.avatar == null ?
                                    <img src={require(`../../../assets/avatars/a.jpg`).default}
                                        className='h-[200px] sm:h-[250px] md:h-[300px] w-auto  object-cover' />
                                    :
                                    <img src={require(`../../../assets/avatars/${dataUser.avatar}`).default}
                                        className='h-[200px] sm:h-[250px] md:h-[300px] w-auto object-cover' />
                                }
                                <input id="image" type='file' hidden onChange={(event) => this.handleOnchangeImg(event)} />
                                <div> <label htmlFor='image' className='bg-[#595959] px-[10px] py-[4px] rounded-[3px] '>Thay ảnh</label></div>
                            </div>
                        </div>
                        <div className='flex md:block items-center justify-center'>
                            <div className='space-y-[10px]'>
                                <div className='space-x-[10px] flex items-center'>
                                    <AiOutlineUser className='text-[24px]' />
                                    <input onChange={(event) => this.handleOnChangeInput(event, 'name')}
                                        value={dataUser.name} className='border-b focus:outline-none' />
                                </div>
                                <div className='space-x-[10px] flex items-center'>
                                    <AiTwotonePhone className='text-[24px]' />
                                    <input disabled value={dataUser.phone} className='border-b focus:outline-none' />
                                </div>
                                <div className='space-x-[10px] flex items-center'>
                                    <AiOutlineMail className='text-[24px]' />
                                    <input onChange={(event) => this.handleOnChangeInput(event, 'email')}
                                        value={dataUser.email} className='border-b focus:outline-none' />
                                </div>
                                {/* Address */}
                                <div className='space-x-[10px] flex items-center'>
                                    <AiOutlineIdcard className='text-[24px]' />
                                    <select className='truncate w-[150px] lg:w-[200px] '>
                                        {dataAddress && dataAddress.map((item, index) => {
                                            return (
                                                <option className='w-[100px]' key={item.id}>{item.name}</option>
                                            )
                                        })}
                                    </select>
                                    <AiOutlinePlus onClick={() => this.onClickOpen('address')}
                                        className='text-[24px] bg-[#595959] text-white p-[2px] rounded-[2px]' />

                                </div>
                                <div className='space-x-[10px] flex items-center'>
                                    <AiOutlineCalendar className='text-[24px]' />
                                    <input onChange={(event) => this.handleOnChangeInput(event, 'dateOfbirth')}
                                        type='date' value={dataUser.dateOfbirth} className='border-b focus:outline-none' />
                                </div>
                                <div className='space-x-[10px] flex items-center'>
                                    <AiOutlineGitlab className='text-[24px]' />
                                    <select onChange={(event) => this.handleOnChangeInput(event, 'gender')}
                                        value={dataUser.gender}>
                                        <option value={'1'}>Nam</option>
                                        <option value={'0'}>Nữ</option>
                                    </select>

                                </div>
                                <div className='space-x-[10px] flex items-center'>
                                    <AiOutlineMeh className='text-[24px]' />
                                    <input disabled value={this.state.dataStatus.name} className='border-b focus:outline-none' />
                                </div>
                                <div className=' text-white  '>
                                    <button onClick={() => this.handleEditUser()}
                                        className='bg-[#595959] px-[10px] py-[4px] rounded-[3px] '>Lưu ngay</button>
                                </div>
                            </div>
                        </div>
                        <div className='flex md:block items-center justify-center'>
                            <div className='space-y-[10px]'>
                                <div className='space-y-[10px] '>
                                    <div className='xl:space-x-[10px] xl:flex items-center'>
                                        <label>Ngày tạo : </label>
                                        <input disabled value={dataUser.createdAt} className='border-b focus:outline-none' />
                                    </div>
                                    <div className='xl:space-x-[10px] xl:flex items-center'>
                                        <label>Ngày cập nhập : </label>
                                        <input disabled value={dataUser.updatedAt} className='border-b focus:outline-none' />
                                    </div>
                                    <div className=''>
                                        <label>Phân quyền : </label>
                                        <div className='px-[20px]'>
                                            {dataUser && dataUser.roles && dataUser.roles.map((item, index) => {
                                                return (
                                                    <div key={item.id}><label>{index + 1} - {item.name}</label></div>
                                                )
                                            })}
                                        </div>
                                    </div>
                                </div>
                                <div className=' text-white  '>
                                    <button onClick={() => this.onClickOpen('password')}
                                        className='bg-[#595959] px-[10px] py-[4px] rounded-[3px] '>Đổi mật khẩu</button>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
                {/* password */}
                <Modal title="Đổi mật khẩu" open={this.state.isActive == 'password' ? true : false} width={400}
                    onCancel={() => this.onClickClose()} onOk={() => this.onClickClose()}>
                    <div className='space-y-[10px]'>
                        <Input type='password' placeholder='Mật khẩu cũ' onChange={(event) => this.handleOnChangeInputPassword(event, 'passwordInput')} />
                        <Input type='password' placeholder='Mật khẩu mới' onChange={(event) => this.handleOnChangeInputPassword(event, 'passwordNew')} />
                        <Button onClick={() => this.handleChangePassword()}
                            className='bg-[#595959] rounded-[3px] text-white '>Đổi mật khẩu</Button>
                    </div>
                </Modal>
                {/* address */}
                <Modal width={700} onCancel={() => this.onClickClose()}
                    onOk={() => this.onClickClose()}
                    title="Địa chỉ cá nhân" open={this.state.isActive == 'address' ? true : false}>
                    {dataAddress && dataAddress.map((item, index) => {
                        return (
                            <div className='grid grid-cols-5 w-full border-b py-[5px]'>
                                <div className='col-span-4  truncate'><label>{item.name}</label></div>
                                <div className=' text-white flex items-center space-x-[10px] text-[14px] '>
                                    <button className='bg-[#343a40] p-[4px] rounded-[3px] hover:bg-[#eb0000]'
                                        onClick={() => this.onChangeEditAddress(item)}><AiOutlineEdit /></button>
                                    <button className='bg-[#343a40] p-[4px] rounded-[3px] hover:bg-[#eb0000]'
                                        onClick={() => this.handleDeleteUser_addresss(item.id)}><AiOutlineDelete /></button>
                                </div>
                            </div>
                        )
                    })}
                    <div className='flex items-center py-[10px] '>
                        <Input value={this.state.dataCreateAddress.name}
                            onChange={(event) => this.onChangeAddress(event)}
                            placeholder='Địa chỉ' className='border w-full h-[35px]' />
                        <Button onClick={() => this.handleAddress()}
                            className='h-[35px] px-[20px] bg-[#595959]  text-white'>
                            {this.state.dataCreateAddress.id == 0 ? 'Tạo' : 'Lưu'}
                        </Button>
                    </div>
                </Modal>
            </>
        )
    }
}

export default PersonalPage;