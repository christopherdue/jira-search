import { HttpClient, HttpResponse } from '@wix/http-client';

const baseURL = window.location.origin + window.__BASEURL__;

export const httpClient = new HttpClient({ baseURL });

export const getTldr = async (text: string): Promise<HttpResponse> => {
  try {
    const response = await httpClient.post('/prompt', { text });
    return response;
  } catch (err: any) {
    throw new Error(err.response);
  }
};

export * from '@wix/http-client';
