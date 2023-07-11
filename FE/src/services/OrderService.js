import axios from "axios";

const getAllOrder = (data, token) => {
    return axios.post('http://localhost:8080/api/Order', data,
        { headers: { 'x_authorization': token, 'Accept': 'application/json', 'Content-Type': 'application/json' } }
    );
}
const getAllOrderByUser = (data, token) => {
    return axios.post('http://localhost:8080/api/Order/userId', data,
        { headers: { 'x_authorization': token, 'Accept': 'application/json', 'Content-Type': 'application/json' } }
    );
}
const createOrder = (data, token) => {
    return axios.post('http://localhost:8080/api/Order/Create', data,
        { headers: { 'x_authorization': token, 'Accept': 'application/json', 'Content-Type': 'application/json' } }
    );
}
const deleteOrder = (id, token) => {
    return axios.delete('http://localhost:8080/api/Order', {
        data: { id: id },
        headers: { 'x_authorization': token, 'Accept': 'application/json', 'Content-Type': 'application/json' }
    }
    );
}
const editOrder = (data, token) => {
    return axios.put('http://localhost:8080/api/Order', data,
        { headers: { 'x_authorization': token, 'Accept': 'application/json', 'Content-Type': 'application/json' } }
    );
}
const getOneOrder = (id, token) => {
    return axios.get(`http://localhost:8080/api/Order/id?id=${id}`,
        { headers: { 'x_authorization': token, 'Accept': 'application/json', 'Content-Type': 'application/json' } }
    );
}
const Statistical = (data, token) => {
    return axios.post('http://localhost:8080/api/Order/Statistical', data,
        { headers: { 'x_authorization': token, 'Accept': 'application/json', 'Content-Type': 'application/json' } }
    );
}
export {
    createOrder, deleteOrder, getAllOrderByUser, getOneOrder, editOrder, getAllOrder, Statistical
}