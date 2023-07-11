import axios from "axios";

const editDetail = (data, token) => {
    return axios.put('http://localhost:8080/api/Detail', data,
        { headers: { 'x_authorization': token, 'Accept': 'application/json', 'Content-Type': 'application/json' } }
    );
}
const createDetail = (data, token) => {
    return axios.post('http://localhost:8080/api/Detail', data,
        { headers: { 'x_authorization': token, 'Accept': 'application/json', 'Content-Type': 'application/json' } }
    );
}
const deleteDetail = (id, token) => {
    return axios.delete('http://localhost:8080/api/Detail', {
        data: { id: id },
        headers: { 'x_authorization': token, 'Accept': 'application/json', 'Content-Type': 'application/json' }
    }
    );
}

export {
    createDetail, deleteDetail, editDetail
}