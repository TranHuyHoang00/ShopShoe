import axios from "axios";

const getAllType = () => {
    return axios.get('http://localhost:8080/api/Type');
}
const editType = (data, token) => {
    return axios.put('http://localhost:8080/api/Type', data,
        { headers: { 'x_authorization': token, 'Accept': 'application/json', 'Content-Type': 'application/json' } }
    );
}
const createType = (data, token) => {
    return axios.post('http://localhost:8080/api/Type', data,
        { headers: { 'x_authorization': token, 'Accept': 'application/json', 'Content-Type': 'application/json' } }
    );
}
const deleteType = (id, token) => {
    return axios.delete('http://localhost:8080/api/Type', {
        data: { id: id },
        headers: { 'x_authorization': token, 'Accept': 'application/json', 'Content-Type': 'application/json' }
    }
    );
}
const getAllTypeSearch = (text) => {
    return axios.get(`http://localhost:8080/api/Type/search?text=${text}`);
}
export {
    getAllType, createType, deleteType, getAllTypeSearch, editType
}