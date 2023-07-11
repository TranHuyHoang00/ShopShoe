import React from 'react';
import { toast } from 'react-toastify';
import MenuFilter from './element/MenuFilter';
import DataProduct from './element/DataProduct';
class Product extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }
    render() {
        return (
            <div className='px-[10px] sm:px-[30px] lg:px-[50px] space-y-[10px]'>
                <MenuFilter />
                <DataProduct />
            </div>
        )
    }
}

export default Product;