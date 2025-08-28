import { create } from 'zustand';

interface UiState {
    loginForm: {
        isSubmitting: boolean;
        showPassword: boolean;
    };
    dashboard: {
        isLoading: boolean;
    };
}

interface UiStore extends UiState {
    setLoginSubmitting: (isSubmitting: boolean) => void;
    togglePasswordVisibility: () => void;
    setDashboardLoading: (isLoading: boolean) => void;
}

export const useUiStore = create<UiStore>((set) => ({
    loginForm: {
        isSubmitting: false,
        showPassword: false,
    },
    dashboard: {
        isLoading: false,
    },

    setLoginSubmitting: (isSubmitting: boolean) =>
        set((state) => ({
            loginForm: { ...state.loginForm, isSubmitting },
        })),
    togglePasswordVisibility: () =>
        set((state) => ({
            loginForm: {
                ...state.loginForm,
                showPassword: !state.loginForm.showPassword,
            },
        })),

    setDashboardLoading: (isLoading: boolean) =>
        set((state) => ({
            dashboard: { ...state.dashboard, isLoading },
        }))
}));