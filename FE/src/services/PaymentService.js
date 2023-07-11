import axios from "axios";

const getAllPayment = () => {
    return axios.get('http://localhost:8080/api/Payment');
}
const editPayment = (data, token) => {
    return axios.put('http://localhost:8080/api/Payment', data,
        { headers: { 'x_authorization': token, 'Accept': 'application/json', 'Content-Type': 'application/json' } }
    );
}
const createPayment = (data, token) => {
    return axios.post('http://localhost:8080/api/Payment', data,
        { headers: { 'x_authorization': token, 'Accept': 'application/json', 'Content-Type': 'application/json' } }
    );
}
const deletePayment = (id, token) => {
    return axios.delete('http://localhost:8080/api/Payment', {
        data: { id: id },
        headers: { 'x_authorization': token, 'Accept': 'application/json', 'Content-Type': 'application/json' }
    }
    );
}
const getAllPaymentSearch = (text) => {
    return axios.get(`http://localhost:8080/api/Payment/search?text=${text}`);
}
export {
    getAllPayment, createPayment, deletePayment, getAllPaymentSearch, editPayment
}