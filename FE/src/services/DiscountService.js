import axios from "axios";

const getAllDiscount = () => {
    return axios.get('http://localhost:8080/api/Discount');
}
const editDiscount = (data, token) => {
    return axios.put('http://localhost:8080/api/Discount', data,
        { headers: { 'x_authorization': token, 'Accept': 'application/json', 'Content-Type': 'application/json' } }
    );
}
const createDiscount = (data, token) => {
    return axios.post('http://localhost:8080/api/Discount', data,
        { headers: { 'x_authorization': token, 'Accept': 'application/json', 'Content-Type': 'application/json' } }
    );
}
const deleteDiscount = (id, token) => {
    return axios.delete('http://localhost:8080/api/Discount', {
        data: { id: id },
        headers: { 'x_authorization': token, 'Accept': 'application/json', 'Content-Type': 'application/json' }
    }
    );
}
const getAllDiscountSearch = (text) => {
    return axios.get(`http://localhost:8080/api/Discount/search?text=${text}`);
}
export {
    getAllDiscount, createDiscount, deleteDiscount, getAllDiscountSearch, editDiscount
}