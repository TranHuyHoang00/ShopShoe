import axios from "axios";

const getAllRole = () => {
    return axios.get('http://localhost:8080/api/Role');
}
const editRole = (data, token) => {
    return axios.put('http://localhost:8080/api/Role', data,
        { headers: { 'x_authorization': token, 'Accept': 'application/json', 'Content-Type': 'application/json' } }
    );
}
const createRole = (data, token) => {
    return axios.post('http://localhost:8080/api/Role', data,
        { headers: { 'x_authorization': token, 'Accept': 'application/json', 'Content-Type': 'application/json' } }
    );
}
const deleteRole = (id, token) => {
    return axios.delete('http://localhost:8080/api/Role', {
        data: { id: id },
        headers: { 'x_authorization': token, 'Accept': 'application/json', 'Content-Type': 'application/json' }
    }
    );
}
const getAllRoleSearch = (text) => {
    return axios.get(`http://localhost:8080/api/Role/search?text=${text}`);
}
export {
    getAllRole, createRole, deleteRole, getAllRoleSearch, editRole
}