import { API_DATABASE, userEndpoint, documentsEndpoint } from '../../consts';
import axios from 'axios';

export const validateUser = async(email, password) =>{
    try{
        const response = await axios.post(`${API_DATABASE}${userEndpoint}/authenticate`, {email: email, password: password});
        return response.data;
    }catch (error){
        return {
            hasError: true,
            error
        }
    }
}

export const createUser = async (name, email, password) => {
    try{
        const response = await axios.post(`${API_DATABASE}${userEndpoint}/create`, {name: name, email: email, password: password});
        return response.data;
    }catch (error) {
        return {
            hasError : true,
            error
        }
    }

}

export const userInformation = async() => {
    try{
        const response = await axios.get(`${API_DATABASE}${userEndpoint}/information` );
        return response.data;
    }catch (error){
        return {
            success: false,
            error
        }
    }
}
//DOCUMENTS
export const getDocuments = async() => {
    try{
        const response = await axios.get(`${API_DATABASE}${documentsEndpoint}/getDocuments` );
        return response.data;
    }catch (error){
        return {
            success: false,
            error
        }
    }
}

export const getDocument = async(idDocument) => {
    try{
        const response = await axios.post(`${API_DATABASE}${documentsEndpoint}/getDocument`, {id: idDocument});
        return response.data;
    }catch (error){
        return {
            success: false,
            error
        }
    }
}

export const createDocument = async(title, content) => {
    try{
        const response = await axios.post(`${API_DATABASE}${documentsEndpoint}/createDocument`, {title: title, content: content});
        return response.data;
    }catch (error){
        return {
            success: false,
            error
        }
    }
}

export const updateDocument = async(idDocument, title, content) => {
    try{
        const response = await axios.put(`${API_DATABASE}${documentsEndpoint}/updateDocument`, { _id: idDocument, updateContent:{title: title, content: content } } );
        return response.data;
    }catch (error){
        return {
            success: false,
            error
        }
    }
}

export const deleteDocument = async(idDocument) => {
    try{
        const response = await axios.delete(`${API_DATABASE}${documentsEndpoint}/deleteDocument`,  { params: {id: idDocument} } );
        return response.data;
    }catch (error){
        return {
            success: false,
            error
        }
    }
}