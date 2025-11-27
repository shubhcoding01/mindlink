// import api from "./axios";

// export interface LoginPayload {
//   email: string;
//   password: string;
// }

// export interface RegisterPayload {
//   name: string;
//   email: string;
//   password: string;
// }

// export const loginUser = (data: LoginPayload) => api.post("/auth/login", data);

// export const registerUser = (data: RegisterPayload) =>
//   api.post("/auth/register", data);

import axios from '@/lib/axios';
import { UserProfile } from '@/types/user'; // Assuming you create a types/user.ts file

interface AuthTokens {
    accessToken: string;
    refreshToken: string;
}

const AUTH_KEYS = {
    ACCESS_TOKEN: 'access_token',
    REFRESH_TOKEN: 'refresh_token',
};

/**
 * Handles all client-side authentication logic.
 */
export const Auth = {

    /**
     * Stores JWT tokens in local storage.
     */
    setTokens(tokens: AuthTokens): void {
        localStorage.setItem(AUTH_KEYS.ACCESS_TOKEN, tokens.accessToken);
        localStorage.setItem(AUTH_KEYS.REFRESH_TOKEN, tokens.refreshToken);
        // Optional: Update the default Axios header
        axios.defaults.headers.common['Authorization'] = `Bearer ${tokens.accessToken}`;
    },

    /**
     * Retrieves the current access token.
     */
    getAccessToken(): string | null {
        return localStorage.getItem(AUTH_KEYS.ACCESS_TOKEN);
    },

    /**
     * Clears all tokens and logs the user out.
     */
    logout(): void {
        localStorage.removeItem(AUTH_KEYS.ACCESS_TOKEN);
        localStorage.removeItem(AUTH_KEYS.REFRESH_TOKEN);
        delete axios.defaults.headers.common['Authorization'];
    },

    /**
     * Checks if the user is authenticated by verifying the presence of the access token.
     */
    isAuthenticated(): boolean {
        return !!Auth.getAccessToken();
    },

    /**
     * Attempts to refresh the access token using the stored refresh token.
     * (Requires a working backend /api/auth/refresh endpoint)
     */
    async refreshAccessToken(): Promise<boolean> {
        const refreshToken = localStorage.getItem(AUTH_KEYS.REFRESH_TOKEN);
        if (!refreshToken) {
            Auth.logout();
            return false;
        }

        try {
            const response = await axios.post('/auth/refresh', { refresh_token: refreshToken });
            const newTokens: AuthTokens = {
                accessToken: response.data.access_token,
                refreshToken: response.data.refresh_token || refreshToken, // Refresh token might also be updated
            };
            Auth.setTokens(newTokens);
            return true;
        } catch (error) {
            console.error('Token refresh failed', error);
            Auth.logout();
            return false;
        }
    },
    
    /**
     * Retrieves the current user profile (mocked for now, usually done via /api/auth/me)
     */
    async getCurrentUser(): Promise<UserProfile | null> {
        if (!Auth.isAuthenticated()) return null;
        
        // --- MOCK RESPONSE ---
        return {
            id: 'user-123',
            name: 'Alex MindLink',
            email: 'alex@mindlink.com',
            role: 'user',
            learningStyle: 'Visual',
            streak: 15
        } as UserProfile;
        
        // --- REAL API CALL ---
        /*
        try {
            const response = await axios.get('/auth/me');
            return response.data as UserProfile;
        } catch (error) {
            console.error('Failed to fetch user profile', error);
            Auth.logout();
            return null;
        }
        */
    }
};