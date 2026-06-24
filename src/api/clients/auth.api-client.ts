import { BaseApiClient } from '../../core/base.api-client';
import type { LoginRequest, LoginResponse, RegisterRequest, RegisterResponse } from '../models/auth.model';
import type { ApiResponse } from '../models/api-response.model';

export class AuthApiClient extends BaseApiClient {
  async login(credentials: LoginRequest): Promise<{ status: number; body: ApiResponse<LoginResponse> }> {
    const result = await this.post<ApiResponse<LoginResponse>>('/auth/login', {
      data: credentials,
    });

    // Auto-set token for subsequent requests
    if (result.status === 200 && result.body.data?.token) {
      this.setToken(result.body.data.token);
    }

    return { status: result.status, body: result.body };
  }

  async register(userData: RegisterRequest): Promise<{ status: number; body: ApiResponse<RegisterResponse> }> {
    return await this.post<ApiResponse<RegisterResponse>>('/auth/register', {
      data: userData,
    });
  }

  async refreshToken(refreshToken: string): Promise<{ status: number; body: ApiResponse<{ token: string }> }> {
    return await this.post<ApiResponse<{ token: string }>>('/auth/refresh', {
      data: { refreshToken },
    });
  }

  async logout(): Promise<{ status: number; body: ApiResponse<null> }> {
    return await this.post<ApiResponse<null>>('/auth/logout');
  }
}
