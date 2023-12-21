import { HttpClient } from '@wix/http-client';

const baseURL = `https://bo.wix.com/_serverless/tldr-serverless`;

export const httpClient = new HttpClient({ baseURL });

export const getTldr = async (text: string): Promise<string> => {
  try {
    const { data } = await httpClient.post('/prompt', { text });
    return data.response.generatedTexts[0] || '';
  } catch (err: any) {
    throw new Error(err.response);
  }
};

export * from '@wix/http-client';
