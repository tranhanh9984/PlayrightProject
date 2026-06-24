import { type APIRequestContext, type APIResponse } from '@playwright/test';
import { envConfig } from '../config/env.config';
import { testConfig } from '../config/test.config';
import { logger } from '../helpers/logger';

export interface RequestOptions {
  headers?: Record<string, string>;
  params?: Record<string, string>;
  data?: unknown;
  timeout?: number;
}

export abstract class BaseApiClient {
  protected token?: string;

  constructor(protected readonly request: APIRequestContext) {}

  protected get baseUrl(): string {
    return envConfig.apiBaseUrl;
  }

  setToken(token: string): void {
    this.token = token;
  }

  private buildHeaders(extraHeaders?: Record<string, string>): Record<string, string> {
    const headers: Record<string, string> = {
      ...testConfig.apiHeaders,
      ...extraHeaders,
    };
    if (this.token) {
      headers['Authorization'] = `Bearer ${this.token}`;
    }
    return headers;
  }

  private buildUrl(endpoint: string, params?: Record<string, string>): string {
    const url = `${this.baseUrl}${endpoint}`;
    if (params) {
      const searchParams = new URLSearchParams(params);
      return `${url}?${searchParams.toString()}`;
    }
    return url;
  }

  async get<T = unknown>(endpoint: string, options: RequestOptions = {}): Promise<{ status: number; body: T; response: APIResponse }> {
    const url = this.buildUrl(endpoint, options.params);
    logger.info(`GET ${url}`);

    const response = await this.request.get(url, {
      headers: this.buildHeaders(options.headers),
      timeout: options.timeout ?? testConfig.defaultTimeout,
    });

    const body = await this.parseResponse<T>(response);
    logger.info(`Response: ${response.status()}`);
    return { status: response.status(), body, response };
  }

  async post<T = unknown>(endpoint: string, options: RequestOptions = {}): Promise<{ status: number; body: T; response: APIResponse }> {
    const url = this.buildUrl(endpoint, options.params);
    logger.info(`POST ${url}`);

    const response = await this.request.post(url, {
      headers: this.buildHeaders(options.headers),
      data: options.data,
      timeout: options.timeout ?? testConfig.defaultTimeout,
    });

    const body = await this.parseResponse<T>(response);
    logger.info(`Response: ${response.status()}`);
    return { status: response.status(), body, response };
  }

  async put<T = unknown>(endpoint: string, options: RequestOptions = {}): Promise<{ status: number; body: T; response: APIResponse }> {
    const url = this.buildUrl(endpoint, options.params);
    logger.info(`PUT ${url}`);

    const response = await this.request.put(url, {
      headers: this.buildHeaders(options.headers),
      data: options.data,
      timeout: options.timeout ?? testConfig.defaultTimeout,
    });

    const body = await this.parseResponse<T>(response);
    logger.info(`Response: ${response.status()}`);
    return { status: response.status(), body, response };
  }

  async patch<T = unknown>(endpoint: string, options: RequestOptions = {}): Promise<{ status: number; body: T; response: APIResponse }> {
    const url = this.buildUrl(endpoint, options.params);
    logger.info(`PATCH ${url}`);

    const response = await this.request.patch(url, {
      headers: this.buildHeaders(options.headers),
      data: options.data,
      timeout: options.timeout ?? testConfig.defaultTimeout,
    });

    const body = await this.parseResponse<T>(response);
    logger.info(`Response: ${response.status()}`);
    return { status: response.status(), body, response };
  }

  async delete<T = unknown>(endpoint: string, options: RequestOptions = {}): Promise<{ status: number; body: T; response: APIResponse }> {
    const url = this.buildUrl(endpoint, options.params);
    logger.info(`DELETE ${url}`);

    const response = await this.request.delete(url, {
      headers: this.buildHeaders(options.headers),
      timeout: options.timeout ?? testConfig.defaultTimeout,
    });

    const body = await this.parseResponse<T>(response);
    logger.info(`Response: ${response.status()}`);
    return { status: response.status(), body, response };
  }

  private async parseResponse<T>(response: APIResponse): Promise<T> {
    const contentType = response.headers()['content-type'] ?? '';
    if (contentType.includes('application/json')) {
      return (await response.json()) as T;
    }
    return (await response.text()) as unknown as T;
  }
}
