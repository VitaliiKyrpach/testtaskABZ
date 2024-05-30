import axios from 'axios';
const baseURL = "https://frontend-test-assignment-api.abz.agency/api/v1";

export const getData = async (page=1)=>{
    const response = await axios.get(`${baseURL}/users`, {
        params: {count:6, page: page}
    });
    return response;
}