import { cookies } from 'next/headers';
import { getUserInfo } from './api';

export async function setAuthCookie(token: string) {
    const cookieStore = await cookies();
    cookieStore.set('auth-token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 60 * 60 * 24 * 7, 
    });
}

export async function getAuthToken(): Promise<string | null> {
    const cookieStore = await cookies();
    return cookieStore.get('auth-token')?.value || null;
}

export async function clearAuthCookie() {
    const cookieStore = await cookies();
    cookieStore.delete('auth-token');
}

export async function getCurrentUser() {
    const token = await getAuthToken();
    if (!token) return null;

    try {
        const userInfo = await getUserInfo(token);
        return { userInfo, token };
    } catch (error) {
        await clearAuthCookie();
        return null;
    }
}