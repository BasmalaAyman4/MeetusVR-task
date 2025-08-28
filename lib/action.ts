'use server';

import { redirect } from 'next/navigation';
import { getUserInfo, loginUser } from './api';
import { setAuthCookie, clearAuthCookie, getAuthToken } from './auth';

export async function loginAction(credentials: { email: string; password: string }) {
    try {
        const authResponse = await loginUser(credentials);
        await setAuthCookie(authResponse.token);

        return { success: true, token: authResponse.token };
    } catch (error) {
        return {
            success: false,
            error: error instanceof Error ? error.message : 'Login failed'
        };
    }
}

export async function logoutAction() {
    await clearAuthCookie();
    redirect('/');
}

export async function checkAuthAction() {
    const token = await getAuthToken();
    if (!token) return { authenticated: false };

    try {
        const userInfo = await getUserInfo(token);
        return { authenticated: true, user: userInfo, token };
    } catch (error) {
        await clearAuthCookie();
        return { authenticated: false };
    }
}