import React, { Component } from 'react';
import { toast } from 'react-toastify';
import { AiOutlineEdit, AiOutlineDelete } from "react-icons/ai";
import { getAllSize, deleteSize, createSize, editSize } from '../../../../services/SizeService';
import { Modal, Input } from 'antd';
class ManagerSize extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataSize: [],
            accessToken: '',
            isActive: '',
            dataHandle: {},
        }
    }
    async componentDidMount() {
        let infor = JSON.parse(window.localStorage.getItem('staffAccount'));
        this.setState({ accessToken: infor.data.accessToken })
        await this.getAllSize();
    }
    getAllSize = async () => {
        try {
            let data = await getAllSize();
            if (data && data.data && data.data.errCode == 0) {
                this.setState({ dataSize: data.data.data })
            } else {
                this.setState({ dataSize: [] })
            }
        } catch (e) {
            toast.success('Lỗi')
        }
    }
    onClickCloseModal = () => {
        this.setState({ isActive: '' })
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
    handleSize = async (input, id) => {
        try {
            let data = {}
            if (input == 'delete') { data = await deleteSize(id, this.state.accessToken); }
            else {
                if (!this.state.dataHandle.value) { toast.error('Vui lòng điền đầy đủ thông tin'); return; }
                if (input == 'edit') { data = await editSize(this.state.dataHandle, this.state.accessToken); }
                if (input == 'create') { data = await createSize(this.state.dataHandle, this.state.accessToken); }
            }
            if (data && data.data && data.data.errCode == 0) {
                toast.success(data.data.errMessage);
                this.onClickCloseModal()
                this.getAllSize()
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
        let dataSize = this.state.dataSize;
        return (
            <>
                <div className='text-[12px] md:text-[16px] px-[10px] md:px-[30px] space-y-[10px]'>
                    <button onClick={() => this.onClickOpenModal('create')}
                        className='text-white bg-[#343a40] px-[10px] py-[4px] rounded-[4px] hover:bg-[#eb0000]'>Mới</button>
                    <div className=' w-full pb-[20px] '>
                        <div className='bg-white w-full rounded-[10px] shadow-md'>
                            <div className='grid grid-cols-8 text-center font-[500] py-[5px] bg-[#343a40] text-white rounded-t-[10px]'>
                                <div><span>STT</span></div>
                                <div className='col-span-4'><span>KÍCH CỠ</span></div>
                                <div className='col-span-3'><span>HÀNH ĐỘNG</span></div>
                            </div>
                            {dataSize && dataSize.map((item, index) => {
                                return (
                                    <div key={item.id} className='grid grid-cols-8 py-[4px] text-center items-center border-b-[1px] font-[450]'>
                                        <div><span>{index + 1}</span></div>
                                        <div className='col-span-4'><span>{item.value}</span></div>
                                        <div className='col-span-3 text-white flex items-center justify-center space-x-[10px]'>
                                            <button className='bg-[#343a40] p-[4px] rounded-[3px] hover:bg-[#eb0000]'
                                                onClick={() => this.onClickOpenModal('edit', item)}><AiOutlineEdit /></button>
                                            <button className='bg-[#343a40] p-[4px] rounded-[3px] hover:bg-[#eb0000]'
                                                onClick={() => this.handleSize('delete', item.id)}><AiOutlineDelete /></button>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                </div>
                <Modal width={300}
                    onCancel={() => this.onClickCloseModal()} onOk={() => this.handleSize('create')}
                    title="Tạo mới" open={this.state.isActive == 'create' ? true : false}>
                    <Input placeholder="Kích cỡ" onChange={(event) => this.handleOnChangeInput(event, 'value')} />
                </Modal>
                <Modal width={300}
                    onCancel={() => this.onClickCloseModal()} onOk={() => this.handleSize('edit')}
                    title="Chỉnh sửa" open={this.state.isActive == 'edit' ? true : false}>
                    <Input value={this.state.dataHandle.value} placeholder="Kích cỡ" onChange={(event) => this.handleOnChangeInput(event, 'value')} />
                </Modal>
            </>
        );
    }

}
export default ManagerSize;
