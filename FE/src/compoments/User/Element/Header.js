import React from 'react';
import { toast } from 'react-toastify';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../../../store/actions';
import banner2 from '../../../assets/images/banner2.jpg';
import { AiOutlineSearch } from "react-icons/ai";
import { Dropdown, Modal, AutoComplete, Input } from 'antd';
import { getAllProductSearch } from '../../../services/ProductService';

class Header extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            openCart: false,
            infor: null,
            isOpenSearch: false,
            textSearch: '',
            dataSearch: [],
        }
    }
    async componentDidMount() {
        let infor = JSON.parse(window.localStorage.getItem('customerAccount'));
        if (infor && infor.data && infor.data.user) {
            this.setState({ infor: infor.data.user })
        } else {
            this.setState({ infor: null })
        }
    }
    onClickPage = (input) => {
        this.props.history.push(`/${input}`)
    }
    onClickPageDetail = (input) => {
        this.props.history.push(`/home/${input}`)
    }
    handleLogout = () => {
        localStorage.removeItem('customerAccount');
        this.props.history.push(`/login`)
    }
    onClickOpenSearch = () => {
        this.setState({ isOpenSearch: true })
    }
    onClickCloseSearch = () => {
        this.setState({ isOpenSearch: false })
    }
    handleSearchProduct = async (text) => {
        let data = await getAllProductSearch(text);
        if (data && data.data && data.data.errCode == 0) {
            let dataRaw = data.data.data;
            let dataFilter = [];
            for (const i of dataRaw) {
                let obj = {};
                obj.key = i.id;
                obj.value = i.name;
                dataFilter.push(obj);
            }
            this.setState({ dataSearch: dataFilter })
        } else {
            toast.error(data.data.errMessage)
        }
    }
    onSelectProduct = (value, option) => {
        this.props.get_product_id(option.key);
        this.props.history.push(`/home/product/${option.key}`);
    }
    render() {
        let infor = this.state.infor;
        const items = [
            { label: <label className='text-[12px] sm:text-[16px]' onClick={() => this.onClickPageDetail('user')}>Trang cá nhân</label>, key: '0', },
            { label: <label className='text-[12px] sm:text-[16px]' onClick={() => this.onClickPageDetail('cart')}>Giỏ hàng</label>, key: '1', },
            { label: <label className='text-[12px] sm:text-[16px]' onClick={() => this.onClickPageDetail('order')}>Đơn hàng</label>, key: '2', },
            { label: <label className='text-[12px] sm:text-[16px]' onClick={() => this.handleLogout()}>Đăng xuất</label>, key: '3', },
        ];
        return (
            <header className=' shadow-md'>
                <div className='flex items-center justify-center bg-[#595959] h-[30px] sm:h-auto'>
                    <img src={banner2} className='object-cover' />
                </div>
                <div className='flex items-center justify-between py-[5px] sm:py-[10px] bg-white px-[10px] sm:px-[30px] lg:px-[60px] space-x-[6px] sm:space-x-[20px]'>
                    <div onClick={() => this.onClickPage('home')}
                        className=' text-[16px] sm:text-[26px] md:text-[30px] text-[#595959] cursor-pointer'>
                        <h1 className='font-serif font-[900] '>AME</h1>
                    </div>
                    <div className='hidden md:flex  md:text-[14px] lg:text-[16px] '>
                        <AutoComplete style={{ width: 400, }}
                            onSearch={(text) => this.handleSearchProduct(text)}
                            placeholder="Nhập tên sản phẩm"
                            options={this.state.dataSearch}
                            onSelect={(value, option) => this.onSelectProduct(value, option)}
                        />
                    </div>
                    <div className='md:hidden block'>
                        <button onClick={() => this.onClickOpenSearch()}
                            className='py-[4px] px-[6px] bg-[#595959] text-[14px] text-white rounded-[2px]'>
                            <AiOutlineSearch />
                        </button>
                        <Modal width={500} onCancel={() => this.onClickCloseSearch()}
                            onOk={() => this.onClickCloseSearch()}
                            title="Tìm kiếm" open={this.state.isOpenSearch}>
                            <AutoComplete className='w-full'
                                onSearch={(text) => this.handleSearchProduct(text)}
                                placeholder="Nhập tên sản phẩm"
                                options={this.state.dataSearch}
                                onSelect={(value, option) => this.onSelectProduct(value, option)}
                            />
                        </Modal>
                    </div>
                    {infor == null ?
                        <div className='flex items-center justify-between text-white text-[10px] sm:text-[14px] md:text-[16px] 
                        space-x-[4px] sm:space-x-[10px]'>
                            <button onClick={() => this.onClickPage('login')}
                                className='bg-[#595959] px-[10px] py-[4px] rounded-[3px] '>Đăng nhập</button>
                            <button onClick={() => this.onClickPage('register')}
                                className='bg-[#595959] px-[10px] py-[4px] rounded-[3px] '>Đăng ký</button>
                        </div>
                        :
                        <Dropdown menu={{ items }} >
                            <a onClick={(e) => e.preventDefault()}>
                                <div className='flex items-center space-x-[5px] text-[18px] cursor-pointer'>
                                    {infor.avatar == null ?
                                        <img src={require(`../../../assets/avatars/a.jpg`).default}
                                            className='h-[25px] sm:h-[40px] w-[25px] sm:w-[40px] rounded-full object-cover' />
                                        :
                                        <img src={require(`../../../assets/avatars/${infor.avatar}`).default}
                                            className='h-[25px] sm:h-[40px] w-[25px] sm:w-[40px] rounded-full object-cover' />
                                    }
                                    <div className=' text-[14px]  sm:text-[18px] text-[#595959]'>
                                        <label>{infor.name == '' ? "Unknow" : infor.name}</label>
                                    </div>
                                </div>
                            </a>
                        </Dropdown>
                    }
                </div>
            </header>
        )
    }
}
const mapStateToProps = state => {
    return {
    };
};
const mapDispatchToProps = dispatch => {
    return {
        get_product_id: (id) => dispatch(actions.get_product_id(id)),
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Header));