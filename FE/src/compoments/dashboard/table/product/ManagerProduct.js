import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { toast } from 'react-toastify';
import { AiOutlineEye, AiOutlineEdit, AiOutlineDelete } from "react-icons/ai";
import { getAllProduct, deleteProduct } from '../../../../services/ProductService';
import { Carousel } from 'antd';
class ManagerProduct extends Component {
    constructor(props) {
        super(props);
        this.state = {
            onClick: '',
            dataProduct: [],
            textSearch: '',
            dataEdit: {},
            accessToken: '',
        }
    }
    async componentDidMount() {
        let infor = JSON.parse(window.localStorage.getItem('staffAccount'));
        this.setState({ accessToken: infor.data.accessToken })
        await this.getAllProduct();
    }
    getAllProduct = async () => {
        try {
            let data = await getAllProduct({ type: 0, filter: 1, quantity: 8, page: 0 });
            if (data && data.data && data.data.errCode == 0) {
                this.setState({ dataProduct: data.data.data })
            } else {
                this.setState({ dataProduct: [] })
            }
        } catch (e) {
            toast.error('Lỗi')
        }
    }
    handleDeleteProduct = async (id) => {
        try {
            let data = await deleteProduct(id, this.state.accessToken);
            if (data && data.data && data.data.errCode == 0) {
                toast.success(data.data.errMessage);
                this.getAllProduct();
            } else {
                toast.error(data.data.errMessage)
            }
        } catch (e) {
            toast.success('Lỗi')
        }
    }
    onClickPage = (id, page) => {
        if (page == 'create') { this.props.history.push(`product/${page}`) }
        if (page == 'detail') { this.props.history.push(`/home/product/${id}`) }
        if (page == 'edit') { this.props.history.push(`product/${page}/${id}`) }

    }
    render() {
        let dataProduct = this.state.dataProduct;
        return (
            <>
                <div className='text-[12px] md:text-[16px] px-[10px] md:px-[30px] space-y-[10px]'>
                    <button onClick={() => this.onClickPage(null, 'create')}
                        className='text-white bg-[#343a40] px-[10px] py-[4px] rounded-[4px] hover:bg-[#eb0000]'>Mới</button>
                    <div className=' w-full pb-[20px] '>
                        <div className='bg-white w-full rounded-[10px] shadow-md'>
                            <div className='grid grid-cols-12 text-center font-[500] py-[5px] bg-[#343a40] text-white rounded-t-[10px]'>
                                <div><span>STT</span></div>
                                <div className='col-span-2'><span>ẢNH</span></div>
                                <div className='col-span-4'><span>TÊN</span></div>
                                <div className='col-span-2'><span>TRẠNG THÁI</span></div>
                                <div className='col-span-3'><span>HÀNH ĐỘNG</span></div>
                            </div>
                            {dataProduct && dataProduct.map((item, index) => {
                                return (
                                    <div key={item.id} className='grid grid-cols-12 py-[4px] text-center items-center border-b-[1px] font-[450]'>
                                        <div><span>{index + 1}</span></div>
                                        <div className='col-span-2'>
                                            <Carousel className='block' autoplay>
                                                {item.images && item.images.map((item, index) => {
                                                    return (
                                                        <img key={index} src={require(`../../../../assets/images/${item.value}`).default}
                                                            className='h-[150px] w-[150px] object-cover rounded-[5px]' />
                                                    )
                                                })}
                                            </Carousel>
                                        </div>
                                        <div className='col-span-4'><span>{item.name}</span></div>
                                        <div className='col-span-2'><span>{item.Status.name}</span></div>
                                        <div className='col-span-3 text-white flex items-center justify-center space-x-[10px] text-[16px]'>
                                            <button onClick={() => this.onClickPage(item.id, 'detail')}
                                                className='bg-[#343a40] p-[4px] rounded-[3px] hover:bg-[#eb0000]'><AiOutlineEye /></button>
                                            <button className='bg-[#343a40] p-[4px] rounded-[3px] hover:bg-[#eb0000]'
                                                onClick={() => this.onClickPage(item.id, 'edit')}><AiOutlineEdit /></button>
                                            <button className='bg-[#343a40] p-[4px] rounded-[3px] hover:bg-[#eb0000]'
                                                onClick={() => this.handleDeleteProduct(item.id)}><AiOutlineDelete /></button>
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
export default withRouter(ManagerProduct);
