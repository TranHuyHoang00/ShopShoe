import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { toast } from 'react-toastify';
import { AiOutlineEdit, AiOutlineDelete, AiOutlineEye, AiOutlineCheckSquare, AiOutlineCloseSquare } from "react-icons/ai";
import { getAllOrder, deleteOrder, editOrder } from '../../../../services/OrderService';
import { getAllStatus } from '../../../../services/StatusService';
import { getAllPayment } from '../../../../services/PaymentService';
import { Popconfirm } from 'antd'
class ManagerOrder extends Component {
    constructor(props) {
        super(props);
        this.state = {
            staffId: '',
            dataOrder: [],
            dataStatus: [],
            dataPayment: [],
            accessToken: '',
            isActive: '',
            dataHandle: {},
            check: { statusId: 0, paymentId: 0, filter: 1, quantity: 8, page: 0 },
        }
    }
    async componentDidMount() {
        let infor = JSON.parse(window.localStorage.getItem('staffAccount'));
        this.setState({ accessToken: infor.data.accessToken, staffId: infor.data.user.id })
        await this.getAllOrder(this.state.check, infor.data.accessToken);
        await this.getAllStatus();
        await this.getAllPayment();
    }
    getAllOrder = async (check, token) => {
        try {
            let data = await getAllOrder(check, token);
            console.log('data');
            if (data && data.data && data.data.errCode == 0) {
                this.setState({ dataOrder: data.data.data })
            } else {
                this.setState({ dataOrder: [] })
            }
        } catch (e) {
            toast.success('Lỗi')
        }
    }
    getAllStatus = async () => {
        try {
            let data = await getAllStatus();
            if (data && data.data && data.data.errCode == 0) {
                let dataRaw = data.data.data;
                let dataFilter = dataRaw.filter(obj => {
                    return obj.id == 5 || obj.id == 6 || obj.id == 7 || obj.id == 8 || obj.id == 9 || obj.id == 10
                })
                this.setState({ dataStatus: dataFilter })
            } else {
                this.setState({ dataStatus: [] })
            }
        } catch (e) {
            toast.success('Lỗi')
        }
    }
    getAllPayment = async () => {
        try {
            let data = await getAllPayment();
            if (data && data.data && data.data.errCode == 0) {
                this.setState({ dataPayment: data.data.data })
            } else {
                this.setState({ dataPayment: [] })
            }
        } catch (e) {
            toast.success('Lỗi')
        }
    }
    onChangeFilter = async (event, id) => {
        let copyState = { ...this.state.check };
        copyState[id] = event.target.value;
        await this.getAllOrder(copyState, this.state.accessToken);
        this.setState({
            check: {
                ...copyState
            }
        });
    }
    onClickPage = (id, page) => {
        if (page == 'detail') { this.props.history.push(`order/${id}`) }
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
                await this.getAllOrder(this.state.check, this.state.accessToken);
            } else {
                toast.error(data.data.errMessage);
            }
        } catch (e) {
            toast.error('Lỗi')
        }
    }
    render() {
        let dataOrder = this.state.dataOrder;
        let dataStatus = this.state.dataStatus;
        let dataPayment = this.state.dataPayment;
        return (
            <>
                <div className='text-[12px] md:text-[16px] px-[10px] md:px-[30px] space-y-[10px]'>
                    <div className='flex items-center justify-between'>
                        <button onClick={() => this.onClickPage(0, 'create')}
                            className='text-white bg-[#343a40] px-[10px] py-[4px] rounded-[4px] hover:bg-[#eb0000]'>Mới</button>
                        <div className='flex items-center space-x-[5px] sm:space-x-[20px] text-[10px] sm:text-[12px] md:text-[16px]'>
                            <div className='lg:flex items-center lg:space-x-[4px]  cursor-pointer '>
                                <div> <label>Thanh toán :</label></div>
                                <select value={this.state.check.paymentId} className='border p-[5px]'
                                    onChange={(event) => this.onChangeFilter(event, 'paymentId')} >
                                    <option value={0}>Tất cả</option>
                                    {dataPayment && dataPayment.map((item, index) => {
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
                                    {dataStatus && dataStatus.map((item, index) => {
                                        return (
                                            <option key={item.id} value={item.id}>{item.name}</option>
                                        )
                                    })}
                                </select>
                            </div>
                            <div className='lg:flex items-center lg:space-x-[4px] cursor-pointer '>
                                <div><label>Sắp xếp :</label></div>
                                <select value={this.state.check.filter} className='border p-[5px]'
                                    onChange={(event) => this.onChangeFilter(event, 'filter')}>
                                    <option value={1}>Mới nhất</option>
                                    <option value={2}>Cũ nhất</option>
                                    <option value={3}>Nhiều tiền</option>
                                    <option value={4}>Ít tiền</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <div className=' w-full pb-[20px] '>
                        <div className='bg-white w-full rounded-[10px] shadow-md'>
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
                                        <div className='col-span-3 text-white flex items-center justify-center space-x-[10px]'>
                                            <button className='bg-[#343a40] p-[4px] rounded-[3px] hover:bg-[#eb0000]'
                                                onClick={() => this.onClickPage(item.id, 'detail')}><AiOutlineEye /></button>

                                            {item.statusId == 5 &&
                                                <>
                                                    <button className='bg-[#343a40] p-[4px] rounded-[3px] hover:bg-[#eb0000]'
                                                    ><AiOutlineEdit /></button>
                                                    <Popconfirm title="Xác nhận" description=" Xác nhận đơn hàng " okText="Có"
                                                        cancelText="Không" onConfirm={() => this.handleOrder(item.id, 'status', 6)} >
                                                        <button className='bg-[#343a40] p-[4px] rounded-[3px] hover:bg-[#eb0000]'><AiOutlineCheckSquare /></button>
                                                    </Popconfirm>

                                                </>
                                            }

                                            {item.statusId == 6 &&
                                                <>
                                                    <Popconfirm title="Xác nhận" description="Đang giao đơn hàng" okText="Có"
                                                        cancelText="Không" onConfirm={() => this.handleOrder(item.id, 'status', 7)} >
                                                        <button className='bg-[#343a40] p-[4px] rounded-[3px] hover:bg-[#eb0000]'><AiOutlineCheckSquare /></button>
                                                    </Popconfirm>

                                                </>
                                            }
                                            {item.statusId == 7 &&
                                                <>
                                                    <Popconfirm title="Xác nhận" description="Đã giao đơn hàng" okText="Có"
                                                        cancelText="Không" onConfirm={() => this.handleOrder(item.id, 'status', 8)} >
                                                        <button className='bg-[#343a40] p-[4px] rounded-[3px] hover:bg-[#eb0000]'><AiOutlineCheckSquare /></button>
                                                    </Popconfirm>

                                                </>
                                            }
                                            {(item.statusId == 8 || item.statusId == 10) &&
                                                <Popconfirm title="Xóa" description=" Xóa đơn hàng " okText="Có"
                                                    cancelText="Không" onConfirm={() => this.handleOrder(item.id, 'delete')} >
                                                    <button className='bg-[#343a40] p-[4px] rounded-[3px] hover:bg-[#eb0000]'><AiOutlineDelete /></button>
                                                </Popconfirm>
                                            }
                                            {item.statusId == 9 &&
                                                <>
                                                    <Popconfirm title="Xác nhận" description="Hủy đơn hàng" okText="Có"
                                                        cancelText="Không" onConfirm={() => this.handleOrder(item.id, 'status', 10)} >
                                                        <button className='bg-[#343a40] p-[4px] rounded-[3px] hover:bg-[#eb0000]'><AiOutlineCheckSquare /></button>
                                                    </Popconfirm>
                                                    <Popconfirm title="Hủy" description="Từ chối hủy đơn hàng " okText="Có"
                                                        cancelText="Không" onConfirm={() => this.handleOrder(item.id, 'status', 6)} >
                                                        <button className='bg-[#343a40] p-[4px] rounded-[3px] hover:bg-[#eb0000]'><AiOutlineCloseSquare /></button>
                                                    </Popconfirm>
                                                </>
                                            }
                                            {(item.statusId == 5 || item.statusId == 6 || item.statusId == 7) &&
                                                <Popconfirm title="Hủy" description=" Hủy đơn hàng " okText="Có"
                                                    cancelText="Không" onConfirm={() => this.handleOrder(item.id, 'status', 10)} >
                                                    <button className='bg-[#343a40] p-[4px] rounded-[3px] hover:bg-[#eb0000]'><AiOutlineCloseSquare /></button>
                                                </Popconfirm>
                                            }
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                </div>
            </>
        );
    }

}
export default withRouter(ManagerOrder);
