import axios from 'axios'

import { mock_options } from "../components/mock-options";

const BASE_API_URL = 'https://admin.soarerazvan.com/tapnotes-mock'


const getSuggestions = params => axios.post(`${BASE_API_URL}/get-suggestions`, params);

const getStructure = () => axios.get(`${BASE_API_URL}/get-structure`);

const mock_suggestions = params => {    
    if (params.want) { 
        return mock_options[params.want] 
    }     
    return [];
};

export { getSuggestions,getStructure, BASE_API_URL, mock_suggestions }