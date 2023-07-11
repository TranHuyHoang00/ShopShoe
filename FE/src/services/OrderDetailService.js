import axios from "axios";

const getAllOrder_detailByOrder = (orderId, token) => {
    return axios.get(`http://localhost:8080/api/OrderDetail/orderId?orderId=${orderId}`,
        { headers: { 'x_authorization': token, 'Accept': 'application/json', 'Content-Type': 'application/json' } }
    );
}
export {
    getAllOrder_detailByOrder,
}