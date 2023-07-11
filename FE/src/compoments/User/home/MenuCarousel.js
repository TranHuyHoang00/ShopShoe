import React from 'react';
import { toast } from 'react-toastify';
import { withRouter } from 'react-router-dom';
import Carousel from "react-multi-carousel";
import { Rate } from 'antd';
import "react-multi-carousel/lib/styles.css";
import { getAllProduct } from '../../../services/ProductService';
class MenuCarousel extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            dataNew: [],
            dataNewUpdate: [],
        }
    }
    async componentDidMount() {
        let dataNew = await this.getAllProduct({ typeId: 0, filter: 1, quantity: 10, page: 0 });
        let dataNewUpdate = await this.getAllProduct({ typeId: 0, filter: 5, quantity: 10, page: 0 });
        this.setState({
            dataNew: dataNew,
            dataNewUpdate: dataNewUpdate,
        })
    }
    getAllProduct = async (filter) => {
        try {
            let data = await getAllProduct(filter);
            if (data && data.data && data.data.errCode == 0) {
                return data.data.data
            } else {
                return []
            }
        } catch (e) {
            toast.error('Lỗi')
        }
    }
    onClickPage = (id) => {
        this.props.history.push(`/home/product/${id}`)
    }
    render() {
        const responsive = {
            desktop0: { breakpoint: { max: 3000, min: 1280 }, items: 5, slidesToSlide: 5 },
            desktop1: { breakpoint: { max: 1280, min: 1024 }, items: 4, slidesToSlide: 4 },
            tablet: { breakpoint: { max: 1024, min: 640 }, items: 3, slidesToSlide: 3 },
            mobile: { breakpoint: { max: 640, min: 300 }, items: 2, slidesToSlide: 2 }
        };
        let dataNew = this.state.dataNew;
        let dataNewUpdate = this.state.dataNewUpdate;
        return (
            <>
                <div className='bg-white py-[10px] px-[10px] sm:px-[30px] lg:px-[40px] shadow-md rounded-[5px]'>
                    <div className='text-[14px] sm:text-[16px] md:text-[18px] lg:text-[22px] font-[700]'>
                        <label>MỚI NHẤT</label>
                    </div>
                    <Carousel responsive={responsive} autoPlay={true} swipeable={true} draggable={true} showDots={true}
                        infinite={true} partialVisible={false} dotListClass="custom-dot-list-style">
                        {dataNew && dataNew.map((item, index) => {
                            return (
                                <div key={item.id} onClick={() => this.onClickPage(item.id)}
                                    className="slider p-[5px] border m-[10px] space-y-[10px] shadow-md rounded-[5px]
                            text-[12px] sm:text-[14px] lg:text-[16px] cursor-pointer hover:border-[#595959]" >
                                    <div className='relative text-white '>
                                        {item.images && item.images[0] && item.images[0].value &&
                                            <img src={require(`../../../assets/images/${item.images[0].value}`).default} alt="movie"
                                                className='h-[150px] sm:h-[180px] md:h-[200px] w-full block rounded-[5px]' />
                                        }
                                        <div className='absolute top-0 right-0  '>
                                            <span className='bg-[#ee2943] p-[5px] '>{item.Discount.value}%</span>
                                        </div>
                                        <div className='absolute top-0 left-0 '>
                                            <span className='bg-[#111111dc] py-[5px] px-[10px]  font-[600]'>NEW</span>
                                        </div>
                                        <div className='absolute bottom-0 left-0 text-[#ee2943]'>
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
                            );
                        })}
                    </Carousel>
                </div>
                <div className='bg-white py-[10px] px-[10px] sm:px-[30px] lg:px-[40px] shadow-md rounded-[5px]'>
                    <div className='text-[14px] sm:text-[16px] md:text-[18px] lg:text-[22px] font-[700]'>
                        <label>MỚI CẬP NHẬP</label>
                    </div>
                    <Carousel responsive={responsive} autoPlay={true} swipeable={true} draggable={true} showDots={true}
                        infinite={true} partialVisible={false} dotListClass="custom-dot-list-style">
                        {dataNewUpdate && dataNewUpdate.map((item, index) => {
                            return (
                                <div key={item.id} onClick={() => this.onClickPage(item.id)}
                                    className="slider p-[5px] border m-[10px] space-y-[10px] shadow-md rounded-[5px]
                            text-[12px] sm:text-[14px] lg:text-[16px] cursor-pointer hover:border-[#595959]" >
                                    <div className='relative text-white '>
                                        {item.images && item.images[0] && item.images[0].value &&
                                            <img src={require(`../../../assets/images/${item.images[0].value}`).default} alt="movie"
                                                className='h-[150px] sm:h-[180px] md:h-[200px] w-full block rounded-[5px]' />
                                        }
                                        <div className='absolute top-0 right-0  '>
                                            <span className='bg-[#ee2943] p-[5px] '>{item.Discount.value}%</span>
                                        </div>
                                        <div className='absolute top-0 left-0 '>
                                            <span className='bg-[#111111dc] py-[5px] px-[10px]  font-[600]'>UPDATE</span>
                                        </div>
                                        <div className='absolute bottom-0 left-0 text-[#ee2943]'>
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
                            );
                        })}
                    </Carousel>
                </div>
            </>
        )
    }
}

export default withRouter(MenuCarousel);