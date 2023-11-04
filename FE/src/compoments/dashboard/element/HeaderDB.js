import React from 'react';
import { Button, Dropdown } from 'antd';
import { withRouter } from 'react-router-dom';
class HeaderDB extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            infor: null,
        }
    }
    async componentDidMount() {
        let infor = JSON.parse(window.localStorage.getItem('staffAccount'));
        if (infor && infor.data && infor.data.user) {
            this.setState({ infor: infor.data.user })
        } else {
            this.setState({ infor: null })
        }
    }
    onClickPage = (input) => {
        if (input == 'home') { this.props.history.push(`/${input}`) }

        if (input == 'login') { this.props.history.push(`/${input}`) }
        if (input == 'infor') { this.props.history.push(`/dashboard/${input}`) }
    }
    handleLogout = () => {
        localStorage.removeItem('staffAccount');
        this.props.history.push(`/login`)
    }
    render() {
        let infor = this.state.infor;
        const items = [
            { label: <label className='text-[12px] sm:text-[16px]' onClick={() => this.onClickPage('infor')}>Trang cá nhân</label>, key: '0', },
            { label: <label className='text-[12px] sm:text-[16px]' onClick={() => this.handleLogout()}>Đăng xuất</label>, key: '3', },
        ];
        return (
            <div className='flex items-center justify-between'>
                <div onClick={() => this.onClickPage('home')}
                    className=' text-[16px] sm:text-[26px] md:text-[30px] text-[#595959] cursor-pointer'>
                    <h1 className='font-serif font-[900] '>SenDo</h1>
                </div>
                {infor == null ?
                    <Button onClick={() => this.onClickPage('login')}
                        className='bg-[#595959] text-white'>Đăng nhập</Button>
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
        )
    }
}

export default withRouter(HeaderDB);