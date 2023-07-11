import React from 'react';
// import icon1 from '../../../assets/images/icon1.png';
// import icon2 from '../../../assets/images/icon2.png';
// import icon3 from '../../../assets/images/icon3.png';
// import icon4 from '../../../assets/images/icon4.png';
// import Hotsale from './products/Hotsale';
// import MoreView from './products/MoreView';
class Main extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }
    render() {
        return (
            <>
                <div className='block lg:grid grid-cols-5 bg-white mx-[10px] sm:mx-[20px] lg:mx-[60px] py-[10px] sm:py-[15px] md:px-[40px] xl:px-[60px] gap-x-[10px] sm:gap-x-[20px] lg:gap-x-[30px] rounded-[5px]'>
                    <div className='hidden lg:block text-center text-[18px] lg:text-[22px] font-[700] hover:scale-90 transition duration-500 ease-in-out '>
                        <h1 className='text-[#f84144]'>Lượt xem</h1>
                        <h2 className='border border-[#ff5256] px-[10px] py-[2px] rounded-[5px]'>134.221</h2>
                    </div>
                    <div className='col-span-3 grid grid-cols-4 items-center space-x-[10px] sm:space-x-[20px] text-[10px] sm:text-[14px] lg:text-[16px] font-[700]'>
                        {/* <div className='text-center cursor-pointer space-y-[5px] hover:scale-110 transition duration-500 ease-in-out hover:text-[#d41013]'>
                            <img src={icon1} className='h-[35px] sm:h-[50px] lg:h-[60px] mx-auto' />
                            <h1 className=''>HOT SALE</h1>
                        </div>
                        <div className='text-center cursor-pointer space-y-[5px] hover:scale-110 transition duration-500 ease-in-out hover:text-[#d41013]'>
                            <img src={icon2} className=' h-[35px] sm:h-[50px] lg:h-[60px] mx-auto' />
                            <h1 className=''>MỚI NHẤT</h1>
                        </div>
                        <div className='text-center cursor-pointer space-y-[5px] hover:scale-110 transition duration-500 ease-in-out hover:text-[#d41013]'>
                            <img src={icon3} className='h-[35px] sm:h-[50px] lg:h-[60px] mx-auto' />
                            <h1 className=''>XEM NHIỀU</h1>
                        </div>
                        <div className='text-center cursor-pointer space-y-[5px] hover:scale-110 transition duration-500 ease-in-out hover:text-[#d41013]'>
                            <img src={icon4} className='h-[35px] sm:h-[50px] lg:h-[60px] mx-auto' />
                            <h1 className=''>MUA NHIỀU</h1>
                        </div> */}
                    </div>
                    <div className='hidden lg:block text-center text-[22px] font-[700] hover:scale-90 transition duration-500 ease-in-out'>
                        <h1 className='text-[#f84144]'>Lượt truy cập</h1>
                        <h2 className='border border-[#ff5256] px-[10px] py-[2px] rounded-[5px]'>1.134.221</h2>
                    </div>
                </div>
                <div className='bg-white mx-[10px] sm:mx-[20px] lg:mx-[60px] lg:hidden py-[2px] sm:py-[4px] rounded-[5px] grid grid-cols-2
                font-[700] text-[14px] sm:text-[16px] md:text-[18px]'>
                    <div className='text-center'>
                        <h1 className='text-[#f84144]'>Lượt xem</h1>
                        <h2 className=''>134.221</h2>
                    </div>
                    <div className=' text-center'>
                        <h1 className='text-[#f84144]'>Lượt truy cập</h1>
                        <h2 className=''>1.134.221</h2>
                    </div>

                </div>
                {/* <Hotsale />
                <MoreView /> */}
            </>
        )
    }
}

export default Main;