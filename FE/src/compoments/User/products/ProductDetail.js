import React from 'react';
import { toast } from 'react-toastify';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../../../store/actions';
import { Rate, Carousel, InputNumber } from 'antd';
import { getAllOneProduct } from '../../../services/ProductService';
import { createCart } from '../../../services/CartService';
class Product extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            dataProduct: [],
            dataDicount: {},
            dataStatus: {},
            dataDetail: [],
            dataOrigin: {},
            dataBrand: {},
            dataType: {},
            dataColorFilter: [],
            dataSize: [],
            isActiveColor: '',
            isActiveSize: '',
            price: '',
            quantity: '',
            dataCart: {
                userId: null,
                quantity: 1,
                productId: null,
            },
            accessToken: '',
        }
    }
    async componentDidMount() {
        let infor = JSON.parse(window.localStorage.getItem('customerAccount'));
        if (this.props.match && this.props.match.params) {
            let id = this.props.match.params.id;
            await this.getOneProduct(id);
            if (infor && infor.data && infor.data.user) {
                this.setState({
                    dataCart: {
                        ...this.state.dataCart,
                        userId: infor.data.user.id,
                    },
                    accessToken: infor.data.accessToken
                })
            } else {
                this.setState({ dataCart: { ...this.state.dataCart } })
            }
        }
    }
    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.productId !== this.props.productId) {
            await this.getOneProduct(this.props.productId);
        }
    }
    getOneProduct = async (id) => {
        try {
            let data = await getAllOneProduct(id);
            if (data && data.data && data.data.errCode == 0) {
                // handle color
                let dataProduct = data.data.data;
                let dataColorRaw = [];
                for (const i of dataProduct.Details) {
                    dataColorRaw.push(i.Color)
                }
                const dataColorFilter = dataColorRaw.filter((obj, index) => {
                    return index === dataColorRaw.findIndex(o => obj.id === o.id);
                });
                // handle size
                let dataSize = [];
                for (const i of dataProduct.Details) {
                    if (i.Color.id == dataColorFilter[0].id) {
                        dataSize.push(i.Size)
                    }
                }
                let colorId = dataColorFilter[0].id;
                let sizeId = dataSize[0].id;
                let result = dataProduct.Details.filter(obj => {
                    return obj.Size.id === sizeId && obj.Color.id === colorId
                })
                this.setState({
                    dataProduct: dataProduct,
                    dataDicount: dataProduct.Discount,
                    dataStatus: dataProduct.Status,
                    dataDetail: dataProduct.Details,
                    dataOrigin: dataProduct.Origin,
                    dataBrand: dataProduct.Brand,
                    dataType: dataProduct.Type,
                    dataColorFilter: dataColorFilter,
                    isActiveColor: dataColorFilter[0].id,
                    dataSize: dataSize,
                    isActiveSize: dataSize[0].id,
                    price: result[0].price,
                    quantity: result[0].quantity,
                    dataCart: {
                        ...this.state.dataCart,
                        productId: dataProduct.Details[0].id
                    }
                })
            } else {
                this.setState({ dataProduct: [] })
            }
        } catch (e) {
            toast.success('Lỗi')
        }
    }
    onClickColor = (colorId) => {
        let isActiveSize = this.state.isActiveSize;
        let dataDetail = this.state.dataDetail;
        let dataSize = [];
        for (const i of dataDetail) {
            if (i.Color.id == colorId) {
                dataSize.push(i.Size)
            }
        }
        this.setState({ dataSize: dataSize, isActiveColor: colorId, })
        let color = dataDetail.filter(obj => {
            return obj.Color.id === colorId && obj.Size.id === isActiveSize
        })
        if (color.length == 0) {
            this.setState({
                dataCart: {
                    ...this.state.dataCart,
                    productId: null
                }
            })
        } else {
            this.setState({
                dataCart: {
                    ...this.state.dataCart,
                    productId: color[0].id
                }
            })
        }

    }
    onClickSize = (sizeId) => {
        let dataDetail = this.state.dataDetail;
        let colorId = this.state.isActiveColor;
        let result = dataDetail.filter(obj => {
            return obj.Size.id === sizeId && obj.Color.id === colorId
        })
        this.setState({
            price: result[0].price,
            quantity: result[0].quantity,
            isActiveSize: sizeId,
        })
        let size = dataDetail.filter(obj => {
            return obj.Color.id === colorId && obj.Size.id === sizeId
        })
        if (size.length == 0) {
            this.setState({ dataCart: { ...this.state.dataCart, productId: null } })
        } else {
            this.setState({
                dataCart: {
                    ...this.state.dataCart,
                    productId: size[0].id
                }
            })
        }
    }
    onChangeQuantity = (event) => {
        this.setState({
            dataCart: {
                ...this.state.dataCart,
                quantity: event,
            }
        })
    }
    handleAddCart = async () => {
        try {
            let dataCart = this.state.dataCart;
            if (dataCart.userId == null) {
                toast.error('Vui lòng đăng nhập')
                return;
            }
            if (dataCart.productId == null) {
                toast.error('Vui lòng chọn Size')
                return;
            }
            else {
                let data = await createCart(this.state.dataCart, this.state.accessToken);
                if (data && data.data && data.data.errCode == 0) {
                    toast.success(data.data.errMessage)
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
    render() {
        let dataProduct = this.state.dataProduct;
        let dataDicount = this.state.dataDicount;
        let dataStatus = this.state.dataStatus;
        let dataOrigin = this.state.dataOrigin;
        let dataBrand = this.state.dataBrand;
        let dataType = this.state.dataType;
        let dataColorFilter = this.state.dataColorFilter;
        let dataSize = this.state.dataSize;
        let isActiveColor = this.state.isActiveColor;
        let isActiveSize = this.state.isActiveSize;
        let price = this.state.price;
        let quantity = this.state.quantity;
        return (
            <div className='px-[10px] sm:px-[30px] lg:px-[50px] space-y-[10px]'>
                <div className='block sm:grid sm:grid-cols-2 gap-x-[30px] md:gap-x-[50px] bg-white p-[10px] sm:p-[20px] rounded-[5px] shadow-md
                '>
                    <div className='border rounded-[5px] shadow-md'>
                        <Carousel autoplay>
                            {dataProduct.images && dataProduct.images.map((item, index) => {
                                return (
                                    <img key={item.id} src={require(`../../../assets/images/${item.value}`).default}
                                        className='h-[200px] sm:h-[300px] lg:h-[500px] w-full object-cover block rounded-[5px]' />
                                )
                            })}
                        </Carousel>
                    </div>
                    <div className='text-[16px] sm:text-[20px] space-y-[5px] '>
                        <div><label className='font-[600]'>{dataProduct.name}</label></div>
                        <div><Rate allowHalf disabled defaultValue={2.2} className=' text-[#fd7d05] text-[16px]' /></div>
                        <div className='space-x-[10px] text-[12px] sm:text-[16px] text-[#d0011b]'>
                            <label >1014 lượt đánh giá</label>
                            <span>||</span>
                            <label>1014 lượt thích</label>
                        </div>
                        <div className='text-[#111111c4]'>
                            <label className='text-[14px] sm:text-[16px] md:text-[17px] font-[500]'>Khuyến mãi : <span className='text-[#d0011b] font-[400]'>{dataDicount.name} - {dataDicount.value} %</span></label>
                        </div>
                        <div className='text-[#111111c4] space-x-[10px] text-[14px] sm:text-[16px] md:text-[17px] font-[500]'>
                            <label className=''>Thương hiệu : <span className='text-[#d0011b] font-[400]'>{dataBrand.name}</span></label>
                            <span>|</span>
                            <label className=''>Xuất xử : <span className='text-[#d0011b] font-[400]'>{dataOrigin.name}</span></label>
                        </div>
                        <div className='text-[#111111c4] space-x-[10px] text-[14px] sm:text-[16px] md:text-[17px] font-[500]'>
                            <label className=''>Số lượng còn : <span className='text-[#d0011b] font-[400]'>{quantity} đôi</span></label>
                            <span>|</span>
                            <label className=''>Trạng thái : <span className='text-[#d0011b] font-[400]'>{dataStatus.name}</span></label>
                        </div>
                        <div className='space-y-[10px] sm:space-y-[14px]'>
                            <div className='space-x-[20px] text-[18px] sm:text-[20px] md:text-[22px] border-t'>
                                <label className='line-through italic'>{`${price}`.replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')} đ</label>
                                <label className='text-[#d0011b] font-[700]'>{`${(price) - ((price * dataDicount.value) / 100)}`.replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')} đ</label>
                            </div>
                            <div className='text-[14px] sm:text-[16px] flex items-center space-x-[20px]'>
                                <label>Màu</label>
                                <div className='flex items-center space-x-[10px]'>
                                    {dataColorFilter && dataColorFilter.map((item, index) => {
                                        return (
                                            <div key={item.id} onClick={() => this.onClickColor(item.id)}
                                                className={`${isActiveColor == item.id ? 'border-red-500 border-[3px] ' : 'border-black '} h-[25px] sm:h-[30px] md:h-[35px] w-[25px] sm:w-[30px] md:w-[35px] `}>
                                                <input type='color' disabled className='h-full w-full ' value={item.value} />
                                            </div>
                                        )
                                    })}
                                </div>
                            </div>
                            <div className='text-[12px] sm:text-[14px] md:text-[16px] flex items-center space-x-[10px] sm:space-x-[15px] md:space-x-[20px] py-[4px]'>
                                <label>Size</label>
                                {dataSize && dataSize.map((item, index) => {
                                    return (
                                        <div key={item.id} onClick={() => this.onClickSize(item.id)}
                                            className={`${isActiveSize == item.id ? 'border-red-500' : ''} border-[3px] rounded-[3px] px-[5px] sm:px-[7px] md:px-[10px] py-[2px]`}>
                                            <label>{item.value}</label>
                                        </div>
                                    )
                                })}
                            </div>
                            <div className='flex items-center space-x-[10px] text-[14px] sm:text-[16px] md:text-[18px]'>
                                <InputNumber onChange={(event) => this.onChangeQuantity(event)}
                                    min={1} max={10} defaultValue={1} className='w-[40px] sm:w-[60px]' />
                                <button onClick={() => this.handleAddCart()}
                                    className='border-[2px] bg-[#595959]  text-white rounded-[5px] px-[10px] py-[2px]'>Thêm vào giỏ hàng</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='bg-white rounded-[5px]'>
                    <div className='bg-[#595959] p-[5px] sm:p-[10px] md:p-[20px] text-white rounded-[5px] text-[14px] sm:text-[18px]'>
                        <button>CHI TIẾT</button>
                    </div>
                    <div className='p-[10px] sm:p-[10px] md:p-[20px] text-[14px] sm:text-[18px] sm:space-y-[10px] space-y-[4px]'>
                        <div><label className='font-[600]'>MÔ TẢ SẢN PHẨM : {dataProduct.name}</label></div>
                        <div className='px-[20px] text-[12px] sm:text-[16px]'>
                            <label>{dataProduct.description}</label>
                        </div>
                        <div><label className='font-[600]'>CHI TIẾT SẢN PHẨM</label></div>
                        <div className='px-[20px] text-[12px] sm:text-[16px]'>
                            <label>* Xuất xứ : {dataOrigin.name}</label><br />
                            <label>* Thương hiệu : {dataBrand.name}</label><br />
                            <label>* Kiểu : {dataType.name}</label><br />
                            <label className='space-x-[10px]'>* Màu sắc :</label><br />
                            <div className='px-[20px]'>
                                {dataColorFilter && dataColorFilter.map((item, index) => {
                                    return (
                                        <div>+ {item.name}</div>
                                    )
                                })}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
const mapStateToProps = state => {
    return {
        productId: state.product.productId,
    };
};
const mapDispatchToProps = dispatch => {
    return {
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Product));