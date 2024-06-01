import axios from "axios";
const baseURL = "https://frontend-test-assignment-api.abz.agency/api/v1";

const setToken = (token) => {
  axios.defaults.headers.post["token"] = token;
};

export const getRadio = async () => {
  try {
    const response = await axios.get(`${baseURL}/positions`);
    return response;
  } catch (error) {
    console.log(error.message);
  }
};

export const getToken = async () => {
  try {
    const response = await axios.get(`${baseURL}/token`);
    setToken(response.data.token);
    return response;
  } catch (error) {
    console.log(error.message);
  }
};
