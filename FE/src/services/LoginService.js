import axios from "axios";
const Login = (phone, password) => {
    return axios.post('http://localhost:8080/api/Login', { phone: phone, password: password });
}
export {
    Login
}