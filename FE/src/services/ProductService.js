import axios from "axios";

const getAllProduct = (data) => {
    return axios.post('http://localhost:8080/api/Get/Product', data);
}
const getAllProductByType = (typeId) => {
    return axios.get(`http://localhost:8080/api/Product/typeId?typeId=${typeId}`);
}
const editProduct = (data, token) => {
    return axios.put('http://localhost:8080/api/Product', data,
        { headers: { 'x_authorization': token, 'Accept': 'application/json', 'Content-Type': 'application/json' } }
    );
}
const createProduct = (data, token) => {
    return axios.post('http://localhost:8080/api/Product', data,
        { headers: { 'x_authorization': token, 'Accept': 'application/json', 'Content-Type': 'application/json' } }
    );
}
const deleteProduct = (id, token) => {
    return axios.delete('http://localhost:8080/api/Product', {
        data: { id: id },
        headers: { 'x_authorization': token, 'Accept': 'application/json', 'Content-Type': 'application/json' }
    }
    );
}
const getAllProductSearch = (text) => {
    return axios.get(`http://localhost:8080/api/Product/search?text=${text}`);
}
const getAllOneProduct = (id) => {
    return axios.get(`http://localhost:8080/api/Product/id?id=${id}`);
}
export {
    getAllProduct, getAllProductByType, createProduct, deleteProduct, getAllProductSearch, editProduct, getAllOneProduct
}