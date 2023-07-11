import axios from "axios";

const getAllBrand = () => {
    return axios.get('http://localhost:8080/api/Brand');
}
const editBrand = (data, token) => {
    return axios.put('http://localhost:8080/api/Brand', data,
        { headers: { 'x_authorization': token, 'Accept': 'application/json', 'Content-Type': 'application/json' } }
    );
}
const createBrand = (data, token) => {
    return axios.post('http://localhost:8080/api/Brand', data,
        { headers: { 'x_authorization': token, 'Accept': 'application/json', 'Content-Type': 'application/json' } }
    );
}
const deleteBrand = (id, token) => {
    return axios.delete('http://localhost:8080/api/Brand', {
        data: { id: id },
        headers: { 'x_authorization': token, 'Accept': 'application/json', 'Content-Type': 'application/json' }
    }
    );
}
const getAllBrandSearch = (text) => {
    return axios.get(`http://localhost:8080/api/Brand/search?text=${text}`);
}
export {
    getAllBrand, createBrand, deleteBrand, getAllBrandSearch, editBrand
}