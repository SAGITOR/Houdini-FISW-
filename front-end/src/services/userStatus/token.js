import { SECRET_KEY } from '../../consts';
import CryptoJS from 'crypto-js';
import axios from 'axios';
import {userInformation} from '../databaBase';

const dbtk = 'DB_TK';
//Y SI EL TOKEN NO ES VALIDO?
//REVALIDAR TOKEN O HACERLO MUY DURADERO?
export const setToken = async (token) => {
    try{
        localStorage.setItem(dbtk, CryptoJS.AES.encrypt(token, SECRET_KEY));
        axiosInterceptors();
        const response = await userInformation();
        if(!response.data){//estudiar mas
            return {
                response,
                hasError: true
            }
        }
        return response.data;
    }catch(error){
        console.log(error);
        return error;
    }
}

export const getToken = () => {
    try{
        return CryptoJS.AES.decrypt(localStorage.getItem(dbtk).toString(), SECRET_KEY).toString(CryptoJS.enc.Utf8);
    }catch(error){
        return null;
    }

}

export const deleteToken = () => {
    try{
        localStorage.removeItem(dbtk);
        return { hasError : false }
    }catch(error){
        return {
            hasError: true,
            error
        }
    }
}

export const axiosInterceptors = () => {
    const token = getToken();
    if (token) {
        return axios.defaults.headers.common['x-access-token'] = token;
    } else {
        return axios.defaults.headers.common['x-access-token'] = null;
    }
}