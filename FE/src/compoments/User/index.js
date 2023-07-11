import React from 'react';
import { Switch, Route } from "react-router-dom";
import Product from './products/Product';
import ProductDetail from './products/ProductDetail';
import PersonalPage from './infor/PersonalPage';
import Cart from './cart/Cart';
import Order from './order/Order';
import OrderDetail from './order/OrderDetail';
import OrderEdit from './order/OrderEdit';
import Header from './element/Header';
import Main from './home/Main';
import Footer from './element/Footer';
class index extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }
    render() {
        return (
            <div className='bg-[#f0f0f0] space-y-[6px] sm:space-y-[10px] lg:space-y-[20px]'>
                <Header />
                <div className='space-y-[6px] sm:space-y-[10px] lg:space-y-[20px]'>
                    <Switch>
                        <Route exact path={'/home'}><Main /></Route>
                        <Route exact path={'/home/product'}><Product /></Route>
                        <Route path={'/home/product/:id'}><ProductDetail /></Route>
                        <Route path={'/home/user'}><PersonalPage /></Route>
                        <Route path={'/home/cart'}><Cart /></Route>
                        <Route exact path={'/home/order'}><Order /></Route>
                        <Route exact path={'/home/order/:id'}><OrderDetail /></Route>
                        <Route path={'/home/order/edit/:id'}><OrderEdit /></Route>
                    </Switch>
                    {/* <Main />
                    <TestNow /> */}
                </div>
                <Footer />
            </div>
        )
    }
}

export default index;