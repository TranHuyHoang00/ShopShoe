import React from 'react';
import { toast } from 'react-toastify';
import { connect } from 'react-redux';
import * as actions from '../../../../store/actions';
import { AiOutlinePicLeft } from "react-icons/ai";
import { getAllType } from '../../../../services/TypeService';
import { getAllBrand } from '../../../../services/BrandService';
import { getAllDiscount } from '../../../../services/DiscountService';
import { getAllOrigin } from '../../../../services/OriginService';
import { getAllProduct } from '../../../../services/ProductService';
import { Drawer, Select, Tag } from 'antd';

class MenuFilter extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            dataType: [],
            dataBrand: [],
            dataOrigin: [],
            dataDiscount: [],
            check: { typeId: 0, brandId: 0, originId: 0, discountId: 0, filter: 1, quantity: 10, page: 0 },
            openMenuFilter: false
        }
    }
    async componentDidMount() {
        await this.getAllType();
        await this.getAllBrand();
        await this.getAllDiscount();
        await this.getAllOrigin();
        let data = await this.getAllProduct(this.state.check);
        await this.props.get_data_product(data)
    }
    getAllProduct = async (filter) => {
        try {
            let data = await getAllProduct(filter);
            if (data && data.data && data.data.errCode == 0) {
                return data.data.data
            } else {
                return []
            }
        } catch (e) {
            toast.error('Lỗi')
        }
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
    onCloseMenuFilter = () => { this.setState({ openMenuFilter: false }) }
    onOpenMenuFilter = () => { this.setState({ openMenuFilter: true }) }
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
    getAllBrand = async () => {
        try {
            let data = await getAllBrand();
            if (data && data.data && data.data.errCode == 0) {
                this.setState({ dataBrand: data.data.data })
            } else {
                this.setState({ dataBrand: [] })
            }
        } catch (e) {
            toast.success('Lỗi')
        }
    }
    getAllOrigin = async () => {
        try {
            let data = await getAllOrigin();
            if (data && data.data && data.data.errCode == 0) {
                this.setState({ dataOrigin: data.data.data })
            } else {
                this.setState({ dataOrigin: [] })
            }
        } catch (e) {
            toast.success('Lỗi')
        }
    }
    onChangeFilter = async (event, id) => {
        let copyState = { ...this.state.check };
        copyState[id] = event;
        this.setState({
            check: {
                ...copyState
            }
        });
        let data = await this.getAllProduct(copyState);
        await this.props.get_data_product(data);
    }
    render() {
        let dataType = this.state.dataType;
        let dataBrand = this.state.dataBrand;
        let dataDiscount = this.state.dataDiscount;
        let dataOrigin = this.state.dataOrigin;
        return (
            <>
                <div className='bg-white p-[4px] sm:p-[10px] rounded-[4px] shadow-md'>
                    <div className='flex items-center justify-between text-[12px] sm:text-[16px] md:text-[18px] space-x-[8px] sm:space-x-[20px]'>
                        <div className=''>
                            <Select style={{ width: 200 }} defaultValue={{ value: '0', label: 'Tất cả' }}
                                onChange={(event) => this.onChangeFilter(event, 'typeId')}
                                options={dataType.map((item) => ({
                                    label: item.name,
                                    value: item.id,
                                }))} />
                        </div>
                        <div className='flex items-center space-x-[10px] sm:space-x-[30px]'>
                            <div onClick={() => this.onOpenMenuFilter()}
                                className='flex items-center space-x-[4px] cursor-pointer '>
                                <AiOutlinePicLeft className='' />
                                <label>BỘ LỌC</label>
                            </div>
                            <div className='flex items-center space-x-[4px] sm:space-x-[10px] cursor-pointer '>
                                <label>Sắp xếp :</label>
                                <Select style={{ width: 160 }} defaultValue={{ value: '0', label: 'Mới nhất' }}
                                    onChange={(event) => this.onChangeFilter(event, 'filter')}
                                    options={[
                                        { value: '1', label: 'Mới nhất' },
                                        { value: '2', label: 'Cũ nhất' },
                                        { value: '3', label: 'A-Z' },
                                        { value: '4', label: 'Z-A' },
                                    ]} />
                            </div>
                        </div>
                    </div>
                </div>
                <Drawer title="Bộ lọc" onClose={() => this.onCloseMenuFilter()}
                    placement="right" open={this.state.openMenuFilter}>
                    <div className='space-y-[10px]'>
                        <div className=' flex items-center justify-between'>
                            <Tag >Thương hiệu</Tag >
                            <Select style={{ width: 140 }} defaultValue={{ value: '0', label: 'Tất cả' }}
                                onChange={(event) => this.onChangeFilter(event, 'brandId')}
                                options={dataBrand.map((item) => ({
                                    label: item.name,
                                    value: item.id,
                                }))} />
                        </div>
                        <div className=' flex items-center justify-between'>
                            <Tag >Xuất xứ</Tag >
                            <Select style={{ width: 140 }} defaultValue={{ value: '0', label: 'Tất cả' }}
                                onChange={(event) => this.onChangeFilter(event, 'originId')}
                                options={dataOrigin.map((item) => ({
                                    label: item.name,
                                    value: item.id,
                                }))} />
                        </div>
                        <div className=' flex items-center justify-between'>
                            <Tag >Khuyến mãi</Tag >
                            <Select style={{ width: 140 }} defaultValue={{ value: '0', label: 'Tất cả' }}
                                onChange={(event) => this.onChangeFilter(event, 'discountId')}
                                options={dataDiscount.map((item) => ({
                                    label: item.name,
                                    value: item.id,
                                }))} />
                        </div>
                    </div>
                </Drawer>
            </>
        )
    }
}
const mapStateToProps = state => {
    return {
    };
};
const mapDispatchToProps = dispatch => {
    return {
        get_data_product: (data) => dispatch(actions.get_data_product(data)),
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(MenuFilter);