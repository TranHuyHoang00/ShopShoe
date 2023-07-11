import React from 'react';
import { withRouter } from 'react-router-dom';
import { toast } from 'react-toastify';
import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";
import { createProduct, getAllOneProduct, editProduct } from '../../../../services/ProductService';
import { getAllBrand } from '../../../../services/BrandService';
import { getAllDiscount } from '../../../../services/DiscountService';
import { getAllOrigin } from '../../../../services/OriginService';
import { getAllType } from '../../../../services/TypeService';
import { getAllStatus } from '../../../../services/StatusService';
import { getAllColor } from '../../../../services/ColorService';
import { getAllSize } from '../../../../services/SizeService';
import { deleteDetail, createDetail, editDetail } from '../../../../services/DetailService';
import { Carousel } from 'antd';
class ProductEdit extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            accessToken: '',
            dataBrand: [],
            dataDiscount: [],
            dataOrigin: [],
            dataType: [],
            dataStatus: [],
            dataColor: [],
            dataSize: [],

            id: '',
            dataProduct: [],
            dataDetail: {
                id: '',
                productId: ''
            },
            page: 'create',
        }
    }
    async componentDidMount() {
        let infor = JSON.parse(window.localStorage.getItem('staffAccount'));
        this.setState({ accessToken: infor.data.accessToken })
        await this.getAllBrand();
        await this.getAllDiscount();
        await this.getAllOrigin();
        await this.getAllType();
        await this.getAllStatus();
        await this.getAllColor();
        await this.getAllSize();

        if (this.props.match && this.props.match.params) {
            let id = this.props.match.params.id;
            this.setState({ id: id, dataDetail: { productId: id } })
            await this.getAllOneProduct(id)
        }
    }
    getAllOneProduct = async (id) => {
        try {
            let data = await getAllOneProduct(id);
            if (data && data.data && data.data.errCode == 0) {
                this.setState({ dataProduct: data.data.data })
            } else {
                this.setState({ dataProduct: [] })
            }
        } catch (e) {
            toast.success('Lỗi')
        }
    }
    getAllBrand = async () => {
        try {
            let data = await getAllBrand();
            if (data && data.data && data.data.errCode == 0) {
                this.setState({ dataBrand: data.data.data })
            } else {
                this.setState({ dataBrand: [] })
            }
        } catch (e) {
            toast.success('Lỗi')
        }
    }
    getAllDiscount = async () => {
        try {
            let data = await getAllDiscount();
            if (data && data.data && data.data.errCode == 0) {
                this.setState({ dataDiscount: data.data.data })
            } else {
                this.setState({ dataDiscount: [] })
            }
        } catch (e) {
            toast.success('Lỗi')
        }
    }
    getAllOrigin = async () => {
        try {
            let data = await getAllOrigin();
            if (data && data.data && data.data.errCode == 0) {
                this.setState({ dataOrigin: data.data.data })
            } else {
                this.setState({ dataOrigin: [] })
            }
        } catch (e) {
            toast.success('Lỗi')
        }
    }
    getAllType = async () => {
        try {
            let data = await getAllType();
            if (data && data.data && data.data.errCode == 0) {
                this.setState({ dataType: data.data.data })
            } else {
                this.setState({ dataType: [] })
            }
        } catch (e) {
            toast.success('Lỗi')
        }
    }
    getAllStatus = async () => {
        try {
            let data = await getAllStatus();
            if (data && data.data && data.data.errCode == 0) {
                this.setState({ dataStatus: data.data.data })
            } else {
                this.setState({ dataStatus: [] })
            }
        } catch (e) {
            toast.success('Lỗi')
        }
    }
    getAllColor = async () => {
        try {
            let data = await getAllColor();
            if (data && data.data && data.data.errCode == 0) {
                this.setState({ dataColor: data.data.data })
            } else {
                this.setState({ dataColor: [] })
            }
        } catch (e) {
            toast.success('Lỗi')
        }
    }
    getAllSize = async () => {
        try {
            let data = await getAllSize();
            if (data && data.data && data.data.errCode == 0) {
                this.setState({ dataSize: data.data.data })
            } else {
                this.setState({ dataSize: [] })
            }
        } catch (e) {
            toast.success('Lỗi')
        }
    }

    handleOnChangeInput = (event, id) => {
        let copyState = { ...this.state.dataProduct };
        copyState[id] = event.target.value;
        this.setState({
            dataProduct: {
                ...this.state.dataProduct,
                ...copyState
            }
        });
    }
    handleProduct = async () => {
        try {
            let dataProduct = this.state.dataProduct;
            let data = await editProduct(dataProduct, this.state.accessToken);
            console.log(data);
            if (data && data.data && data.data.errCode == 0) {
                toast.success(data.data.errMessage)
                await this.getAllOneProduct(this.state.id)
                return;
            } else {
                toast.error(data.data.errMessage)
                return;
            }
        } catch (e) {
            toast.error('Lỗi')
        }
    }
    handleOnChangeInputDetail = (event, id) => {
        let copyState = { ...this.state.dataDetail };
        copyState[id] = event.target.value;
        this.setState({
            dataDetail: {
                ...this.state.dataDetail,
                ...copyState
            }
        });
    }
    handleGetDataEditDetail = (item) => {
        this.setState({
            page: 'edit',
            dataDetail: {
                id: item.id,
                productId: item.id,
                colorId: item.Color.id,
                sizeId: item.Size.id,
                price: item.price,
                quantity: item.quantity,
            }
        })
    }
    handleDetail = async (id, page) => {
        try {
            let data = [];
            if (page == 'delete') { data = await deleteDetail(id, this.state.accessToken); }
            if (page == 'create') {
                let dataDetail = this.state.dataDetail;
                if (!dataDetail.productId || !dataDetail.colorId || !dataDetail.sizeId || !dataDetail.quantity || !dataDetail.price) {
                    toast.error("Vui lòng điền đầy đủ thông tin"); return;
                }
                data = await createDetail(dataDetail, this.state.accessToken);
            }
            if (page == 'edit') { data = await editDetail(this.state.dataDetail, this.state.accessToken); }
            if (data && data.data && data.data.errCode == 0) {
                this.setState({ page: 'create' })
                toast.success(data.data.errMessage)
                await this.getAllOneProduct(this.state.id)
                return;
            } else {
                toast.error(data.data.errMessage)
                return;
            }
        } catch (e) {
            toast.error('Lỗi');
        }
    }
    onClickPage = () => {
        this.props.history.push(`/dashboard/product`)
    }
    render() {
        let dataBrand = this.state.dataBrand;
        let dataDiscount = this.state.dataDiscount;
        let dataOrigin = this.state.dataOrigin;
        let dataType = this.state.dataType;
        let dataStatus = this.state.dataStatus;
        let dataColor = this.state.dataColor;
        let dataSize = this.state.dataSize;
        let dataProduct = this.state.dataProduct;
        let dataDetail = this.state.dataDetail;
        return (
            <>
                <div className='flex items-center justify-center'>
                    <div className='space-y-[10px] bg-white p-[20px] rounded-md shadow-sm'>
                        <div className='text-center bg-[#343a40] text-white text-[20px] rounded-[4px] font-[500] py-[5px]'>
                            <h1>TẠO MỚI</h1>
                        </div>
                        <div className='flex space-x-[10px] border rounded-[5px] shadow-md p-[10px]'>
                            <div className='text-center space-y-[10px]'>
                                <Carousel className=' h-[200px] w-[200px] border'>
                                    {dataProduct && dataProduct.images && dataProduct.images.map((item, index) => {
                                        return (
                                            <div key={index} className='relative'>
                                                <div className='block'>
                                                    <img src={require(`../../../../assets/images/${item.value}`).default} className=' h-[200px] w-[200px] object-cover' />
                                                </div>
                                                <button
                                                    className='absolute top-0 left-0 px-[10px] py-[4px] bg-[#343a40] opacity-80 text-white hover:bg-[#eb0000]'
                                                >Xóa</button>
                                            </div>
                                        )
                                    })}
                                </Carousel>
                                <div className='text-[13px]'>
                                    <input id="image" type='file' hidden />
                                    <label htmlFor='image' className='px-[10px] py-[5px] bg-[#343a40] shadow-md border
                            rounded-[4px] text-white font-[500] hover:bg-[#eb0000]'
                                    >Thêm</label>
                                </div>
                            </div>
                            <div className=''>
                                <textarea value={this.state.dataProduct.description}
                                    onChange={(event) => this.handleOnChangeInput(event, 'description')}
                                    className='border w-[620px] h-[200px] pl-[10px] border-black rounded-[5px]'>
                                </textarea>
                                <div> <label className='font-[500] '>Mô tả</label></div>
                            </div>
                        </div>
                        {/* inf 2 */}
                        <div className='flex items-center justify-center space-x-[10px] border rounded-[5px] shadow-md p-[15px]'>
                            <div className='text-[16px] space-y-[5px]'>
                                <label className='font-[500] text-red-600'>Tên sản phẩm *</label><br />
                                <input value={this.state.dataProduct.name}
                                    onChange={(event) => this.handleOnChangeInput(event, 'name')}
                                    className='border border-black w-[620px] rounded-[5px] h-[40px] pl-[10px]' />
                            </div>
                            <div className='text-[16px] space-y-[5px]'>
                                <label className='font-[500] text-red-600'>Trạng thái *</label><br />
                                <select value={this.state.dataProduct.statusId}
                                    onChange={(event) => this.handleOnChangeInput(event, 'statusId')}
                                    className='border shadow-md border-[#343a40] w-[200px] rounded-[5px] h-[40px] pl-[10px]' >
                                    <option></option>
                                    {dataStatus && dataStatus.map((item, index) => {
                                        return (
                                            <option value={item.id} key={item.id}>{item.name}</option>
                                        )
                                    })}
                                </select>
                            </div>
                        </div>
                        {/* inf 3 */}
                        <div className='flex items-center justify-center space-x-[10px] border rounded-[5px] shadow-md p-[15px]'>
                            <div className='text-[16px] space-y-[5px]'>
                                <label className='font-[500] text-red-600'>Thương hiệu *</label><br />
                                <select value={this.state.dataProduct.brandId}
                                    onChange={(event) => this.handleOnChangeInput(event, 'brandId')}
                                    className='border shadow-md border-[#343a40] w-[200px] rounded-[5px] h-[40px] pl-[10px]' >
                                    <option></option>
                                    {dataBrand && dataBrand.map((item, index) => {
                                        return (
                                            <option value={item.id} key={item.id}>{item.name}</option>
                                        )
                                    })}
                                </select>
                            </div>
                            <div className='text-[16px] space-y-[5px]'>
                                <label className='font-[500]'>Khuyến mãi</label><br />
                                <select value={this.state.dataProduct.discountId}
                                    onChange={(event) => this.handleOnChangeInput(event, 'discountId')}
                                    className='border shadow-md border-[#343a40] w-[200px] rounded-[5px] h-[40px] pl-[10px]' >
                                    <option></option>
                                    {dataDiscount && dataDiscount.map((item, index) => {
                                        return (
                                            <option value={item.id} key={item.id}>{item.name}-{item.value}%</option>
                                        )
                                    })}
                                </select>
                            </div>
                            <div className='text-[16px] space-y-[5px]'>
                                <label className='font-[500] text-red-600'>Xuất xứ *</label><br />
                                <select value={this.state.dataProduct.originId}
                                    onChange={(event) => this.handleOnChangeInput(event, 'originId')}
                                    className='border shadow-md border-[#343a40] w-[200px] rounded-[5px] h-[40px] pl-[10px]' >
                                    <option></option>
                                    {dataOrigin && dataOrigin.map((item, index) => {
                                        return (
                                            <option value={item.id} key={item.id}>{item.name}</option>
                                        )
                                    })}
                                </select>
                            </div>
                            <div className='text-[16px] space-y-[5px]'>
                                <label className='font-[500] text-red-600'>Loại sản phẩm *</label><br />
                                <select value={this.state.dataProduct.typeId}
                                    onChange={(event) => this.handleOnChangeInput(event, 'typeId')}
                                    className='border shadow-md border-[#343a40] w-[200px] rounded-[5px] h-[40px] pl-[10px]' >
                                    <option></option>
                                    {dataType && dataType.map((item, index) => {
                                        return (
                                            <option value={item.id} key={item.id}>{item.name}</option>
                                        )
                                    })}
                                </select>
                            </div>
                        </div>
                        {/* inf 4 */}
                        <div className='border rounded-[5px] shadow-md p-[15px] space-y-[10px]'>
                            <div className='space-x-[10px]'>
                                <button className='px-[10px] bg-[#343a40] py-[4px] shadow-md border
                            rounded-[4px] text-white text-[16px] font-[500] hover:bg-[#eb0000]'
                                    onClick={this.state.page == 'create' ? () => this.handleDetail(null, 'create') : () => this.handleDetail(null, 'edit')}
                                >{this.state.page == 'create' ? 'Thêm' : 'Lưu'}</button>
                                <label className='text-red-500'>Vui lòng chọn chi tiết về sản phẩm ở bên dưới</label>
                            </div>
                            <div className='flex items-center justify-center space-x-[10px] '>
                                <div className='text-[16px] space-y-[5px]'>
                                    <label className='font-[500] text-red-600'>Màu sắc *</label><br />
                                    <select value={this.state.dataDetail.colorId}
                                        onChange={(event) => this.handleOnChangeInputDetail(event, 'colorId')}
                                        className='border shadow-md border-[#343a40] w-[200px] rounded-[5px] h-[40px] pl-[10px]' >
                                        <option></option>
                                        {dataColor && dataColor.map((item, index) => {
                                            return (
                                                <option value={item.id} key={item.id}>{item.name}</option>
                                            )
                                        })}
                                    </select>
                                </div>
                                <div className='text-[16px] space-y-[5px]'>
                                    <label className='font-[500] text-red-600'>Kích thước *</label><br />
                                    <select value={this.state.dataDetail.sizeId}
                                        onChange={(event) => this.handleOnChangeInputDetail(event, 'sizeId')}
                                        className='border shadow-md border-[#343a40] w-[200px] rounded-[5px] h-[40px] pl-[10px]' >
                                        <option></option>
                                        {dataSize && dataSize.map((item, index) => {
                                            return (
                                                <option value={item.id} key={item.id}>{item.value}</option>
                                            )
                                        })}
                                    </select>
                                </div>
                                <div className='text-[16px] space-y-[5px]'>
                                    <label className='font-[500] text-red-600'>Số lượng*</label><br />
                                    <input value={this.state.dataDetail.quantity}
                                        onChange={(event) => this.handleOnChangeInputDetail(event, 'quantity')}
                                        className='border border-black w-[200px] rounded-[5px] h-[40px] pl-[10px]' />
                                </div>
                                <div className='text-[16px] space-y-[5px]'>
                                    <label className='font-[500] text-red-600'>Giá *</label><br />
                                    <input value={this.state.dataDetail.price}
                                        onChange={(event) => this.handleOnChangeInputDetail(event, 'price')}
                                        className='border border-black w-[200px] rounded-[5px] h-[40px] pl-[10px]' />
                                </div>
                            </div>
                            <div>
                                {dataProduct && dataProduct.Details && dataProduct.Details.map((item, index) => {
                                    return (
                                        <div key={index} className='space-x-[20px] border p-[10px] rounded-[5px] shadow-md'>
                                            <label>Màu sắc : {item.Color.name}</label>
                                            <label>Kích thước : {item.Size.value}</label>
                                            <label>Số lượng : {item.quantity}</label>
                                            <label>Giá : {`${item.price}`.replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')} VNĐ</label>
                                            <button className='bg-[#343a40] p-[4px] rounded-[3px] hover:bg-[#eb0000] text-white'
                                                onClick={() => this.handleDetail(item.id, 'delete')}><AiOutlineDelete /></button>
                                            <button className='bg-[#343a40] p-[4px] rounded-[3px] hover:bg-[#eb0000] text-white'
                                                onClick={() => this.handleGetDataEditDetail(item)}><AiOutlineEdit /></button>
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                        <div className='flex items-center justify-between'>
                            <button className='w-[80px] my-[10px] bg-[#343a40] h-[30px] shadow-md border
                            rounded-[4px] text-white text-[16px] font-[500] hover:bg-[#eb0000]'
                                onClick={() => this.handleProduct()}
                            >LƯU</button>
                            <button className='w-[80px] my-[10px] bg-[#343a40] h-[30px] shadow-md border
                            rounded-[4px] text-white text-[16px] font-[500] hover:bg-[#eb0000]'
                                onClick={() => this.onClickPage()}
                            >THOÁT</button>
                        </div>
                    </div>
                </div>
            </>
        )
    }
}


export default withRouter(ProductEdit);