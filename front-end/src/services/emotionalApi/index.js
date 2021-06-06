import { API_DATABASE } from '../../consts';
import axios from 'axios';

export const textAnalyze = async(text) => {
    try{
        const response = await axios.post(`${API_DATABASE}/api/keywords`, {sentence: text} );
        return response.data;
    }catch (error){
        return {
            success: false,
            error
        }
    }
}