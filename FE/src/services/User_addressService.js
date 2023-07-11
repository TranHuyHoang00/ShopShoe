import axios from "axios";

const editUser_address = (data, token) => {
    return axios.put('http://localhost:8080/api/User_address', data,
        { headers: { 'x_authorization': token, 'Accept': 'application/json', 'Content-Type': 'application/json' } }
    );
}
const createUser_address = (data, token) => {
    return axios.post('http://localhost:8080/api/User_address', data,
        { headers: { 'x_authorization': token, 'Accept': 'application/json', 'Content-Type': 'application/json' } }
    );
}
const deleteUser_address = (id, token) => {
    return axios.delete('http://localhost:8080/api/User_address', {
        data: { id: id },
        headers: { 'x_authorization': token, 'Accept': 'application/json', 'Content-Type': 'application/json' }
    }
    );
}

export {
    createUser_address, deleteUser_address, editUser_address
}