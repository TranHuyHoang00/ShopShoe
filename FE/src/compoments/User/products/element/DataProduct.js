import React from 'react';
import { toast } from 'react-toastify';
import { connect } from 'react-redux';
import * as actions from '../../../../store/actions';
import { Rate, Carousel, Result } from 'antd';
import { withRouter } from 'react-router-dom';
class DataProduct extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data_product: [],
        }
    }
    async componentDidMount() {
    }
    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.data_product !== this.props.data_product) {
            this.setState({ data_product: this.props.data_product })
        }
    }
    onClickShowDetail = (id) => {
        this.props.history.push(`product/${id}`)
    }
    render() {
        let data_product = this.state.data_product;
        return (
            <div className='bg-white rounded-[4px] shadow-md p-[5px] sm:p-[20px]'>
                {data_product.length == 0 &&
                    <Result status="warning" title="Không tìm thấy sản phẩm nào." />
                }
                <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-[10px] sm:gap-[15px] lg:gap-[20px] '>
                    {data_product && data_product.map((item, index) => {
                        return (
                            <div onClick={() => this.onClickShowDetail(item.id)}
                                key={index} className='space-y-[5px] border p-[4px] sm:p-[10px] cursor-pointer shadow-md rounded-[5px] hover:border-[#595959] 
                                text-[12px] sm:text-[14px] lg:text-[16px]'>
                                <div className='w-full h-auto relative text-white '>
                                    <Carousel autoplay>
                                        {item.images && item.images.map((item, index) => {
                                            return (
                                                <img key={item.id} src={require(`../../../../assets/images/${item.value}`).default}
                                                    className='h-[150px] sm:h-[180px] md:h-[200px] w-full object-cover block rounded-[5px]' />
                                            )
                                        })}
                                    </Carousel>
                                    <div className='absolute top-0 right-0  '>
                                        <span className='bg-[#ee2943] p-[5px] '>{item.Discount.value}%</span>
                                    </div>
                                    <div className='absolute top-0 left-0 text-[#ee2943]'>
                                        <span className=' border-[#ee2943] border-[2px] py-[2px] px-[10px] rounded-[5px] font-[500]'>{item.Status.name}</span>
                                    </div>
                                </div>
                                <div className='truncate space-y-[4px]'>
                                    <label className='font-[500]'>{item.name}</label>
                                    <div className='flex items-center justify-between font-[500] space-x-[5px] italic text-[#ee2943]'>
                                        <label className=' '>{item.Origin.name}</label>
                                        <label className=' '>{item.Brand.name}</label>
                                    </div>
                                    <div className='flex items-center space-x-[10px] '>
                                        <Rate allowHalf disabled defaultValue={2.2} className=' text-[12px] sm:text-[14px] text-[#fd4b05]' />
                                        <label className='text-[#fd4b05] font-[600]'>(2)</label>
                                    </div>
                                    <div className='flex items-center justify-center font-[600] '>
                                        <button className='border-[2px] w-full py-[4px] rounded-[5px] 
                                        bg-[#111111dc] text-white '>Xem chi tiết</button>
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div >
        )
    }
}
const mapStateToProps = state => {
    return {
        data_product: state.product.data_product,
    };
};
const mapDispatchToProps = dispatch => {
    return {
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(DataProduct));