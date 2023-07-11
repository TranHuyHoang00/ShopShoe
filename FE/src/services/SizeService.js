import axios from "axios";

const getAllSize = () => {
    return axios.get('http://localhost:8080/api/Size');
}
const editSize = (data, token) => {
    return axios.put('http://localhost:8080/api/Size', data,
        { headers: { 'x_authorization': token, 'Accept': 'application/json', 'Content-Type': 'application/json' } }
    );
}
const createSize = (data, token) => {
    return axios.post('http://localhost:8080/api/Size', data,
        { headers: { 'x_authorization': token, 'Accept': 'application/json', 'Content-Type': 'application/json' } }
    );
}
const deleteSize = (id, token) => {
    return axios.delete('http://localhost:8080/api/Size', {
        data: { id: id },
        headers: { 'x_authorization': token, 'Accept': 'application/json', 'Content-Type': 'application/json' }
    }
    );
}
const getAllSizeSearch = (text) => {
    return axios.get(`http://localhost:8080/api/Size/search?text=${text}`);
}
export {
    getAllSize, createSize, deleteSize, getAllSizeSearch, editSize
}