import { BaseApiClient } from '../../core/base.api-client';
import type { User, CreateUserRequest, UpdateUserRequest } from '../models/user.model';
import type { ApiResponse, PaginatedResponse } from '../models/api-response.model';

export class UsersApiClient extends BaseApiClient {
  async getUsers(params?: { page?: string; perPage?: string }): Promise<{ status: number; body: PaginatedResponse<User> }> {
    return await this.get<PaginatedResponse<User>>('/users', { params });
  }

  async getUserById(id: string): Promise<{ status: number; body: ApiResponse<User> }> {
    return await this.get<ApiResponse<User>>(`/users/${id}`);
  }

  async createUser(userData: CreateUserRequest): Promise<{ status: number; body: ApiResponse<User> }> {
    return await this.post<ApiResponse<User>>('/users', { data: userData });
  }

  async updateUser(id: string, userData: UpdateUserRequest): Promise<{ status: number; body: ApiResponse<User> }> {
    return await this.put<ApiResponse<User>>(`/users/${id}`, { data: userData });
  }

  async patchUser(id: string, userData: Partial<UpdateUserRequest>): Promise<{ status: number; body: ApiResponse<User> }> {
    return await this.patch<ApiResponse<User>>(`/users/${id}`, { data: userData });
  }

  async deleteUser(id: string): Promise<{ status: number; body: ApiResponse<null> }> {
    return await this.delete<ApiResponse<null>>(`/users/${id}`);
  }
}
