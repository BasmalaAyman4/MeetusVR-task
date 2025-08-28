export interface LoginRequest{
    email:string,
    password:string
}

export interface LoginResponse{
    token:string,
    refreshToken?:string
}

export interface UserInfo {
    id: string;
    name: string;
}

export interface AuthState {
    user: UserInfo | null;
    token: string | null;
    isAuthenticated: boolean;
    isLoading: boolean;
    error: string | null;
}

