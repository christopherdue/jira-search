import { HttpClient } from '@wix/http-client';
import { app } from '@wix/serverless-testkit';

const httpClient = new HttpClient();

describe('hello, serverless', () => {
  const testkit = app({});
  testkit.beforeAndAfter(10000);

  it('should say hello', async () => {
    const result = await httpClient.get(testkit.getUrl('/hello'));
    expect(result.data).toStrictEqual('hello, serverless');
  });
});
