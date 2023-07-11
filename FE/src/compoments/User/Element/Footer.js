import React from 'react';
import { BsFacebook, BsMessenger, BsTwitter, BsTelegram, BsInstagram } from "react-icons/bs";
class Footer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }
    render() {
        return (
            <footer className='bg-[#353535] text-center text-white py-[10px] sm:py-[20px] md:py-[30px] space-y-[5px] sm:space-y-[10px] md:space-y-[20px]'>
                <div className=" flex items-center justify-center text-[20px] md:text-[24px] lg:text-[30px] space-x-[10px]">
                    <BsFacebook className='border border-white p-[2px] rounded-full' />
                    <BsMessenger className='border border-white p-[2px] rounded-full' />
                    <BsTwitter className='border border-white p-[2px] rounded-full' />
                    <BsTelegram className='border border-white p-[2px] rounded-full' />
                    <BsInstagram className='border border-white p-[2px] rounded-full' />
                </div>
                <div className="text-center text-[14px] sm:text-[16px]">
                    <span className="" >© 2023 Copyright : AME SHOP</span>
                </div>
            </footer>
        )
    }
}

export default Footer;