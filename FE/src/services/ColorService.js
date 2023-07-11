import axios from "axios";

const getAllColor = () => {
    return axios.get('http://localhost:8080/api/Color');
}
const editColor = (data, token) => {
    return axios.put('http://localhost:8080/api/Color', data,
        { headers: { 'x_authorization': token, 'Accept': 'application/json', 'Content-Type': 'application/json' } }
    );
}
const createColor = (data, token) => {
    return axios.post('http://localhost:8080/api/Color', data,
        { headers: { 'x_authorization': token, 'Accept': 'application/json', 'Content-Type': 'application/json' } }
    );
}
const deleteColor = (id, token) => {
    return axios.delete('http://localhost:8080/api/Color', {
        data: { id: id },
        headers: { 'x_authorization': token, 'Accept': 'application/json', 'Content-Type': 'application/json' }
    }
    );
}
const getAllColorSearch = (text) => {
    return axios.get(`http://localhost:8080/api/Color/search?text=${text}`);
}
export {
    getAllColor, createColor, deleteColor, getAllColorSearch, editColor
}