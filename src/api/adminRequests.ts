import axios from "axios";
import Cookies from "js-cookie";

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
    const { data } = await axios.delete(import.meta.env.VITE_API_URL + 'weeks/' + id, {
        headers: {
            Authorization: `Bearer ${Cookies.get('sanctum-session')}`,
        },
    });
    
    return data;
}

export const saveMatch: any = async(match: any) => {
    const { data } = await axios.post(import.meta.env.VITE_API_URL + 'matches', match, {
        headers: {
            Authorization: `Bearer ${Cookies.get('sanctum-session')}`,
        },
    });
    
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