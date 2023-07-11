import React from 'react';
import banner3 from '../../../assets/images/banner3.jpg';
import banner4 from '../../../assets/images/banner4.jpg';
import banner5 from '../../../assets/images/banner5.jpg';
import { Carousel } from 'antd';
import { withRouter } from 'react-router-dom';
class Banner extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }
    onClickPage = () => {
        this.props.history.push(`/home/product`)
    }
    render() {
        return (
            <div className='md:grid grid-cols-3 gap-x-[10px]'>
                <div onClick={() => this.onClickPage()}
                    className='col-span-2 overflow-y-hidden relative h-200px md:h-[310px] rounded-[5px] cursor-pointer'>
                    <Carousel autoplay className='w-full h-full'>
                        <img src={banner3} className=" w-full h-full object-cover rounded-[5px]
                    hover:scale-110 transition duration-500 ease-in-out" />
                        <img src={banner3} className=" w-full h-full object-cover rounded-[5px]
                    hover:scale-110 transition duration-500 ease-in-out" />
                        <img src={banner3} className=" w-full h-full object-cover rounded-[5px]
                    hover:scale-110 transition duration-500 ease-in-out" />
                    </Carousel>
                </div>
                <div className='hidden md:block space-y-[10px] '>
                    <div onClick={() => this.onClickPage()}
                        className=' h-[150px] w-full relative overflow-hidden cursor-pointer'>
                        <img src={banner4} className=" w-full h-full object-cover rounded-[5px]
                    hover:scale-110 transition duration-500 ease-in-out" />
                    </div>
                    <div onClick={() => this.onClickPage()}
                        className='h-[150px] w-full relative overflow-hidden cursor-pointer'>
                        <img src={banner5} className=" w-full h-full object-cover rounded-[5px]
                    hover:scale-110 transition duration-500 ease-in-out" />
                    </div>
                </div>
            </div>
        )
    }
}

export default withRouter(Banner);