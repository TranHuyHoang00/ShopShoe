import axios from "axios";

const getAllUser = (data, token) => {
    return axios.post('http://localhost:8080/api/Get/User', data,
        { headers: { 'x_authorization': token, 'Accept': 'application/json', 'Content-Type': 'application/json' } }
    );
}
const editUser = (data, token) => {
    return axios.put('http://localhost:8080/api/User', data,
        { headers: { 'x_authorization': token, 'Accept': 'application/json', 'Content-Type': 'application/json' } }
    );
}
const createUser = (data) => {
    return axios.post('http://localhost:8080/api/User', data
    );
}
const deleteUser = (id, token) => {
    return axios.delete('http://localhost:8080/api/User', {
        data: { id: id },
        headers: { 'x_authorization': token, 'Accept': 'application/json', 'Content-Type': 'application/json' }
    }
    );
}
const getAllUserSearch = (text) => {
    return axios.get(`http://localhost:8080/api/User/search?text=${text}`);
}
const getOneUser = (id) => {
    return axios.get(`http://localhost:8080/api/User/id?id=${id}`);
}
const changePassword = (data, token) => {
    return axios.post('http://localhost:8080/api/User/password', data,
        { headers: { 'x_authorization': token, 'Accept': 'application/json', 'Content-Type': 'application/json' } }
    );
}
export {
    getAllUser, createUser, deleteUser, getAllUserSearch, editUser, getOneUser, changePassword
}