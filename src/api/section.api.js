import axios from 'axios'
import { BASE_API_URL } from "./api.config";

const getSuggestions = params => axios.post(`${BASE_API_URL}/get-suggestions`, params);
const getStructure = () => axios.get(`${BASE_API_URL}/get-structure`);

export { getSuggestions,getStructure }