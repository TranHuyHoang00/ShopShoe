import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { toast } from 'react-toastify';
import { AiOutlineEye } from "react-icons/ai";
import { Statistical } from '../../../services/OrderService';
import { getAllStatus } from '../../../services/StatusService';
import { getAllPayment } from '../../../services/PaymentService';
import { DatePicker, Modal, Select } from 'antd'

class StatisticalOrder extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isOpenStatistical: false,
            TypeStatistical: { value: 'date', label: 'Ngày' },
            dataOrder: [],
            dataStatus: [],
            dataPayment: [],
            accessToken: '',
            check: { date: [], statusId: 8, paymentId: 0, filter: 1, quantity: 8, page: 0 },
            index: 0,
            total: 0,
        }
    }
    async componentDidMount() {
        let infor = JSON.parse(window.localStorage.getItem('staffAccount'));
        this.setState({ accessToken: infor.data.accessToken })
        await this.getAllStatus();
        await this.getAllPayment();
    }
    getAllOrderStatistical = async () => {
        try {
            let data = await Statistical(this.state.check, this.state.accessToken);
            if (data && data.data && data.data.errCode == 0) {
                let dataRaw = data.data.data;
                let index = 0;
                let total = 0;
                for (const i of dataRaw) {
                    index += 1;
                    total += i.total
                }
                this.setState({ dataOrder: dataRaw, total: total, index: index })
            } else {
                this.setState({ dataOrder: [] })
            }
        } catch (e) {
            toast.success('Lỗi')
        }
    }
    getAllStatus = async () => {
        try {
            let data = await getAllStatus();
            if (data && data.data && data.data.errCode == 0) {
                let dataRaw = data.data.data;
                dataRaw.push({ id: 0, name: 'Tất cả' })
                let dataFilter = dataRaw.filter(obj => {
                    return obj.id == 0 || obj.id == 5 || obj.id == 6 || obj.id == 7 || obj.id == 8 || obj.id == 9 || obj.id == 10
                })
                this.setState({ dataStatus: dataFilter })
            } else {
                this.setState({ dataStatus: [] })
            }
        } catch (e) {
            toast.success('Lỗi')
        }
    }
    getAllPayment = async () => {
        try {
            let data = await getAllPayment();
            if (data && data.data && data.data.errCode == 0) {
                let dataRaw = data.data.data;
                dataRaw.push({ id: 0, name: 'Tất cả' })
                this.setState({ dataPayment: dataRaw })
            } else {
                this.setState({ dataPayment: [] })
            }
        } catch (e) {
            toast.success('Lỗi')
        }
    }
    onChangeFilter = async (value, label, id) => {
        let copyState = { ...this.state.check };
        copyState[id] = value;
        this.setState({
            check: {
                ...copyState
            }
        });
    }
    onChangeDay = async (value, label,) => {
        let check = this.state.check;
        check.date = label
        this.setState({
            check: check
        })
    }
    onClickPage = (id, page) => {
        if (page == 'detail') { this.props.history.push(`/dashboard/order/${id}`) }
    }
    onClickStatistical = (input) => {
        this.setState({ isOpenStatistical: input })
    }
    onChangeTypeStatistical = (value, label) => {
        this.setState({
            TypeStatistical: {
                value: value,
                label: label.label
            }
        })
    }
    render() {
        let dataOrder = this.state.dataOrder;
        let dataStatus = this.state.dataStatus;
        let dataPayment = this.state.dataPayment;
        const { RangePicker } = DatePicker;
        let TypeStatistical = this.state.TypeStatistical;
        return (
            <>
                <div className='text-[12px] md:text-[16px] px-[10px] md:px-[30px] space-y-[10px]'>
                    <div className='flex items-center justify-between'>
                        <button onClick={() => this.onClickStatistical(true)}
                            className='text-white bg-[#343a40] px-[10px] py-[4px] rounded-[4px] hover:bg-[#eb0000]'>Thống kê</button>
                        <label>Tổng đơn : {this.state.index}</label>
                        <label>Tổng tiền : {`${this.state.total}`.replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')} đ</label>
                    </div>
                    <div className=' w-full pb-[20px] '>
                        <div className='bg-white w-full rounded-[10px] shadow-md'>
                            <div className='grid grid-cols-12 text-center text-white bg-[#353535] py-[5px] rounded-tl-[5px] 
                rounded-tr-[5px] text-[10px] sm:text-[12px] md:text-[14px] lg:text-[16px]'>
                                <div><span>STT</span></div>
                                <div className='col-span-2'><span>THANH TOÁN</span></div>
                                <div className='col-span-2'><span>TỔNG TIỀN</span></div>
                                <div className='col-span-2'><span>NGÀY ĐẶT</span></div>
                                <div className='col-span-2'><span>TRẠNG THÁI</span></div>
                                <div className='col-span-3'><span>HÀNH ĐỘNG</span></div>
                            </div>
                            {dataOrder && dataOrder.map((item, index) => {
                                return (
                                    <div key={item.id} className='grid grid-cols-12 text-center bg-white py-[5px] border-b text-[10px] sm:text-[12px] md:text-[14px] lg:text-[16px]'>
                                        <div><span>{index + 1}</span></div>
                                        <div className='col-span-2'><span>{item.Payment.name}</span></div>
                                        <div className='col-span-2'><span>{`${item.total}`.replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')} đ</span></div>
                                        <div className='col-span-2'><span>{item.createdAt}</span></div>
                                        <div className='col-span-2'><span>{item.Status.name}</span></div>
                                        <div className='col-span-3 text-white flex items-center justify-center space-x-[10px]'>
                                            <button className='bg-[#343a40] p-[4px] rounded-[3px] hover:bg-[#eb0000]'
                                                onClick={() => this.onClickPage(item.id, 'detail')}><AiOutlineEye /></button>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                </div>
                <Modal width={500} onCancel={() => this.onClickStatistical(false)}
                    onOk={() => this.getAllOrderStatistical()}
                    title="Thống kê" open={this.state.isOpenStatistical}>
                    <div className='space-y-[10px]'>
                        <div className='flex items-center justify-between'>
                            <label>Thống kê : </label>
                            <Select style={{ width: 200 }} defaultValue={{ value: 'date', label: 'Ngày' }}
                                onChange={(value, label) => this.onChangeTypeStatistical(value, label)}
                                options={[{ value: '0', label: 'Ngày' }, { value: 'month', label: 'Tháng' }, { value: 'year', label: 'Năm' }]} />
                        </div>
                        <div className='flex items-center justify-between'>
                            <label>{TypeStatistical.label} : </label>
                            <RangePicker picker={`${TypeStatistical.value}`}
                                onChange={(value, label) => this.onChangeDay(value, label)} />
                        </div>
                        <div className='flex items-center justify-between'>
                            <label>Thanh toán :</label>
                            <Select style={{ width: 200 }} defaultValue={{ value: '0', label: 'Tất cả' }}
                                onChange={(value, label) => this.onChangeFilter(value, label, 'paymentId')}
                                options={dataPayment.map((item) => ({
                                    label: item.name,
                                    value: item.id,
                                }))}></Select>
                        </div>
                        <div className='flex items-center justify-between'>
                            <label>Trạng thái :</label>
                            <Select style={{ width: 200 }} defaultValue={{ value: '8', label: 'Đã giao' }}
                                onChange={(value, label) => this.onChangeFilter(value, label, 'statusId')}
                                options={dataStatus.map((item) => ({
                                    label: item.name,
                                    value: item.id,
                                }))}></Select>
                        </div>
                        <div className='flex items-center justify-between'>
                            <label>Sắp xếp:</label>
                            <Select style={{ width: 200 }} defaultValue={{ value: '1', label: 'Mới nhất' }}
                                onChange={(value, label) => this.onChangeFilter(value, label, 'filter')}
                                options={[{ value: '1', label: 'Mới nhất' }, { value: '2', label: 'Cũ nhất' },
                                { value: '3', label: 'Nhiều tiền' }, { value: '4', label: 'Ít tiền' },]} />
                        </div>
                    </div>
                </Modal>
            </>
        );
    }

}
export default withRouter(StatisticalOrder);
