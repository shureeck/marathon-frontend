import axios from 'axios';
const tokenJSON = () => { 
    console.log(localStorage);
    return JSON.parse(localStorage.getItem('token'))?.token 
};
const api = axios.create({
    baseURL: 'https://oapec6r46c.execute-api.eu-west-1.amazonaws.com/PROD',
    headers: { "Authorization": tokenJSON() }
});

export default api;