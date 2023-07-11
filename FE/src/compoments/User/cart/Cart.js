import React from 'react';
import { toast } from 'react-toastify';
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { AiOutlineEye, AiOutlineDelete, } from "react-icons/ai";
import { Carousel, InputNumber, Modal, Select, Result, Button } from 'antd';
import { getAllCartByUser, deleteCart } from '../../../services/CartService';
import { getAllPayment } from '../../../services/PaymentService';
import { getOneUser } from '../../../services/UserService';
import { withRouter } from 'react-router-dom';
import { createOrder } from '../../../services/OrderService';
class Cart extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            dataCart: [],
            listPayment: [],
            dataUser: {},
            accessToken: '',
            isOpenCheckout: false,
            dataPayment: {
                dataPrice: [],
                total: 0,
                customerId: null,
                paymentId: null,
                statusId: 5,
            },
            totalUSD: 0,
        }
    }
    async componentDidMount() {
        let infor = JSON.parse(window.localStorage.getItem('customerAccount'));
        this.setState({ accessToken: infor.data.accessToken })
        await this.getAllCartByUser();
        await this.getAllPayment();
        await this.getOneUser(infor.data.user.id);
    }
    getOneUser = async (id) => {
        try {
            let data = await getOneUser(id);
            if (data && data.data && data.data.errCode == 0) {
                this.setState({
                    ...this.state,
                    dataUser: data.data.data,
                })
            } else {
                this.setState({ ...this.state, dataUser: {} })
            }
        } catch (e) {
            toast.success('Lỗi')
        }
    }
    getAllCartByUser = async () => {
        try {
            let infor = JSON.parse(window.localStorage.getItem('customerAccount'));
            let data = await getAllCartByUser(infor.data.user.id, infor.data.accessToken);
            if (data && data.data && data.data.errCode == 0) {
                let dataRaw = data.data.data;
                dataRaw.reverse();
                let dataPrice = [];
                for (const i of dataRaw) {
                    let obj = { id: i.id, productId: i.Detail.id, quantity: i.quantity, price: '' }
                    let price = (i.Detail.price) - (((i.Detail.price) * (i.Detail.Product.Discount.value)) / 100);
                    obj.price = price;
                    dataPrice.push(obj);
                }
                let total = 0
                for (const i of dataPrice) {
                    total = total + (i.price * i.quantity);
                }
                this.setState({
                    dataCart: dataRaw,
                    dataPayment: {
                        ...this.state.dataPayment,
                        dataPrice: dataPrice,
                        total: total
                    }
                })
            } else {
                this.setState({ dataCart: [], dataPrice: [] })
            }
        } catch (e) {
            toast.success('Lỗi')
        }
    }
    getAllPayment = async () => {
        try {
            let data = await getAllPayment();
            if (data && data.data && data.data.errCode == 0) {
                this.setState({
                    ...this.state,
                    listPayment: data.data.data
                })
            } else {
                this.setState({ ...this.state, listPayment: [] })
            }
        } catch (e) {
            toast.success('Lỗi')
        }
    }
    onClickDeleteCart = async (id) => {
        try {
            let data = await deleteCart(id, this.state.accessToken);
            if (data && data.data && data.data.errCode == 0) {
                this.getAllCartByUser();
                toast.success(data.data.errMessage);
            } else {
                toast.error(data.data.errMessage)
            }
        } catch (e) {
            toast.success('Lỗi')
        }
    }
    onClickPage = (id) => { this.props.history.push(`product/${id}`) }
    onClickCloseCheckout = () => { this.setState({ isOpenCheckout: false }) }
    onClickOpenCheckout = () => { this.setState({ isOpenCheckout: true }) }
    onChangePayment = (event) => {
        let listPayment = this.state.listPayment;
        let result = listPayment.filter(obj => {
            return obj.id === event
        })
        let total = this.state.dataPayment.total;
        this.setState({
            dataPayment: {
                ...this.state.dataPayment,
                paymentId: event,
            },
            totalUSD: (((total * result[0].value) / 100) / 23630).toFixed(2),
        })
    }
    onChangeAddress = (event) => {
        this.setState({
            dataPayment: {
                ...this.state.dataPayment,
                customerId: event,
            }
        })
    }
    handleCreateOder = async () => {
        try {
            let dataPayment = this.state.dataPayment;
            if (dataPayment.total == 0) {
                toast.error("Không có sản phẩm ")
                return;
            }
            if (dataPayment.paymentId == '' || dataPayment.customerId == '') {
                toast.error("Vui lòng chọn phương thức thanh toán và địa chỉ")
                return;
            } else {
                let data = await createOrder(this.state.dataPayment, this.state.accessToken);
                console.log('create', data);
                if (data && data.data && data.data.errCode == 0) {
                    toast.success(data.data.errMessage)
                    for (const i of dataPayment.dataPrice) {
                        this.onClickDeleteCart(i.id)
                    }
                    this.getAllCartByUser()
                    this.setState({ isOpenCheckout: false })
                    return;
                } else {
                    toast.error(data.data.errMessage)
                    return;
                }
            }
        } catch (e) {
            toast.error('Lỗi')
        }
    }
    onClickPageInfo = () => {
        this.props.history.push(`/home/user`)
    }
    render() {
        let dataCart = this.state.dataCart;
        let dataPrice = this.state.dataPayment.dataPrice;
        let listPayment = this.state.listPayment;
        let dataAddress = this.state.dataUser.addresses;
        let paymentId = this.state.dataPayment.paymentId;
        let customerId = this.state.dataPayment.customerId;
        return (
            <div className='px-[10px] sm:px-[30px] lg:px-[50px] space-y-[10px] '>
                <div className='flex items-center justify-between'>
                    <div className='text-[16px] sm:text-[18px] lg:text-[22px] font-[600] text-[#595959]'>
                        <label>Giỏ hàng</label>
                    </div>

                    <div className='flex items-center space-x-[10px] sm:space-x-[30px]'>
                        <Button onClick={() => this.onClickOpenCheckout()}
                            type='primary' className='bg-black'>Thanh toán</Button>
                        {/* Checkout */}
                        <Modal width={500} onCancel={() => this.onClickCloseCheckout()}
                            onOk={() => this.onClickCloseCheckout()}
                            title="Thanh toán" open={this.state.isOpenCheckout}>
                            <div className='space-y-[10px]'>
                                <div className='border-b text-[16px] font-[500]'> <label >Sản phẩm</label></div>
                                {dataPrice && dataPrice.map((item, index) => {
                                    return (
                                        <div key={item.id} className='border-b flex items-center justify-between py-[5px]
                                         text-[16px]'>
                                            <label >x{item.quantity}</label>
                                            <label className='text-[#595959] font-[600]'>{`${(item.price * item.quantity)}`.replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')} đ</label>
                                        </div>
                                    )
                                })}
                                <div className='border-b text-[16px] font-[500] flex items-center justify-between py-[5px]'>
                                    <label >Tổng VND</label>
                                    <label className='text-[#e63f3f] font-[700]'>{`${this.state.dataPayment.total}`.replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')} đ</label>
                                </div>
                                <div className='border-b text-[16px] font-[500] flex items-center justify-between py-[5px]'>
                                    <label >Total USD</label>
                                    <label className='text-[#e63f3f] font-[700]'>{`${(this.state.dataPayment.total / 23630).toFixed(2)}`.replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')} $</label>
                                </div>
                                <div>
                                    <Select onChange={(event) => this.onChangePayment(event)}
                                        placeholder="Phương thức thanh toán" className='w-full'
                                        options={listPayment.map((item) => ({
                                            label: item.name,
                                            value: item.id,
                                        }))}></Select>
                                </div>
                                <div className='flex space-x-[5px]'>
                                    <Select onChange={(event) => this.onChangeAddress(event)}
                                        placeholder="Địa chỉ" className='truncate'
                                        options={dataAddress && dataAddress.map((item) => ({
                                            label: item.name,
                                            value: item.id,
                                        }))}></Select>
                                    <Button onClick={() => this.onClickPageInfo()} type="primary" className='bg-black'>Thêm địa chỉ</Button>
                                </div>
                                {paymentId !== 1 && customerId !== null &&
                                    <PayPalScriptProvider options={{ "client-id": "AcVdZ1J3nMVpwMZFx2ZVpVKsDN8Mrjd5LaALgNu8RbYhOlqUBXTisZR8SHmGS_ynmZk1W20reObC1NWP" }}>
                                        <PayPalButtons
                                            createOrder={(data, actions) => {
                                                return actions.order.create({
                                                    purchase_units: [
                                                        {
                                                            amount: {
                                                                value: this.state.totalUSD,
                                                            },
                                                        },
                                                    ],
                                                });
                                            }}
                                            onApprove={(data, actions) => {
                                                return actions.order.capture().then((details) => {
                                                    toast.success('Thanh toán thành công');
                                                    this.handleCreateOder()
                                                });
                                            }}
                                        />
                                    </PayPalScriptProvider>
                                }
                                {paymentId == 1 && customerId !== null &&
                                    <Button onClick={() => this.handleCreateOder()}
                                        type="primary" className='bg-black'>Xác nhận</Button>
                                }

                            </div>

                        </Modal>
                        <div className='flex items-center space-x-[4px] sm:space-x-[10px] cursor-pointer text-[12px] sm:text-[18px] '>
                            <label>Sắp xếp :</label>
                            <select
                                className=' border rounded-[4px] h-[30px] sm:h-[40px] w-[100px] sm:w-[150px] pl-[4px] sm:pl-[10px]'>
                                <option value={1}>Mới nhất</option>
                                <option value={2}>Cũ nhất</option>
                                <option value={3}>A-Z</option>
                                <option value={4}>Z-A</option>
                            </select>
                        </div>
                    </div>
                </div>
                <div className='space-y-[10px]'>
                    {dataCart.length == 0 &&
                        <Result status="warning" title="Không tìm thấy sản phẩm nào." />
                    }
                    {dataCart && dataCart.map((item, index) => {
                        return (
                            <div key={item.id} className='bg-white grid grid-cols-3 md:grid-cols-5 lg:grid-cols-6 rounded-[5px] shadow-md p-[10px] gap-x-[10px] lg:gap-x-[20px] '>
                                <div className='border rounded-[5px] shadow-md'>
                                    <Carousel autoplay>
                                        {item.Detail && item.Detail.Product && item.Detail.Product.images && item.Detail.Product.images.map((item, index) => {
                                            return (
                                                <img key={item.id}
                                                    src={require(`../../../assets/images/${item.value}`).default}
                                                    className='h-[120px] sm:h-[140px] md:h-[150px] lg:h-[180px] w-auto object-cover rounded-[5px]' />
                                            )
                                        })}
                                    </Carousel>
                                </div>
                                <div className=' lg:col-span-2 lg:space-y-[5px] text-[10px] sm:text-[12px] md:text-[16px] lg:text-[18px]'>
                                    <div className='text-[12px] sm:text-[14px] md:text-[18px] lg:text-[20px] font-[500]'><label>{item.Detail.Product.name}</label></div>
                                    <div className=''><label>Size : {item.Detail.Size.value}</label></div>
                                    <div className='flex items-center space-x-[10px]'>
                                        <label>Màu sắc :</label>
                                        <input disabled type='color' value={item.Detail.Color.value}
                                            className='h-[20px] w-[20px] sm:w-[30px] sm:h-[30px] border' />
                                    </div>
                                    <div className='md:hidden flex items-center '>
                                        <InputNumber min={1} max={10} defaultValue={item.quantity} className='w-[50px]' />
                                    </div>

                                </div>
                                <div className='hidden md:flex items-center justify-center'>
                                    <InputNumber min={1} max={10} defaultValue={item.quantity} className='w-[40px] sm:w-[50px]' />
                                </div>
                                <div className='flex items-center justify-center'>
                                    <div className='text-[14px] sm:text-[16px] md:text-[18px] lg:text-[20px] space-y-[4px]'>
                                        <div><label className='line-through italic font-[600]'>{`${item.Detail.price}`.replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')} đ</label></div>
                                        <div><label className='text-[#d0011b] font-[700]'>{`${(item.Detail.price) - (((item.Detail.price) * (item.Detail.Product.Discount.value)) / 100)}`.replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')} đ</label></div>
                                        <div className='md:hidden sm:flex items-center justify-center space-x-[10px] text-[12px] sm:text-[16px] text-white '>
                                            <button onClick={() => this.onClickPage(item.Detail.Product.id)}
                                                className='bg-[#343a40] p-[4px] rounded-[3px] hover:bg-[#eb0000]'><AiOutlineEye /></button>
                                            <button onClick={() => this.onClickDeleteCart(item.id)}
                                                className='bg-[#343a40] p-[4px] rounded-[3px] hover:bg-[#eb0000]'><AiOutlineDelete /></button>
                                        </div>
                                    </div>

                                </div>
                                <div className='hidden md:flex items-center justify-center space-x-[10px] text-[16px] text-white '>
                                    <button onClick={() => this.onClickPage(item.Detail.Product.id)}
                                        className='bg-[#343a40] p-[4px] rounded-[3px] hover:bg-[#eb0000]'><AiOutlineEye /></button>
                                    <button onClick={() => this.onClickDeleteCart(item.id)}
                                        className='bg-[#343a40] p-[4px] rounded-[3px] hover:bg-[#eb0000]'><AiOutlineDelete /></button>
                                </div>
                            </div>
                        )
                    })}

                </div>
            </div>
        )
    }
}

export default (withRouter(Cart));