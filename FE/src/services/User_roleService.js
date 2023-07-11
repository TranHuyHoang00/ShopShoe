import axios from "axios";

const createUser_role = (data, token) => {
    return axios.post('http://localhost:8080/api/User_role', data,
        { headers: { 'x_authorization': token, 'Accept': 'application/json', 'Content-Type': 'application/json' } }
    );
}
const deleteUser_role = (data, token) => {
    return axios.delete('http://localhost:8080/api/User_role', {
        data,
        headers: { 'x_authorization': token, 'Accept': 'application/json', 'Content-Type': 'application/json' }
    }
    );
}

export {
    createUser_role, deleteUser_role
}