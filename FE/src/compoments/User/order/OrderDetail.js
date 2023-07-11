import React from 'react';
import { withRouter } from 'react-router-dom';
import { getOneOrder } from '../../../services/OrderService';
import { getAllOrder_detailByOrder } from '../../../services/OrderDetailService';
import { toast } from 'react-toastify';
import { AiTwotonePhone, AiOutlineMail, AiOutlineCalendar, AiOutlineGitlab, AiOutlineIdcard, AiOutlineEye } from "react-icons/ai";
import { Input } from 'antd';
class OrderDetail extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            dataOrder: {},
            dataUser: {},
            dataOrderDetail: [],
        }
    }
    async componentDidMount() {
        if (this.props.match && this.props.match.params) {
            let infor = JSON.parse(window.localStorage.getItem('staffAccount'));
            let token = infor.data.accessToken;
            let id = this.props.match.params.id;
            await this.getOneOrder(id, token);
            await this.getAllOrder_detailByOrder(id, token);
        }
    }
    getOneOrder = async (id, token) => {
        try {
            let data = await getOneOrder(id, token);
            if (data && data.data && data.data.errCode == 0) {
                let dataRaw = data.data.data;
                this.setState({ dataOrder: dataRaw, dataUser: dataRaw.User_address })
            } else { this.setState({ dataOrder: {} }) }
        } catch (e) {
            toast.error('Lỗi')
        }
    }
    getAllOrder_detailByOrder = async (id, token) => {
        try {
            let data = await getAllOrder_detailByOrder(id, token);
            console.log('detail', data.data.data);
            if (data && data.data && data.data.errCode == 0) {
                this.setState({ dataOrderDetail: data.data.data })
            } else { this.setState({ dataOrderDetail: [] }) }
        } catch (e) {
            toast.error('Lỗi')
        }
    }
    onClickPage = (id) => {
        this.props.history.push(`/home/product/${id}`)
    }
    render() {
        let dataOrder = this.state.dataOrder;
        let dataUser = this.state.dataUser;
        let dataOrderDetail = this.state.dataOrderDetail;
        return (
            <div className='px-[10px] sm:px-[30px] lg:px-[50px] space-y-[10px] text-[12px] sm:text-[14px] lg:text-[16px]'>
                <div className='font-[600] text-[#595959]'>
                    <label>Chi tiết đơn hàng</label>
                </div>
                <div className='block md:grid grid-cols-4 gap-x-[10px] space-y-[10px] md:space-y-0'>
                    {/* infor customer */}
                    <div className='bg-white space-y-[10px] p-[10px] sm:p-[20px] shadow-md rounded-[5px] '>
                        <div className='flex items-center justify-center'>
                            {dataUser.User && dataUser.User.avatar ?
                                <img src={require(`../../../assets/avatars/${dataUser.User.avatar}`).default}
                                    className='h-[100px] w-[100px] sm:h-[120px] sm:w-[120px] md:h-[150px] md:w-[150px] rounded-full object-cover' />
                                :
                                <img src={require(`../../../assets/avatars/a.jpg`).default}
                                    className='h-[200px] w-[200px] rounded-full object-cover' />
                            }
                        </div>
                        <div className='text-center font-[600]'> <label>{dataUser.User && dataUser.User.name}</label></div>
                        <div><label className=' font-[500]'>Thông tin liên hệ</label></div>
                        <div className=' px-[5px] space-y-[5px]'>
                            <div className='flex items-center'>
                                <AiTwotonePhone className='text-[20px]' />
                                <Input value={dataUser.User && dataUser.User.phone} bordered={false} />
                            </div>
                            <div className='flex items-center'>
                                <AiOutlineMail className='text-[20px]' />
                                <Input value={dataUser.User && dataUser.User.email} bordered={false} />
                            </div>
                            <div className=' flex items-center'>
                                <AiOutlineIdcard className='text-[20px]' />
                                <Input value={dataUser.Address && dataUser.Address.name} bordered={false} />
                            </div>
                            <div className='flex items-center'>
                                <AiOutlineCalendar className='text-[20px]' />
                                <Input value={dataUser.User && dataUser.User.dateOfbirth} bordered={false} />

                            </div>
                            <div className='flex items-center'>
                                <AiOutlineGitlab className='text-[20px]' />
                                <Input value={dataUser.User && dataUser.User.gender == 1 ? 'Nam' : 'Nữ'} bordered={false} />
                            </div>
                        </div>
                    </div>
                    {/* infor order */}
                    <div className='col-span-3 bg-white shadow-md rounded-[5px] p-[20px] space-y-[10px]'>
                        <div className='space-x-[20px] '>
                            <label>Mã đơn : <span className='font-[500] text-[#ee2943]'>{dataOrder.id}</span></label>
                            <label>Ngày đặt : <span className='font-[500] text-[#ee2943]'>{dataOrder.createdAt}</span></label>
                            <label>Trạng thái : <span className='font-[500] text-[#ee2943]'>{dataOrder.Status && dataOrder.Status.name}</span></label>
                        </div>
                        <div className='space-x-[20px] '>
                            <label>Nhân viên : <span className='font-[500] text-[#ee2943]'>{(dataOrder.User && dataOrder.User.name) ? dataOrder.User.name : 'Unknow'}</span></label>
                            <label>Thanh toán : <span className='font-[500] text-[#ee2943]'>{dataOrder.Payment && dataOrder.Payment.name}</span></label>
                        </div>
                        <div className='text-[10px] sm:text-[12px] '>
                            <div className='grid grid-cols-12 text-center bg-[#353535] py-[4px] text-white
                       rounded-tl-[4px] rounded-tr-[4px] '>
                                <div>STT</div>
                                <div className='col-span-3'>TÊN</div>
                                <div className='col-span-3'>THÔNG SỐ</div>
                                <div>SL</div>
                                <div className='col-span-3'>GIÁ</div>
                                <div></div>
                            </div>
                            {dataOrderDetail && dataOrderDetail.map((item, index) => {
                                return (
                                    <div key={item.id} className='grid grid-cols-12 text-center py-[4px] border-b items-center'>
                                        <div>{index + 1}</div>
                                        <div className='col-span-3'>{item.Detail.Product.name}</div>
                                        <div className='col-span-3'>
                                            <div><label>Size: {item.Detail.Size.value}</label></div>
                                            <div><label>Màu : {item.Detail.Color.name}</label></div>
                                        </div>
                                        <div>{item.quantity}</div>
                                        <div className='col-span-3'>
                                            <div className='line-through italic'>
                                                <label>{`${item.Detail.price}`.replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}đ</label>
                                            </div>
                                            <div className='text-[#d0011b] font-[700]'>
                                                <label>{`${(item.Detail.price) - ((item.Detail.price * item.Detail.Product.Discount.value) / 100)}`.replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}đ</label>
                                            </div>
                                        </div>
                                        <div>
                                            <button onClick={() => this.onClickPage(item.Detail.Product.id)}
                                                className='bg-black text-white p-[4px] rounded-[4px]'><AiOutlineEye /></button>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                        <div className='space-x-[20px]'>
                            <label>Tổng tiền : </label>
                            <label><span className='font-[500] text-[#ee2943]'>{`${dataOrder.total}`.replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}đ</span></label>
                            <label>hoặc</label>
                            <label><span className='font-[500] text-[#ee2943]'>{`${(dataOrder.total / 23630).toFixed(2)}`.replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')} $</span></label>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default withRouter(OrderDetail);