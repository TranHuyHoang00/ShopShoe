import React, { Component } from 'react';
import { Switch, Route } from "react-router-dom";
import { DatabaseOutlined, } from '@ant-design/icons';
import { Layout, Menu } from 'antd';
import {
    AiFillContainer, AiFillGitlab, AiOutlineBlock, AiOutlineFontSize, AiOutlineBgColors, AiFillCodeSandboxCircle,
    AiFillFrown, AiFillMoneyCollect, AiFillBug, AiOutlineAudit, AiOutlineUser, AiFillCalculator
} from "react-icons/ai";
import { withRouter } from 'react-router-dom';
import ManagerBrand from './table/brand/ManagerBrand';
import ManagerColor from './table/color/ManagerColor';
import ManagerSize from './table/size/ManagerSize';
import ManagerType from './table/type/ManagerType';
import ManagerStatus from './table/status/ManagerStatus';
import ManagerOrigin from './table/origin/ManagerOrigin';
import ManagerRole from './table/role/ManagerRole';
import ManagerDiscount from './table/discount/ManagerDiscount';


import ManagerProduct from './table/product/ManagerProduct';
import ProductCreate from './table/product/ProductCreate';
import ProductEdit from './table/product/ProductEdit';
import StatisticalOrder from './statistical/StatisticalOrder';

import ManagerOrder from './table/order/ManagerOrder';
import OrderDetail from '../user/order/OrderDetail';

import ManagerUser from './table/user/ManagerUser';
import UserDetail from './table/user/UserDetail';
import UserEdit from './table/user/UserEdit';
import UserCreate from './table/user/UserCreate';


import PersonalPage from './element/PersonalPage';
import HeaderDB from './element/HeaderDB';
class index extends Component {
    constructor(props) {
        super(props);
        this.state = {
            collapsed: false,
            url: '/dashboard/',
        }
    }
    async componentDidMount() {
    }
    getItem = (label, key, icon, children) => { return { key, icon, children, label, }; }
    setCollapsed = () => { this.setState({ collapsed: !this.state.collapsed }) }

    onClickPage = (value) => {
        this.props.history.push(`/dashboard/${value.key}`)
    }
    render() {
        const items = [
            this.getItem('Bảng', 'table', <DatabaseOutlined />, [
                this.getItem('Người dùng', 'user', <AiOutlineUser />),
                this.getItem('Sản phẩm', 'product', <AiFillBug />),
                this.getItem('Đơn hàng', 'order', <AiOutlineAudit />),
                this.getItem('Thương hiệu', 'brand', <AiFillCodeSandboxCircle />),
                this.getItem('Xuất xứ', 'origin', <AiFillContainer />),
                this.getItem('Kích cỡ', 'size', <AiOutlineFontSize />),
                this.getItem('Màu sắc', 'color', <AiOutlineBgColors />),
                this.getItem('Khuyến mãi', 'discount', <AiFillMoneyCollect />),
                this.getItem('Loại sản phẩm', 'type', <AiOutlineBlock />),
                this.getItem('Phân quyền', 'role', <AiFillGitlab />),
                this.getItem('Trạng thái', 'status', <AiFillFrown />),
            ]),
            this.getItem('Thống kê', 'statistical', <AiFillCalculator />, [
                this.getItem('Đơn đặt', 'statistical/order', <AiOutlineAudit />),
            ]),
        ];
        const { Header, Content, Footer, Sider } = Layout;
        let url = this.state.url;
        return (
            <Layout style={{ minHeight: '100vh', }} >
                <Sider
                    collapsible collapsed={this.state.collapsed} onCollapse={(value) => this.setCollapsed(value)}>
                    <Menu theme="dark" mode="inline" items={items} defaultSelectedKeys={['table']}
                        onClick={(value) => this.onClickPage(value)} />
                </Sider>
                <Layout>
                    <Header className='bg-white shadow-md '>
                        <HeaderDB />
                    </Header>
                    <Content className='py-[10px]'>
                        <Switch>
                            <Route path={`${url}brand`}><ManagerBrand /></Route>
                            <Route path={`${url}color`}><ManagerColor /></Route>
                            <Route path={`${url}discount`}><ManagerDiscount /></Route>
                            <Route path={`${url}origin`}><ManagerOrigin /></Route>
                            <Route path={`${url}role`}><ManagerRole /></Route>
                            <Route path={`${url}size`}><ManagerSize /></Route>
                            <Route path={`${url}status`}><ManagerStatus /></Route>
                            <Route path={`${url}type`}><ManagerType /></Route>

                            <Route exact path={`${url}product`}><ManagerProduct /></Route>
                            <Route exact path={`${url}product/create`}><ProductCreate /></Route>
                            <Route exact path={`${url}product/edit/:id`}><ProductEdit /></Route>

                            <Route exact path={`${url}order`}><ManagerOrder /></Route>
                            <Route exact path={`${url}order/:id`}><OrderDetail /></Route>
                            <Route exact path={`${url}statistical/order`}><StatisticalOrder /></Route>

                            <Route exact path={`${url}user`}><ManagerUser /></Route>
                            <Route exact path={`${url}user/create`}><UserCreate /></Route>
                            <Route exact path={`${url}user/:id`}><UserDetail /></Route>
                            <Route exact path={`${url}user/edit/:id`}><UserEdit /></Route>

                            <Route path={`${url}infor`}><PersonalPage /></Route>
                        </Switch>
                    </Content>
                </Layout>
            </Layout>
        );
    }

}
export default withRouter(index);
