import axios from "axios";

const getAllStatus = () => {
    return axios.get('http://localhost:8080/api/Status');
}
const editStatus = (data, token) => {
    return axios.put('http://localhost:8080/api/Status', data,
        { headers: { 'x_authorization': token, 'Accept': 'application/json', 'Content-Type': 'application/json' } }
    );
}
const createStatus = (data, token) => {
    return axios.post('http://localhost:8080/api/Status', data,
        { headers: { 'x_authorization': token, 'Accept': 'application/json', 'Content-Type': 'application/json' } }
    );
}
const deleteStatus = (id, token) => {
    return axios.delete('http://localhost:8080/api/Status', {
        data: { id: id },
        headers: { 'x_authorization': token, 'Accept': 'application/json', 'Content-Type': 'application/json' }
    }
    );
}
const getAllStatusSearch = (text) => {
    return axios.get(`http://localhost:8080/api/Status/search?text=${text}`);
}
export {
    getAllStatus, createStatus, deleteStatus, getAllStatusSearch, editStatus
}