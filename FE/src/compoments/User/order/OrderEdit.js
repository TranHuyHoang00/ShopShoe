import React from 'react';
import { withRouter } from 'react-router-dom';
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { getOneOrder, editOrder } from '../../../services/OrderService';
import { getAllOrder_detailByOrder } from '../../../services/OrderDetailService';
import { getOneUser } from '../../../services/UserService';
import { getAllPayment } from '../../../services/PaymentService';
import { toast } from 'react-toastify';
import {
    AiTwotonePhone, AiOutlineMail, AiOutlineCalendar, AiOutlineGitlab, AiOutlineIdcard, AiOutlineEye
    , AiOutlineEdit
} from "react-icons/ai";
import { Input, Button, Modal, Select } from 'antd';
class OrderEdit extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            dataPayment: [],
            dataOrder: {},
            dataUser: {},
            dataOrderDetail: [],
            isActive: '',
            dataAddress: [],
            dataEditOrder: {
                id: '',
            },
            accessToken: '',
            id: '',
            total: '',
        }
    }
    async componentDidMount() {
        if (this.props.match && this.props.match.params) {
            let infor = JSON.parse(window.localStorage.getItem('staffAccount'));
            let token = infor.data.accessToken;
            let id = this.props.match.params.id;
            this.setState({
                accessToken: infor.data.accessToken,
                id: id
            })
            await this.getOneOrder(id, token);
            await this.getAllOrder_detailByOrder(id, token);
            await this.getOneUser(infor.data.user.id);
            await this.getAllPayment();
        }
    }
    getOneUser = async (id) => {
        try {
            let data = await getOneUser(id);
            let dataUser = data.data.data;
            if (data && data.data && data.data.errCode == 0) {
                this.setState({
                    dataAddress: dataUser.addresses,
                })
            } else {
                this.setState({ dataUser: {} })
            }
        } catch (e) {
            toast.success('Lỗi')
        }
    }
    getOneOrder = async (id, token) => {
        try {
            let data = await getOneOrder(id, token);
            if (data && data.data && data.data.errCode == 0) {
                let dataRaw = data.data.data;
                this.setState({
                    dataOrder: dataRaw, dataUser: dataRaw.User_address, dataEditOrder: { id: dataRaw.id },
                    total: (dataRaw.total / 23600).toFixed(2)
                })
            } else { this.setState({ dataOrder: {} }) }
        } catch (e) {
            toast.error('Lỗi')
        }
    }
    getAllOrder_detailByOrder = async (id, token) => {
        try {
            let data = await getAllOrder_detailByOrder(id, token);
            if (data && data.data && data.data.errCode == 0) {
                this.setState({ dataOrderDetail: data.data.data })
            } else { this.setState({ dataOrderDetail: [] }) }
        } catch (e) {
            toast.error('Lỗi')
        }
    }
    getAllPayment = async () => {
        try {
            let data = await getAllPayment();
            if (data && data.data && data.data.errCode == 0) {
                this.setState({
                    dataPayment: data.data.data
                })
            } else {
                this.setState({ dataPayment: [] })
            }
        } catch (e) {
            toast.success('Lỗi')
        }
    }
    onClickPage = (id, page) => {
        if (page == 'productDetail') { this.props.history.push(`/home/product/${id}`) }
        if (page == 'inforUser') { this.props.history.push(`/home/user`) }
    }
    onClickClose = () => { this.setState({ isActive: '' }) }
    onClickOpen = (input) => { this.setState({ isActive: input }) }
    handleOnChangeInput = (event, id) => {
        let total = this.state.total
        if (id == 'paymentId' && event.value == 2) { this.setState({ total: (total * 10) / 100 }) }
        if (id == 'paymentId' && event.value == 3) { this.setState({ total: (total * 50) / 100 }) }
        let copyState = { ...this.state.dataEditOrder };
        copyState[id] = event.value;
        this.setState({
            dataEditOrder: {
                ...copyState
            }
        });
    }
    handleEditOrder = async () => {
        try {
            let dataEditOrder = this.state.dataEditOrder;
            let data = await editOrder(dataEditOrder, this.state.accessToken)
            if (data && data.data && data.data.errCode == 0) {
                toast.success(data.data.errMessage)
                await this.getOneOrder(this.state.id, this.state.accessToken);
                this.onClickClose()
                return;
            } else {
                toast.error(data.data.errMessage)
                return;
            }
        } catch (e) {
            toast.error('Lỗi')
        }
    }
    render() {
        let dataOrder = this.state.dataOrder;
        let dataUser = this.state.dataUser;
        let dataOrderDetail = this.state.dataOrderDetail;
        let dataAddress = this.state.dataAddress;
        let dataPayment = this.state.dataPayment;
        return (
            <>
                <div className='px-[10px] sm:px-[30px] lg:px-[50px] space-y-[10px] '>
                    <div className='text-[16px] sm:text-[18px] lg:text-[22px] font-[600] text-[#595959]'>
                        <label>Chỉnh sửa đơn hàng</label>
                    </div>
                    <div className='block md:grid grid-cols-4 gap-x-[10px] space-y-[10px] md:space-y-0'>
                        {/* infor customer */}
                        <div className='bg-white space-y-[10px] p-[10px] sm:p-[20px] shadow-md rounded-[5px] text-[12px] sm:text-[14px]
                    lg:text-[16px]'>
                            <div className='flex items-center justify-center'>
                                {dataUser.User && dataUser.User.avatar ?
                                    <img src={require(`../../../assets/avatars/${dataUser.User.avatar}`).default}
                                        className='h-[100px] w-[100px] sm:h-[120px] sm:w-[120px] md:h-[150px] md:w-[150px] rounded-full object-cover' />
                                    :
                                    <img src={require(`../../../assets/avatars/a.jpg`).default}
                                        className='h-[200px] w-[200px] rounded-full object-cover' />
                                }
                            </div>
                            <div className='text-center text-[14px] sm:text-[16px] lg:text-[18px] font-[600]'> <label>{dataUser.User && dataUser.User.name}</label></div>
                            <div><label className=' font-[500]'>Thông tin liên hệ</label></div>
                            <div className=' px-[5px] space-y-[5px]'>
                                <div className='flex items-center'>
                                    <AiTwotonePhone className='text-[22px]' />
                                    <Input value={dataUser.User && dataUser.User.phone} bordered={false} />
                                </div>
                                <div className='flex items-center'>
                                    <AiOutlineMail className='text-[22px]' />
                                    <Input value={dataUser.User && dataUser.User.email} bordered={false} />
                                </div>
                                <div className=' flex items-center'>
                                    <AiOutlineIdcard className='text-[22px]' />
                                    <Input value={dataUser.Address && dataUser.Address.name} bordered={false} />
                                    <button onClick={() => this.onClickOpen('address')}
                                        className='bg-black text-white p-[2px] rounded-[4px]'><AiOutlineEdit /></button>
                                </div>
                                <div className='flex items-center'>
                                    <AiOutlineCalendar className='text-[22px]' />
                                    <Input value={dataUser.User && dataUser.User.dateOfbirth} bordered={false} />

                                </div>
                                <div className='flex items-center'>
                                    <AiOutlineGitlab className='text-[22px]' />
                                    <Input value={dataUser.User && dataUser.User.gender == 1 ? 'Nam' : 'Nữ'} bordered={false} />
                                </div>
                            </div>
                        </div>
                        {/* infor order */}
                        <div className='col-span-3 bg-white shadow-md rounded-[5px] p-[20px] space-y-[10px] text-[12px] sm:text-[14px] lg:text-[16px]'>
                            <div className='space-x-[20px] '>
                                <label>Mã đơn : <span className='font-[500] text-[#ee2943]'>{dataOrder.id}</span></label>
                                <label>Ngày đặt : <span className='font-[500] text-[#ee2943]'>{dataOrder.createdAt}</span></label>
                                <label>Trạng thái : <span className='font-[500] text-[#ee2943]'>{dataOrder.Status && dataOrder.Status.name}</span></label>
                            </div>
                            <div className='space-x-[20px] flex '>
                                <label>Nhân viên : <span className='font-[500] text-[#ee2943]'>{(dataOrder.User && dataOrder.User.name) ? dataOrder.User.name : 'Unknow'}</span></label>
                                <div className='space-x-[5px]'>
                                    <label>Thanh toán : <span className='font-[500] text-[#ee2943]'>{dataOrder.Payment && dataOrder.Payment.name}</span></label>
                                    <button onClick={() => this.onClickOpen('payment')}
                                        className='bg-black text-white p-[2px] rounded-[4px]'><AiOutlineEdit /></button>
                                </div>
                            </div>
                            <div className='text-[10px] sm:text-[14px] '>
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
                                                <button onClick={() => this.onClickPage(item.Detail.Product.id, 'productDetail')}
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
                <Modal title="Đổi địa chỉ" open={this.state.isActive == 'address' ? true : false}
                    onCancel={() => this.onClickClose()} onOk={() => this.handleEditOrder()}>
                    <div className='space-y-[10px]'>
                        <Select labelInValue className='w-full'
                            onChange={(event) => this.handleOnChangeInput(event, 'customerId')}
                            options={dataAddress.map((item) => ({
                                value: item.id,
                                label: item.name,
                            }))}
                        />
                        <Button onClick={() => this.onClickPage(0, 'inforUser')} type="primary" className='bg-black'>Thêm địa chỉ</Button>
                    </div>
                </Modal>
                <Modal title="Đổi thanh toán" open={this.state.isActive == 'payment' ? true : false}
                    onCancel={() => this.onClickClose()}
                    onOk={this.state.dataEditOrder.paymentId == 1 ? () => this.handleEditOrder() : ''}>
                    <div className='space-y-[5px]'>
                        <Select labelInValue className='w-full'
                            onChange={(event) => this.handleOnChangeInput(event, 'paymentId')}
                            options={dataPayment.map((item) => ({
                                value: item.id,
                                label: item.name,
                            }))}
                        />
                        {this.state.dataEditOrder.paymentId !== 1 && this.state.dataEditOrder.paymentId &&
                            < PayPalScriptProvider options={{ "client-id": "AcVdZ1J3nMVpwMZFx2ZVpVKsDN8Mrjd5LaALgNu8RbYhOlqUBXTisZR8SHmGS_ynmZk1W20reObC1NWP" }}>
                                <PayPalButtons
                                    createOrder={(data, actions) => {
                                        return actions.order.create({
                                            purchase_units: [
                                                {
                                                    amount: {
                                                        value: this.state.total,
                                                    },
                                                },
                                            ],
                                        });
                                    }}
                                    onApprove={(data, actions) => {
                                        return actions.order.capture().then((details) => {
                                            toast.success('Thanh toán thành công');
                                            this.handleEditOrder()
                                        });
                                    }}
                                />
                            </PayPalScriptProvider>
                        }
                    </div>
                </Modal >
            </>
        )
    }
}

export default withRouter(OrderEdit);