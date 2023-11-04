import React from 'react';
import Banner from './Banner';
import Menu from './Menu';
import MenuCarousel from './MenuCarousel';
class Main extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }
    render() {
        return (
            <div className='space-y-[10px] mx-[10px] sm:mx-[30px] lg:mx-[50px]'>
                <Banner />
                {/* <Menu /> */}
                <MenuCarousel />
            </div>
        )
    }
}

export default Main;