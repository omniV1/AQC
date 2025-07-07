import axios, { AxiosInstance, AxiosResponse } from 'axios';

/**
 * ApiClient
 * -------------------------
 * Centralised Axios wrapper used by all frontend services.
 * – Sets baseURL from `VITE_API_BASE_URL` (defaults to `http://localhost:5000/api`)
 * – Automatically attaches the `Authorization: Bearer <token>` header if a token is stored in `localStorage`.
 * – Unwraps `data` so callers only receive the payload.
 */
export class ApiClient {
  private static _instance: ApiClient;
  private axios: AxiosInstance;

  private constructor() {
    const baseURL = process.env.VITE_API_BASE_URL || '/api';

    this.axios = axios.create({
      baseURL,
      withCredentials: false, // tokens handled manually, cookies not used
    });

    // Inject token before every request
    this.axios.interceptors.request.use(
      (config) => {
        const token = localStorage.getItem('token');
        if (token && config.headers) {
          (config.headers as Record<string, string>).Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => Promise.reject(error),
    );

    // Flatten Axios responses so we always return the payload directly
    this.axios.interceptors.response.use(
      (response: AxiosResponse) => response.data,
      async (error) => {
        const originalRequest = error.config;

        if (error.response && error.response.status === 401 && !(originalRequest as any)._retry) {
          (originalRequest as any)._retry = true;
          try {
            const newToken = await refreshAccessToken();
            if (originalRequest.headers) {
              originalRequest.headers.Authorization = `Bearer ${newToken}`;
            }
            return this.axios(originalRequest);
          } catch (refreshError) {
            localStorage.removeItem('token');
            localStorage.removeItem('refreshToken');
            return Promise.reject(refreshError);
          }
        }

        return Promise.reject(error);
      },
    );

    // --- Token refresh handling -----------------------------
    let isRefreshing = false;
    let refreshPromise: Promise<string> | null = null;

    const refreshAccessToken = async (): Promise<string> => {
      if (isRefreshing && refreshPromise) {
        return refreshPromise;
      }
      isRefreshing = true;
      const refreshToken = localStorage.getItem('refreshToken');
      if (!refreshToken) {
        isRefreshing = false;
        throw new Error('No refresh token available');
      }
      refreshPromise = axios
        .post(`${baseURL}/auth/refresh`, { refreshToken })
        .then((res) => {
          const newToken: string = res.data.data.accessToken;
          localStorage.setItem('token', newToken);
          return newToken;
        })
        .finally(() => {
          isRefreshing = false;
          refreshPromise = null;
        });
      return refreshPromise;
    };
  }

  public static getInstance(): ApiClient {
    if (!this._instance) {
      this._instance = new ApiClient();
    }
    return this._instance;
  }

  public get<T>(url: string, params?: unknown) {
    return this.axios.get<T>(url, { params });
  }

  public post<T>(url: string, data?: unknown) {
    return this.axios.post<T>(url, data);
  }

  public put<T>(url: string, data?: unknown) {
    return this.axios.put<T>(url, data);
  }

  public delete<T>(url: string) {
    return this.axios.delete<T>(url);
  }

  public patch<T>(url: string, data?: unknown) {
    return this.axios.patch<T>(url, data);
  }
} 