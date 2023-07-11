import React, { Component } from 'react';
import { toast } from 'react-toastify';
import { AiOutlineEdit, AiOutlineDelete } from "react-icons/ai";
import { getAllDiscount, deleteDiscount, createDiscount, editDiscount } from '../../../../services/DiscountService';
import { Modal, Input, } from 'antd';
class ManagerDiscount extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataDiscount: [],
            accessToken: '',
            isActive: '',
            dataHandle: {},
        }
    }
    async componentDidMount() {
        let infor = JSON.parse(window.localStorage.getItem('staffAccount'));
        this.setState({ accessToken: infor.data.accessToken })
        await this.getAllDiscount();
    }
    getAllDiscount = async () => {
        try {
            let data = await getAllDiscount();
            if (data && data.data && data.data.errCode == 0) {
                this.setState({ dataDiscount: data.data.data })
            } else {
                this.setState({ dataDiscount: [] })
            }
        } catch (e) {
            toast.success('Lỗi')
        }
    }
    onClickCloseModal = () => {
        this.setState({ isActive: '', dataHandle: {} })
    }
    onClickOpenModal = (input, data) => {
        if (input == 'create') { this.setState({ isActive: 'create' }) }
        if (input == 'edit') { this.setState({ isActive: 'edit', dataHandle: data }) }
    }
    handleOnChangeInput = (event, id) => {
        let copyState = { ...this.state.dataHandle };
        copyState[id] = event.target.value;
        this.setState({
            dataHandle: {
                ...copyState
            }
        });
    }
    handleDiscount = async (input, id) => {
        try {
            let data = {}
            if (input == 'delete') { data = await deleteDiscount(id, this.state.accessToken); }
            else {
                if (!this.state.dataHandle.value) { toast.error('Vui lòng điền đầy đủ thông tin'); return; }
                if (input == 'edit') { data = await editDiscount(this.state.dataHandle, this.state.accessToken); }
                if (input == 'create') { data = await createDiscount(this.state.dataHandle, this.state.accessToken); }
            }
            if (data && data.data && data.data.errCode == 0) {
                toast.success(data.data.errMessage);
                this.onClickCloseModal()
                this.getAllDiscount()
                return;
            } else {
                toast.error(data.data.errMessage)
                return;
            }
        } catch (e) {
            toast.error('Lỗi')
        }
    }
    render() {
        let dataDiscount = this.state.dataDiscount;
        return (
            <>
                <div className='text-[12px] md:text-[16px] px-[10px] md:px-[30px] space-y-[10px]'>
                    <button onClick={() => this.onClickOpenModal('create')}
                        className='text-white bg-[#343a40] px-[10px] py-[4px] rounded-[4px] hover:bg-[#eb0000]'>Mới</button>
                    <div className=' w-full pb-[20px] '>
                        <div className='bg-white w-full rounded-[10px] shadow-md'>
                            <div className='grid grid-cols-12 text-center font-[500] py-[5px] bg-[#343a40] text-white rounded-t-[10px]'>
                                <div><span>STT</span></div>
                                <div className='col-span-3'><span>TÊN</span></div>
                                <div className='col-span-1'><span>GIÁ TRỊ</span></div>
                                <div className='col-span-2'><span>NGÀY BĐ</span></div>
                                <div className='col-span-2'><span>NGÀY KT</span></div>
                                <div className='col-span-3'><span>HÀNH ĐỘNG</span></div>
                            </div>
                            {dataDiscount && dataDiscount.map((item, index) => {
                                return (
                                    <div key={item.id} className='grid grid-cols-12 py-[4px] text-center items-center border-b-[1px] font-[450]'>
                                        <div><span>{index + 1}</span></div>
                                        <div className='col-span-3'><span>{item.name}</span></div>
                                        <div className='col-span-1'><span>{item.value} %</span></div>
                                        <div className='col-span-2'><span>{item.start_date}</span></div>
                                        <div className='col-span-2'><span>{item.finish_date}</span></div>
                                        <div className='col-span-3 text-white flex items-center justify-center space-x-[10px]'>
                                            <button className='bg-[#343a40] p-[4px] rounded-[3px] hover:bg-[#eb0000]'
                                                onClick={() => this.onClickOpenModal('edit', item)}><AiOutlineEdit /></button>
                                            <button className='bg-[#343a40] p-[4px] rounded-[3px] hover:bg-[#eb0000]'
                                                onClick={() => this.handleDiscount('delete', item.id)}><AiOutlineDelete /></button>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                </div>
                <Modal width={300}
                    onCancel={() => this.onClickCloseModal()} onOk={() => this.handleDiscount('create')}
                    title="Tạo mới" open={this.state.isActive == 'create' ? true : false}>
                    <div className='space-y-[10px]'>
                        <Input placeholder="Tên khuyến mãi" onChange={(event) => this.handleOnChangeInput(event, 'name')} />
                        <Input placeholder="Giá trị" onChange={(event) => this.handleOnChangeInput(event, 'value')} />
                        <div>
                            <label>Ngày bắt đầu</label>
                            <Input type='date' onChange={(event) => this.handleOnChangeInput(event, 'start_date')} />
                        </div>
                        <div>
                            <label>Ngày kết thúc</label>
                            <Input type='date' onChange={(event) => this.handleOnChangeInput(event, 'finish_date')} />
                        </div>
                    </div>
                </Modal>
                <Modal width={300}
                    onCancel={() => this.onClickCloseModal()} onOk={() => this.handleDiscount('edit')}
                    title="Chỉnh sửa" open={this.state.isActive == 'edit' ? true : false}>
                    <div className='space-y-[10px]'>
                        <Input value={this.state.dataHandle.name} placeholder="Tên khuyến mãi" onChange={(event) => this.handleOnChangeInput(event, 'name')} />
                        <Input value={this.state.dataHandle.value} placeholder="Giá trị" onChange={(event) => this.handleOnChangeInput(event, 'value')} />
                        <div>
                            <label>Ngày bắt đầu</label>
                            <Input value={this.state.dataHandle.start_date} type='date' onChange={(event) => this.handleOnChangeInput(event, 'start_date')} />
                        </div>
                        <div>
                            <label>Ngày kết thúc</label>
                            <Input value={this.state.dataHandle.finish_date} type='date' onChange={(event) => this.handleOnChangeInput(event, 'finish_date')} />
                        </div>
                    </div>
                </Modal>
            </>
        );
    }

}
export default ManagerDiscount;
