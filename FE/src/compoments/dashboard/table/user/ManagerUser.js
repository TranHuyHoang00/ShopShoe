import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { toast } from 'react-toastify';
import { AiOutlineEdit, AiOutlineDelete, AiOutlineEye, AiFillLock, AiFillUnlock } from "react-icons/ai";
import { getAllUser, deleteUser, editUser } from '../../../../services/UserService';
import { getAllRole } from '../../../../services/RoleService';
import { Popconfirm, Pagination } from 'antd'
class ManagerUser extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataUser: [],
            dataRole: [],
            accessToken: '',
            isActive: '',
            dataHandle: {},
            check: { roleId: 0, statusId: 0, filter: 1, page: 0, quantity: 6 }

        }
    }
    async componentDidMount() {
        let infor = JSON.parse(window.localStorage.getItem('staffAccount'));
        this.setState({ accessToken: infor.data.accessToken })
        await this.getAllUser(this.state.check);
        await this.getAllRole();
    }
    getAllRole = async () => {
        try {
            let data = await getAllRole();
            if (data && data.data && data.data.errCode == 0) {
                this.setState({ dataRole: data.data.data })
            } else {
                this.setState({ dataRole: [] })
            }
        } catch (e) {
            toast.success('Lỗi')
        }
    }
    getAllUser = async (check) => {
        try {
            let infor = JSON.parse(window.localStorage.getItem('staffAccount'));
            let data = await getAllUser(check, infor.data.accessToken);
            if (data && data.data && data.data.errCode == 0) {
                this.setState({ dataUser: data.data.data })
            } else {
                this.setState({ dataUser: [] })
            }
        } catch (e) {
            toast.success('Lỗi')
        }
    }
    onChangeFilter = async (event, id) => {
        let copyState = { ...this.state.check };
        copyState[id] = event.target.value;
        await this.getAllUser(copyState);
        this.setState({
            check: {
                ...copyState
            }
        });
    }
    handleUser = async (item, page) => {
        try {
            let data = [];
            if (page == 'delete') { data = await deleteUser(item.id, this.state.accessToken); }
            if (page == 'lock') { item.statusId = 2; data = await editUser(item, this.state.accessToken) }
            if (page == 'unlock') { item.statusId = 1; data = await editUser(item, this.state.accessToken) }
            if (data && data.data && data.data.errCode == 0) {
                toast.success(data.data.errMessage);
                this.getAllUser(this.state.check)
                return;
            } else {
                toast.error(data.data.errMessage)
                return;
            }
        } catch (e) {
            toast.error('Lỗi')
        }
    }
    onClickPage = (id, page) => {
        if (page == 'create') { this.props.history.push(`user/create`) }
        if (page == 'detail') { this.props.history.push(`user/${id}`) }
        if (page == 'edit') { this.props.history.push(`user/edit/${id}`) }
    }
    onChangePage = async (event) => {
        let check = this.state.check;
        check.page = event - 1;
        await this.getAllUser(check);
    }
    render() {
        let dataUser = this.state.dataUser;
        let dataRole = this.state.dataRole;
        return (
            <>
                <div className='text-[12px] md:text-[16px] px-[10px] md:px-[30px] space-y-[10px]'>
                    <div className='flex items-center justify-between'>
                        <button onClick={() => this.onClickPage(0, 'create')}
                            className='text-white bg-[#343a40] px-[10px] py-[4px] rounded-[4px] hover:bg-[#eb0000]'>Mới</button>
                        <div className='flex items-center space-x-[5px] sm:space-x-[20px] text-[10px] sm:text-[12px] md:text-[16px]'>
                            <div className='lg:flex items-center lg:space-x-[4px] cursor-pointer '>
                                <div><label>Phân quyền :</label></div>
                                <select value={this.state.check.roleId} className='border p-[5px]'
                                    onChange={(event) => this.onChangeFilter(event, 'roleId')} >
                                    <option value={0}>Tất cả</option>
                                    {dataRole && dataRole.map((item, index) => {
                                        return (
                                            <option key={item.id} value={item.id}>{item.name}</option>
                                        )
                                    })}
                                </select>
                            </div>
                            <div className='lg:flex items-center lg:space-x-[4px]  cursor-pointer '>
                                <div> <label>Trạng thái :</label></div>
                                <select value={this.state.check.statusId} className='border p-[5px]'
                                    onChange={(event) => this.onChangeFilter(event, 'statusId')} >
                                    <option value={0}>Tất cả</option>
                                    <option value={1}>Hoạt động</option>
                                    <option value={2}>Khóa</option>
                                </select>
                            </div>
                            <div className='lg:flex items-center lg:space-x-[4px] cursor-pointer '>
                                <div><label>Sắp xếp :</label></div>
                                <select value={this.state.check.filter} className='border p-[5px]'
                                    onChange={(event) => this.onChangeFilter(event, 'filter')}>
                                    <option value={1}>Mới nhất</option>
                                    <option value={2}>Cũ nhất</option>
                                    <option value={3}>A-Z</option>
                                    <option value={4}>Z-A</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <div className=' w-full pb-[20px] '>
                        <div className='bg-white w-full rounded-[10px] shadow-md'>
                            <div className='grid grid-cols-12 text-center font-[500] py-[5px] bg-[#343a40] text-white rounded-t-[10px]'>
                                <div><span>STT</span></div>
                                <div ><span>AVATAR</span></div>
                                <div className='col-span-3'><span>TÊN</span></div>
                                <div className='col-span-2'><span>SĐT</span></div>
                                <div className='col-span-2'><span>TRẠNG THÁI</span></div>
                                <div className='col-span-3'><span>HÀNH ĐỘNG</span></div>
                            </div>
                            {dataUser && dataUser.map((item, index) => {
                                return (
                                    <div key={item.id} className='grid grid-cols-12 py-[4px] text-center items-center border-b-[1px] font-[450]'>
                                        <div><span>{index + 1}</span></div>
                                        <div className='flex items-center justify-center'>
                                            <img src={require(`../../../../assets/avatars/${item.avatar}`).default}
                                                className='h-[40px] w-[40px] md:h-[50px] md:w-[50px] object-cover rounded-full' />
                                        </div>
                                        <div className='col-span-3'><span>{item.name}</span></div>
                                        <div className='col-span-2'><span>{item.phone}</span></div>
                                        <div className='col-span-2'><span>{item.Status.name}</span></div>
                                        <div className='col-span-3 text-white flex items-center justify-center space-x-[10px]'>
                                            <button className='bg-[#343a40] p-[4px] rounded-[3px] hover:bg-[#eb0000]'
                                                onClick={() => this.onClickPage(item.id, 'detail')}><AiOutlineEye /></button>
                                            <button className='bg-[#343a40] p-[4px] rounded-[3px] hover:bg-[#eb0000]'
                                                onClick={() => this.onClickPage(item.id, 'edit')}><AiOutlineEdit /></button>
                                            <Popconfirm title="Xóa người dùng" description="Bạn có chắc chắn muốn xóa người dùng" okText="Có"
                                                cancelText="Không" onConfirm={() => this.handleUser(item, 'delete')} >
                                                <button className='bg-[#343a40] p-[4px] rounded-[3px] hover:bg-[#eb0000]'><AiOutlineDelete /></button>
                                            </Popconfirm>
                                            {item.statusId == 1 &&
                                                <Popconfirm title="Khóa" description="Bạn có chắc chắn muốn khóa người dùng" okText="Có"
                                                    cancelText="Không" onConfirm={() => this.handleUser(item, 'lock')} >
                                                    <button className='bg-[#343a40] p-[4px] rounded-[3px] hover:bg-[#eb0000]'><AiFillUnlock /></button>
                                                </Popconfirm>

                                            }
                                            {item.statusId == 2 &&
                                                <Popconfirm title="Khóa" description="Bạn có chắc chắn muốn mở khóa người dùng" okText="Có"
                                                    cancelText="Không" onConfirm={() => this.handleUser(item, 'unlock')} >
                                                    <button className='bg-[#343a40] p-[4px] rounded-[3px] hover:bg-[#eb0000]'><AiFillLock /></button>
                                                </Popconfirm>

                                            }
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                    <Pagination defaultCurrent={this.state.check.page + 1} total={10} pageSize={2}
                        onChange={(event) => this.onChangePage(event)} />
                </div>
            </>
        );
    }

}
export default withRouter(ManagerUser);
