import { LoginRequest, LoginResponse, UserInfo } from '@/types/auth';

const API_BASE = 'https://api-yeshtery.dev.meetusvr.com/v1';

export async function loginUser(credentials: LoginRequest): Promise<LoginResponse> {
    const response = await fetch(`${API_BASE}/yeshtery/token`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            email: credentials.email,
            password: credentials.password,
            isEmployee: true,
        }),
    });

    if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || 'Invalid credentials');
    }
    return response.json();
}

export async function getUserInfo(token: string): Promise<UserInfo> {
    const response = await fetch(`${API_BASE}/user/info`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
    });

    if (!response.ok) {
        if (response.status === 401) {
            throw new Error('Token expired or invalid');
        }
        throw new Error('Failed to fetch user info');
    }

    return response.json();
}