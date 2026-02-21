import Cookies from 'js-cookie';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000';

interface ApiResponse<T = any> {
    data?: T;
    error?: string;
}

async function request<T>(
    endpoint: string,
    options: RequestInit = {}
): Promise<ApiResponse<T>> {
    const token = Cookies.get('accessToken');

    const headers: Record<string, string> = {
        'Content-Type': 'application/json',
        ...(options.headers as Record<string, string>),
    };

    // 토큰이 있으면 헤더에 추가
    if (token) {
        headers['Authorization'] = `Bearer ${token}`;
    }

    try {
        const response = await fetch(`${API_BASE_URL}${endpoint}`, {
            ...options,
            headers,
            credentials: 'include', // 쿠키 자동 전송
        });

        const data = await response.json();

        if (!response.ok) {
            return { error: data.message || 'An error occurred' };
        }

        return { data };
    } catch {
        return { error: 'Network error. Please try again.' };
    }
}

export const api = {
    // 로그인
    login: async (email: string, password: string) => {
        return request('/api/login', {
            method: 'POST',
            body: JSON.stringify({ email, password }),
        });
    },

    // 회원가입
    signup: async (email: string, password: string) => {
        return request('/api/v1/register', {
            method: 'POST',
            body: JSON.stringify({ email, password }),
        });
    },

    // 현재 유저 정보 가져오기
    me: async () => {
        return request('/api/v1/me');
    },

    // 로그아웃
    logout: async () => {
        return request('/api/logout', {
            method: 'POST',
        });
    },
};
