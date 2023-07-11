import axios from "axios";

const getAllCartByUser = (userId, token) => {
    return axios.get(`http://localhost:8080/api/Cart/userId?userId=${userId}`,
        { headers: { 'x_authorization': token, 'Accept': 'application/json', 'Content-Type': 'application/json' } }
    );
}
const createCart = (data, token) => {
    return axios.post('http://localhost:8080/api/Cart', data,
        { headers: { 'x_authorization': token, 'Accept': 'application/json', 'Content-Type': 'application/json' } }
    );
}
const deleteCart = (id, token) => {
    return axios.delete('http://localhost:8080/api/Cart', {
        data: { id: id },
        headers: { 'x_authorization': token, 'Accept': 'application/json', 'Content-Type': 'application/json' }
    }
    );
}

export {
    getAllCartByUser, createCart, deleteCart
}