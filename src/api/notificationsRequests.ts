import axios from 'axios';
import Cookies from 'js-cookie';

export const getActiveNotifications: any = async() => {
    const { data } = await axios.get(import.meta.env.VITE_API_URL + 'notifications', {
        headers: {
            Authorization: `Bearer ${Cookies.get('sanctum-session')}`,
        },
    });
    
    return data;
}