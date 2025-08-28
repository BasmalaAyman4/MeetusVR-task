import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { AuthState, LoginRequest } from '@/types/auth';
import { loginAction, logoutAction, checkAuthAction } from '@/lib/action';

interface AuthStore extends AuthState {
    login: (credentials: LoginRequest) => Promise<void>;
    logout: () => void;
    checkAuth: () => Promise<void>;
    clearError: () => void;
}



export const useAuthStore = create<AuthStore>()(
    persist(
        (set, get) => ({
            user: null,
            token: null,
            isAuthenticated: false,
            isLoading: false,
            error: null,

            login: async (credentials: LoginRequest) => {
                set({ isLoading: true, error: null });

                try {
                    const result = await loginAction(credentials);

                    if (result.success) {
                        const authCheck = await checkAuthAction();
                        if (authCheck.authenticated) {
                            set({
                                user: authCheck.user,
                                token: authCheck.token,
                                isAuthenticated: true,
                                isLoading: false,
                                error: null,
                            });
                        }
                    } else {
                        throw new Error(result.error);
                    }
                } catch (error) {
                    set({
                        error: error instanceof Error ? error.message : 'Login failed',
                        isLoading: false,
                        isAuthenticated: false,
                        user: null,
                        token: null,
                    });
                    throw error;
                }
            },

            logout: () => {
                logoutAction();
                set({
                    user: null,
                    token: null,
                    isAuthenticated: false,
                    error: null,
                });
            },

            checkAuth: async () => {
                set({ isLoading: true });

                try {
                    const result = await checkAuthAction();

                    if (result.authenticated) {
                        set({
                            user: result.user,
                            token: result.token,
                            isAuthenticated: true,
                            isLoading: false,
                            error: null,
                        });
                    } else {
                        set({
                            user: null,
                            token: null,
                            isAuthenticated: false,
                            isLoading: false,
                            error: null,
                        });
                    }
                } catch (error) {
                    set({
                        user: null,
                        token: null,
                        isAuthenticated: false,
                        isLoading: false,
                        error: null,
                    });
                }
            },

            clearError: () => {
                set({ error: null });
            },

        }),
        {
            name: 'auth-storage',
            storage: createJSONStorage(() => localStorage),
            partialize: (state) => ({
                user: state.user,
                isAuthenticated: state.isAuthenticated,
            }),
        }
    )
);