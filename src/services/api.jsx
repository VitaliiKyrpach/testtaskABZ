import axios from 'axios';
const baseURL = "https://frontend-test-assignment-api.abz.agency/api/v1";

const setToken = token => {
  axios.defaults.headers.post['token'] = token;
};

export const getData = async (page = 1) => {
    try {
        const response = await axios.get(`${baseURL}/users`, {
        params: {count:6, page: page}
        });
        return response;
     }
    catch (error) {
        console.log(error.message)
    }  
}

export const getRadio = async () => {
    try {
        const response = await axios.get(`${baseURL}/positions`);
        return response;
     }
    catch (error) {
        console.log(error.message)
    }  
}

export const getToken = async () => {
    try {
        const response = await axios.get(`${baseURL}/token`);
        setToken(response.data.token)
        return response;
     }
    catch (error) {
        console.log(error.message)
    }  
}

export const createUser = async (data) => {    
    try {
        const response = await axios.post(`${baseURL}/users`, data,
        {
            headers: {
                'Content-Type': 'multipart/form-data',
            }
        }
        )
        console.log(response)
        return response;
    }
    catch (error) {
        console.log(error.message)
    }

}