/**
 * @vitest-environment jsdom
 */
import { describe, it, expect, beforeEach, vi } from 'vitest';
import axios from 'axios';
import Cookies from 'js-cookie';
import router from '../router';
import { setupAxiosInterceptors } from '../api/axios';
import { setActivePinia, createPinia } from 'pinia';
import { useUserStore } from '../stores/UserStore';

describe('Global 401 Unauthorized Response Interceptor', () => {
  beforeEach(() => {
    setActivePinia(createPinia());
    localStorage.clear();
    sessionStorage.clear();
    vi.clearAllMocks();
  });

  it('clears storage and cookies, resets user store, and redirects on 401 for protected routes when on another page', async () => {
    setupAxiosInterceptors();

    window.history.pushState({}, '', '/marcador');

    localStorage.setItem('token', 'sample-token');
    localStorage.setItem('user-info', JSON.stringify({ name: 'John' }));
    sessionStorage.setItem('temp', 'value');
    Cookies.set('sanctum-session', 'sample-token');
    Cookies.set('user-info', JSON.stringify({ name: 'John' }));

    const userStore = useUserStore();
    userStore.updateUserInfo({ name: 'John', email: 'john@test.com', team: { logo: '' }, img: '' }, 'sample-token');
    expect(userStore.isAuthenticated).toBe(true);

    const routerPushSpy = vi.spyOn(router, 'push').mockImplementation(() => Promise.resolve() as any);

    // Mock an axios error response with 401 for a protected route
    const error401 = {
      response: { status: 401, data: { message: 'Unauthenticated.' } },
      config: { url: 'https://api.example.com/quiniela/1' }
    };

    // Obtain the interceptor error handler
    const responseInterceptor = (axios.interceptors.response as any).handlers[
      (axios.interceptors.response as any).handlers.length - 1
    ];

    await expect(responseInterceptor.rejected(error401)).rejects.toEqual(error401);

    expect(localStorage.getItem('token')).toBeNull();
    expect(localStorage.getItem('user-info')).toBeNull();
    expect(sessionStorage.getItem('temp')).toBeNull();
    expect(Cookies.get('sanctum-session')).toBeUndefined();
    expect(Cookies.get('user-info')).toBeUndefined();
    expect(userStore.isAuthenticated).toBe(false);
    expect(routerPushSpy).toHaveBeenCalledWith('/');
  });

  it('does NOT clear session or redirect when 401 occurs on a login request', async () => {
    setupAxiosInterceptors();

    localStorage.setItem('token', 'existing-token');
    Cookies.set('sanctum-session', 'existing-token');

    const routerPushSpy = vi.spyOn(router, 'push').mockImplementation(() => Promise.resolve() as any);

    const loginError401 = {
      response: { status: 401, data: { message: 'Invalid credentials.' } },
      config: { url: 'https://api.example.com/login' }
    };

    const responseInterceptor = (axios.interceptors.response as any).handlers[
      (axios.interceptors.response as any).handlers.length - 1
    ];

    await expect(responseInterceptor.rejected(loginError401)).rejects.toEqual(loginError401);

    expect(localStorage.getItem('token')).toBe('existing-token');
    expect(Cookies.get('sanctum-session')).toBe('existing-token');
    expect(routerPushSpy).not.toHaveBeenCalled();
  });

  it('does NOT clear session or redirect when 401 occurs on a register request', async () => {
    setupAxiosInterceptors();

    localStorage.setItem('token', 'existing-token');
    Cookies.set('sanctum-session', 'existing-token');

    const routerPushSpy = vi.spyOn(router, 'push').mockImplementation(() => Promise.resolve() as any);

    const registerError401 = {
      response: { status: 401, data: { message: 'Unauthorized registration.' } },
      config: { url: 'https://api.example.com/register' }
    };

    const responseInterceptor = (axios.interceptors.response as any).handlers[
      (axios.interceptors.response as any).handlers.length - 1
    ];

    await expect(responseInterceptor.rejected(registerError401)).rejects.toEqual(registerError401);

    expect(localStorage.getItem('token')).toBe('existing-token');
    expect(Cookies.get('sanctum-session')).toBe('existing-token');
    expect(routerPushSpy).not.toHaveBeenCalled();
  });
});
