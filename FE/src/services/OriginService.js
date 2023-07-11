import axios from "axios";

const getAllOrigin = () => {
    return axios.get('http://localhost:8080/api/Origin');
}
const editOrigin = (data, token) => {
    return axios.put('http://localhost:8080/api/Origin', data,
        { headers: { 'x_authorization': token, 'Accept': 'application/json', 'Content-Type': 'application/json' } }
    );
}
const createOrigin = (data, token) => {
    return axios.post('http://localhost:8080/api/Origin', data,
        { headers: { 'x_authorization': token, 'Accept': 'application/json', 'Content-Type': 'application/json' } }
    );
}
const deleteOrigin = (id, token) => {
    return axios.delete('http://localhost:8080/api/Origin', {
        data: { id: id },
        headers: { 'x_authorization': token, 'Accept': 'application/json', 'Content-Type': 'application/json' }
    }
    );
}
const getAllOriginSearch = (text) => {
    return axios.get(`http://localhost:8080/api/Origin/search?text=${text}`);
}
export {
    getAllOrigin, createOrigin, deleteOrigin, getAllOriginSearch, editOrigin
}