import axios from "axios";
import Cookies from "js-cookie";
import { toast } from "../utils/toast";
import { getUserInfo } from "./sessionRequests";
import { useUserStore } from '../stores/UserStore';
import router from '../router';

export const getSeasons: any = async() => {
    const { data } = await axios.get(import.meta.env.VITE_API_URL + 'seasons', {
        headers: {
            Authorization: `Bearer ${Cookies.get('sanctum-session')}`,
        },
    });

    return data;
}

export const updateSeason: any = async(id: number) => {
    const { data } = await axios.put(import.meta.env.VITE_API_URL + 'seasons/' + id, {}, {
        headers: {
            Authorization: `Bearer ${Cookies.get('sanctum-session')}`,
        },
    });

    toast('Temporada Actualizada', {});
    
    return data;
}

export const updateSeasonRegister: any = async(id: number, status: any) => {
    const { data } = await axios.put(import.meta.env.VITE_API_URL + 'seasons/' + id + '/register', { status }, {
        headers: {
            Authorization: `Bearer ${Cookies.get('sanctum-session')}`,
        },
    });
    
    return data;
}

export const saveWeek: any = async(week: any) => {
    const { data } = await axios.post(import.meta.env.VITE_API_URL + 'weeks', week, {
        headers: {
            Authorization: `Bearer ${Cookies.get('sanctum-session')}`,
        },
    });

    toast('ok!', {});
    
    return data;
}

export const getWeeks: any = async(id: number) => {
    const { data } = await axios.get(import.meta.env.VITE_API_URL + 'weeks', {
        headers: {
            Authorization: `Bearer ${Cookies.get('sanctum-session')}`,
        },
    });
    
    return data;
}

export const deleteWeek: any = async(id: number) => {
    await axios.delete(import.meta.env.VITE_API_URL + 'weeks/' + id, {
        headers: {
            Authorization: `Bearer ${Cookies.get('sanctum-session')}`,
        },
    }).then((response) => {
        toast('ok!', {});
    }).catch((error) => {
        toast(error.response.data.message, { type: 'error' });
    });
}

export const updateWeek: any = async(id: number) => {
    const { data } = await axios.put(import.meta.env.VITE_API_URL + 'weeks/' + id, {}, {
        headers: {
            Authorization: `Bearer ${Cookies.get('sanctum-session')}`,
        },
    });

    toast('ok!', {});

    return data;
}

export const saveMatch: any = async(match: any) => {
    const { data } = await axios.post(import.meta.env.VITE_API_URL + 'matches', match, {
        headers: {
            Authorization: `Bearer ${Cookies.get('sanctum-session')}`,
        },
    });

    toast('ok!', {});
    
    return data;
}

export const getUsers: any = async() => {
    const { data } = await axios.get(import.meta.env.VITE_API_URL + 'users', {
        headers: {
            Authorization: `Bearer ${Cookies.get('sanctum-session')}`,
        },
    });
    
    return data;
}

export const addMatch: any = async(id: number, team_id: number, team_id_2: number) => {
    const { data } = await axios.post(import.meta.env.VITE_API_URL+ 'match/' + id , { id, team_id, team_id_2 }, {
        headers: {
            Authorization: `Bearer ${Cookies.get('sanctum-session')}`,
        },
    });

    toast('ok!', {});
    
    return data;
} 

export const getMatches: any = async(id: number) => {
    const { data } = await axios.get(import.meta.env.VITE_API_URL + 'matches/' + id, {
        headers: {
            Authorization: `Bearer ${Cookies.get('sanctum-session')}`,
        },
    });
    
    return data;
}

export const getMatch: any = async(id: number) => {
    const { data } = await axios.get(import.meta.env.VITE_API_URL + 'match/' + id, {
        headers: {
            Authorization: `Bearer ${Cookies.get('sanctum-session')}`,
        },
    });
    
    return data;
}

export const deleteMatch: any = async(id: number) => {
    await axios.delete(import.meta.env.VITE_API_URL + 'match/' + id, {
        headers: {
            Authorization: `Bearer ${Cookies.get('sanctum-session')}`,
        },
    }).then((response) => {
        toast('ok!', {});
    }).catch((error) => {
        toast(error.response.data.message, { type: 'error' });
    });
}

