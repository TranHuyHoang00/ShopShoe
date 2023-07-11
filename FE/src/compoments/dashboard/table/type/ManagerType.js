import React, { Component } from 'react';
import { toast } from 'react-toastify';
import { AiOutlineEdit, AiOutlineDelete } from "react-icons/ai";
import { getAllType, deleteType, createType, editType } from '../../../../services/TypeService';
import { Modal, Input } from 'antd';
class ManagerType extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataType: [],
            accessToken: '',
            isActive: '',
            dataHandle: {},
        }
    }
    async componentDidMount() {
        let infor = JSON.parse(window.localStorage.getItem('staffAccount'));
        this.setState({ accessToken: infor.data.accessToken })
        await this.getAllType();
    }
    getAllType = async () => {
        try {
            let data = await getAllType();
            if (data && data.data && data.data.errCode == 0) {
                this.setState({ dataType: data.data.data })
            } else {
                this.setState({ dataType: [] })
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
    handleType = async (input, id) => {
        try {
            let data = {}
            if (input == 'delete') { data = await deleteType(id, this.state.accessToken); }
            else {
                if (!this.state.dataHandle.name) { toast.error('Vui lòng điền đầy đủ thông tin'); return; }
                if (input == 'edit') { data = await editType(this.state.dataHandle, this.state.accessToken); }
                if (input == 'create') { data = await createType(this.state.dataHandle, this.state.accessToken); }
            }
            if (data && data.data && data.data.errCode == 0) {
                toast.success(data.data.errMessage);
                this.onClickCloseModal()
                this.getAllType()
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
        let dataType = this.state.dataType;
        return (
            <>
                <div className='text-[12px] md:text-[16px] px-[10px] md:px-[30px] space-y-[10px]'>
                    <button onClick={() => this.onClickOpenModal('create')}
                        className='text-white bg-[#343a40] px-[10px] py-[4px] rounded-[4px] hover:bg-[#eb0000]'>Mới</button>
                    <div className=' w-full pb-[20px] '>
                        <div className='bg-white w-full rounded-[10px] shadow-md'>
                            <div className='grid grid-cols-8 text-center font-[500] py-[5px] bg-[#343a40] text-white rounded-t-[10px]'>
                                <div><span>STT</span></div>
                                <div className='col-span-4'><span>LOẠI</span></div>
                                <div className='col-span-3'><span>HÀNH ĐỘNG</span></div>
                            </div>
                            {dataType && dataType.map((item, index) => {
                                return (
                                    <div key={item.id} className='grid grid-cols-8 py-[4px] text-center items-center border-b-[1px] font-[450]'>
                                        <div><span>{index + 1}</span></div>
                                        <div className='col-span-4'><span>{item.name}</span></div>
                                        <div className='col-span-3 text-white flex items-center justify-center space-x-[10px]'>
                                            <button className='bg-[#343a40] p-[4px] rounded-[3px] hover:bg-[#eb0000]'
                                                onClick={() => this.onClickOpenModal('edit', item)}><AiOutlineEdit /></button>
                                            <button className='bg-[#343a40] p-[4px] rounded-[3px] hover:bg-[#eb0000]'
                                                onClick={() => this.handleType('delete', item.id)}><AiOutlineDelete /></button>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                </div>
                <Modal width={300}
                    onCancel={() => this.onClickCloseModal()} onOk={() => this.handleType('create')}
                    title="Tạo mới" open={this.state.isActive == 'create' ? true : false}>
                    <Input placeholder="Tên loại" onChange={(event) => this.handleOnChangeInput(event, 'name')} />
                </Modal>
                <Modal width={300}
                    onCancel={() => this.onClickCloseModal()} onOk={() => this.handleType('edit')}
                    title="Chỉnh sửa" open={this.state.isActive == 'edit' ? true : false}>
                    <Input value={this.state.dataHandle.name} placeholder="Tên loại" onChange={(event) => this.handleOnChangeInput(event, 'name')} />
                </Modal>
            </>
        );
    }

}
export default ManagerType;
