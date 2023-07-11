import React from 'react';
import { toast } from 'react-toastify';
import { getAllOrderByUser, deleteOrder, editOrder } from '../../../services/OrderService';
import { getOneUser } from '../../../services/UserService';
import { AiOutlineEye, AiOutlineDelete, AiOutlineEdit, AiFillMinusCircle } from "react-icons/ai";
import { withRouter } from 'react-router-dom';
import { Popconfirm } from 'antd';
class Order extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            dataOrder: [],
            accessToken: '',
            userId: [],
        }
    }
    async componentDidMount() {
        let infor = JSON.parse(window.localStorage.getItem('staffAccount'));
        this.setState({ accessToken: infor.data.accessToken })
        await this.getOneUser();
        await this.getAllOrderByUser()
    }
    getOneUser = async () => {
        try {
            let infor = JSON.parse(window.localStorage.getItem('customerAccount'));
            let data = await getOneUser(infor.data.user.id);
            let dataAddress = data.data.data.addresses;
            let userId = []
            for (const i of dataAddress) {
                userId.push(i.id)
            }
            if (data && data.data && data.data.errCode == 0) {
                this.setState({
                    userId: userId,
                })
            } else {
                this.setState({ userId: [] })
            }
        } catch (e) {
            toast.success('Lỗi')
        }
    }
    getAllOrderByUser = async () => {
        try {
            let data = await getAllOrderByUser(this.state.userId, this.state.accessToken);
            if (data && data.data && data.data.errCode == 0) {
                let dataRaw = data.data.data;
                let dataFilter = dataRaw.sort(function (a, b) { return b.id - a.id; })
                this.setState({ dataOrder: dataFilter })
            } else {
                this.setState({ dataOrder: [] })
            }
        } catch (e) {
            toast.success('Lỗi')
        }
    }
    onClickPage = (id, page) => {
        if (page == 'view') { this.props.history.push(`order/${id}`) }
        if (page == 'edit') { this.props.history.push(`order/edit/${id}`) }
    }
    deleteOrder = async (id) => {
        try {
            let data = await deleteOrder(id, this.state.accessToken);
            if (data && data.data && data.data.errCode == 0) {
                toast.success(data.data.errMessage);
                this.getAllOrderByUser();
            } else {
                toast.error(data.data.errMessage)
            }
        } catch (e) {
            toast.success('Lỗi')
        }
    }
    handleOrder = async (id, handle, statusId,) => {
        try {
            let data = [];
            if (handle == 'delete') { data = await deleteOrder(id, this.state.accessToken); }
            if (handle == 'status') {
                let statusUpdate = {}
                statusUpdate.id = id;
                statusUpdate.statusId = statusId;
                statusUpdate.staffId = this.state.staffId;
                data = await editOrder(statusUpdate, this.state.accessToken);
            }
            if (data && data.data && data.data.errCode == 0) {
                toast.success(data.data.errMessage);
                await this.getAllOrderByUser();
            } else {
                toast.error(data.data.errMessage);
            }
        } catch (e) {
            toast.error('Lỗi')
        }
    }
    render() {
        let dataOrder = this.state.dataOrder;
        return (
            <div className='px-[10px] sm:px-[30px] lg:px-[50px] space-y-[10px] '>
                <div className='flex items-center justify-between'>
                    <div className='text-[16px] sm:text-[18px] lg:text-[22px] font-[600] text-[#595959]'>
                        <label>Đơn hàng</label>
                    </div>
                    <div className='flex items-center space-x-[4px] sm:space-x-[10px] cursor-pointer text-[12px] sm:text-[18px] '>
                        <label>Sắp xếp :</label>
                        <select
                            className=' border rounded-[4px] h-[30px] sm:h-[40px] w-[100px] sm:w-[150px] pl-[4px] sm:pl-[10px]'>
                            <option value={0}>Mới nhất</option>
                            <option value={1}>Cũ nhất</option>
                            <option value={2}>A-Z</option>
                            <option value={3}>Z-A</option>
                        </select>
                    </div>
                </div>
                <div>
                    <div className='grid grid-cols-12 text-center text-white bg-[#353535] py-[5px] rounded-tl-[5px] 
                rounded-tr-[5px] text-[10px] sm:text-[12px] md:text-[14px] lg:text-[16px]'>
                        <div><span>STT</span></div>
                        <div className='col-span-2'><span>THANH TOÁN</span></div>
                        <div className='col-span-2'><span>TỔNG TIỀN</span></div>
                        <div className='col-span-2'><span>NGÀY ĐẶT</span></div>
                        <div className='col-span-2'><span>TRẠNG THÁI</span></div>
                        <div className='col-span-3'><span>HÀNH ĐỘNG</span></div>
                    </div>
                    {dataOrder && dataOrder.map((item, index) => {
                        return (
                            <div key={item.id} className='grid grid-cols-12 text-center bg-white py-[5px] border-b text-[10px] sm:text-[12px] md:text-[14px] lg:text-[16px]'>
                                <div><span>{index + 1}</span></div>
                                <div className='col-span-2'><span>{item.Payment.name}</span></div>
                                <div className='col-span-2'><span>{`${item.total}`.replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')} đ</span></div>
                                <div className='col-span-2'><span>{item.createdAt}</span></div>
                                <div className='col-span-2'><span>{item.Status.name}</span></div>
                                <div className='col-span-3 text-white space-x-[5px]'>
                                    <button onClick={() => this.onClickPage(item.id, 'view')}
                                        className='bg-[#343a40] p-[4px] rounded-[3px] hover:bg-[#eb0000]'><AiOutlineEye /></button>
                                    {(item.Status.id == 10 || item.Status.id == 8) &&
                                        <Popconfirm title="Xóa" description="Xóa đơn đặt" okText="Có"
                                            cancelText="Không" onConfirm={() => this.handleOrder(item.id, 'delete')} >
                                            <button className='bg-[#343a40] p-[4px] rounded-[3px] hover:bg-[#eb0000]'><AiOutlineDelete /></button>
                                        </Popconfirm>
                                    }
                                    {item.Status.id == 5 &&
                                        <button onClick={() => this.onClickPage(item.id, 'edit')}
                                            className='bg-[#343a40] p-[4px] rounded-[3px] hover:bg-[#eb0000]'><AiOutlineEdit /></button>
                                    }
                                    {item.Status.id == 5 &&
                                        <Popconfirm title="Hủy" description="Hủy đơn đặt" okText="Có"
                                            cancelText="Không" onConfirm={() => this.handleOrder(item.id, 'status', 10)} >
                                            <button className='bg-[#343a40] p-[4px] rounded-[3px] hover:bg-[#eb0000]'><AiFillMinusCircle /></button>
                                        </Popconfirm>
                                    }
                                    {item.Status.id == 6 &&
                                        <Popconfirm title="Hủy" description="Hủy đơn đặt" okText="Có"
                                            cancelText="Không" onConfirm={() => this.handleOrder(item.id, 'status', 9)} >
                                            <button className='bg-[#343a40] p-[4px] rounded-[3px] hover:bg-[#eb0000]'><AiFillMinusCircle /></button>
                                        </Popconfirm>
                                    }
                                    {item.Status.id == 9 &&
                                        <Popconfirm title="Hủy" description="Bỏ hủy đơn đặt" okText="Có"
                                            cancelText="Không" onConfirm={() => this.handleOrder(item.id, 'status', 5)} >
                                            <button className='bg-[#343a40] p-[4px] rounded-[3px] hover:bg-[#eb0000]'><AiFillMinusCircle /></button>
                                        </Popconfirm>
                                    }
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        )
    }
}

export default withRouter(Order);