export const updateMatch: any = async(id: number, match: any) => {
    const { data } = await axios.put(import.meta.env.VITE_API_URL + 'match/' + id, match, {
        headers: {
            Authorization: `Bearer ${Cookies.get('sanctum-session')}`,
        },
    });

    toast('ok!', {});
    
    return data;
}

export const deleteUser: any = async(id: number) => {
    await axios.delete(import.meta.env.VITE_API_URL + 'participants/' + id, {
        headers: {
            Authorization: `Bearer ${Cookies.get('sanctum-session')}`,
        },
    }).then((response) => {
        toast('Usuario eliminado!', {type:'warning'});
    }).catch((error) => {
        toast(error.response.data.message, { type: 'error' });
    });
}

export const updateUserStatus: any = async(id: number, ...params: any) => {
    await axios.put(import.meta.env.VITE_API_URL + 'participants/' + id , { ...params }, {
        headers: {
            Authorization: `Bearer ${Cookies.get('sanctum-session')}`,
        },
    }).then((response) => {
        toast('ok!', {});
    }).catch((error) => {
        toast(error.response.data.message, { type: 'error' });
    });
}

export const updatePassword: any = async(userId: number, password: string, password_confirmation: string) => {
    await axios.put(import.meta.env.VITE_API_URL + 'participants/' + userId + '/password', { password, password_confirmation }, {
        headers: {
            Authorization: `Bearer ${Cookies.get('sanctum-session')}`,
        },
    }).then((response) => {
        toast('ok!', {});
    }).catch((error) => {
        toast(error.response.data.message, { type: 'error' });
    });
}

export const updateUserName: any = async(userId: number, name: string) => {
    await axios.put(import.meta.env.VITE_API_URL + 'participants/' + userId + '/name', { name }, {
        headers: {
            Authorization: `Bearer ${Cookies.get('sanctum-session')}`,
        },
    }).then((response) => {
        toast('ok!', {});
    }).catch((error) => {
        toast(error.response.data.message, { type: 'error' });
    });
}

export const loginAsUser: any = async(userId: number) => {
    const userStore = useUserStore();

    await axios.get(import.meta.env.VITE_API_URL + 'participants/' + userId + '/login',  {
        headers: {
            Authorization: `Bearer ${Cookies.get('sanctum-session')}`,
        },
    }).then(async (response) => {
        toast('Admin cerrado!', {type: 'info'});
        toast('Logueado como ' + response.data.user.name + '!', {});
        const { data } = await getUserInfo(response.data.token);

        userStore.updateUserInfo(data, response.data.token);

        Cookies.set('sanctum-session', response.data.token, { expires: 7 , path: '', domain: import.meta.env.VITE_COOKIE_DOMAIN });
        
        Cookies.set('user-info', JSON.stringify(data), { expires: 7 , path: '', domain: import.meta.env.VITE_COOKIE_DOMAIN });

        router.push('/mi-quiniela');
    }).catch((error) => {
        toast(error.response.data.message, { type: 'error' });
    });
}

export const uploadBackgroundFile = async(file: any) => {
    await axios.post(import.meta.env.VITE_API_URL + 'backgrounds', file, {
        headers: {
            Authorization: `Bearer ${Cookies.get('sanctum-session')}`,
            'Content-Type': 'multipart/form-data',
        },
    }).then((response) => {
        toast('ok!', {});
    }).catch((error) => {
        toast(error.response.data.message, { type: 'error' });
    });
}

export const getAllBackgrounds = async() => {
    const { data } = await axios.get(import.meta.env.VITE_API_URL + 'backgrounds', {
        headers: {
            Authorization: `Bearer ${Cookies.get('sanctum-session')}`,
        },
    });

    return data;
}

export const deleteBackground = async(name: string) => {
    await axios.delete(import.meta.env.VITE_API_URL + 'backgrounds', {
        params: {
            name,
        },
        headers: {
            Authorization: `Bearer ${Cookies.get('sanctum-session')}`,
        },
    }).then((response) => {
        toast('ok!', {type: 'info'});
    }).catch((error) => {
        toast('No se pudo eliminar el fondo', {type: 'error'});
    });
}

