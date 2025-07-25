import axios from 'axios';
import { IHttpRequestParams } from './type/http_request_params';

export type IHttpResult<T, S> = {
    data: T | null;
    error: { message: string; status: S; } | null;
};

class HttpService {
    private baseUrl: string;
    private path: string;

    constructor(path: string) {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL;

        if (!apiUrl) throw new Error(
            "API_URL Environment variable not found"
        );

        this.baseUrl = apiUrl.trim();
        this.path = path;
    }

    public async get<O>(params: IHttpRequestParams<null>): Promise<O> {
        return await this.request<O, null>({
            ...params,
            url: this.getFullUrl(params.url),
            method: "GET"
        });
    }

    public async post<O, I>(params: IHttpRequestParams<I>): Promise<O> {
        return await this.request<O, I>({
            ...params,
            url: this.getFullUrl(params.url),
            method: "POST"
        });
    }

    public async put<O, I>(params: IHttpRequestParams<I>): Promise<O> {
        return await this.request<O, I>({
            ...params,
            url: this.getFullUrl(params.url),
            method: "PUT"
        });
    }

    public async delete<O>(params: IHttpRequestParams<null>): Promise<O> {
        return await this.request<O, null>({
            ...params,
            url: this.getFullUrl(params.url),
            method: "DELETE"
        });
    }

    private async request<O, I>(params: IHttpRequestParams<I>): Promise<O> {
        try {
            const response = await axios.request(params);
            return { data: response.data, error: null } as O;
        } catch (err: any) {
            const message = err?.response?.data?.message || "Erro desconhecido";
            const status = err?.response?.data?.status || "UNKNOWN";

            return { data: null, error: { message, status } } as O;
        }
    }

    private getFullUrl(url: string): string {
        if (
            url.startsWith('http://') ||
            url.startsWith('https://')
        ) return url;

        const pathWithoutSlash = this.removeExtraSlashes(this.path);
        const urlWithoutSlash = url ? this.removeExtraSlashes(url) : '';

        const finalPath = urlWithoutSlash
            ? `${pathWithoutSlash}/${urlWithoutSlash}`
            : pathWithoutSlash;

        return new URL(finalPath, this.baseUrl).toString();
    }

    // remove the slash from the beginning and end
    private removeExtraSlashes(url: string): string {
        return url.replace(/^\/+|\/+$/g, '');
    }
}

export default HttpService;
