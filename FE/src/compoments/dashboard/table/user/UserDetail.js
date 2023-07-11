import React from 'react';
import { withRouter } from 'react-router-dom';
import { toast } from 'react-toastify';
import { getOneUser } from '../../../../services/UserService';
import {
    AiOutlineUser, AiTwotonePhone, AiOutlineMail, AiOutlineCalendar, AiOutlineGitlab, AiOutlineMeh, AiOutlineIdcard, AiOutlinePlus,
} from "react-icons/ai";
class UserDetail extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            dataUser: {},
            dataStatus: {},
            dataAddress: [],
            accessToken: '',
        }
    }
    async componentDidMount() {
        if (this.props.match && this.props.match.params) {
            let id = this.props.match.params.id;
            await this.getOneUser(id);
        }
    }
    getOneUser = async (id) => {
        try {
            let data = await getOneUser(id);
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
    render() {
        let dataUser = this.state.dataUser;
        let dataAddress = this.state.dataAddress;
        return (
            <>
                <div className='px-[10px] sm:px-[30px] lg:px-[50px] space-y-[5px] sm:text-[14px] lg:text-[16px]'>
                    <div className='font-[600] text-[#595959]'>
                        <label>Chi tiết người dùng</label>
                    </div>
                    <div className='block md:grid grid-cols-3 gap-[20px] bg-white p-[20px] space-y-[20px] md:space-y-0 border shadow-md rounded-[5px]'>
                        <div className='flex items-center justify-center'>
                            <div className='text-center text-white space-y-[10px]'>
                                {dataUser.avatar == null ?
                                    <img src={require(`../../../../assets/avatars/a.jpg`).default}
                                        className='h-[200px] sm:h-[250px] md:h-[300px] w-auto  object-cover' />
                                    :
                                    <img src={require(`../../../../assets/avatars/${dataUser.avatar}`).default}
                                        className='h-[200px] sm:h-[250px] md:h-[300px] w-auto object-cover' />
                                }
                            </div>
                        </div>
                        <div className='flex md:block items-center justify-center'>
                            <div className='space-y-[10px]'>
                                <div className='space-x-[10px] flex items-center'>
                                    <AiOutlineUser className='text-[24px]' />
                                    <input value={dataUser.name} className='border-b focus:outline-none' />
                                </div>
                                <div className='space-x-[10px] flex items-center'>
                                    <AiTwotonePhone className='text-[24px]' />
                                    <input value={dataUser.phone} className='border-b focus:outline-none' />
                                </div>
                                <div className='space-x-[10px] flex items-center'>
                                    <AiOutlineMail className='text-[24px]' />
                                    <input value={dataUser.email} className='border-b focus:outline-none' />
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
                                </div>
                                <div className='space-x-[10px] flex items-center'>
                                    <AiOutlineCalendar className='text-[24px]' />
                                    <input value={dataUser.dateOfbirth} className='border-b focus:outline-none' />
                                </div>
                                <div className='space-x-[10px] flex items-center'>
                                    <AiOutlineGitlab className='text-[24px]' />
                                    <input value={dataUser.gender == 1 ? 'Nam' : 'Nữ'} className='border-b focus:outline-none' />
                                </div>
                                <div className='space-x-[10px] flex items-center'>
                                    <AiOutlineMeh className='text-[24px]' />
                                    <input value={this.state.dataStatus.name} className='border-b focus:outline-none' />
                                </div>
                            </div>
                        </div>
                        <div className='flex md:block items-center justify-center'>
                            <div className='space-y-[10px]'>
                                <div className='space-y-[10px] '>
                                    <div className='xl:space-x-[10px] xl:flex items-center'>
                                        <label>Ngày tạo : </label>
                                        <input value={dataUser.createdAt} className='border-b focus:outline-none' />
                                    </div>
                                    <div className='xl:space-x-[10px] xl:flex items-center'>
                                        <label>Ngày cập nhập : </label>
                                        <input value={dataUser.updatedAt} className='border-b focus:outline-none' />
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
                            </div>
                        </div>
                    </div>
                </div>
            </>
        )
    }
}

export default withRouter(UserDetail);