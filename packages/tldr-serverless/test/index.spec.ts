import { HttpClient } from '@wix/http-client';
import { app, whenAmbassadorCalled } from '@wix/serverless-testkit';
import { generateTextByPrompt } from '@wix/ambassador-ds-wix-ai-gateway-v1-prompt/rpc';
import {aGenerateTextByPromptResponse} from '@wix/ambassador-ds-wix-ai-gateway-v1-prompt/builders'
const httpClient = new HttpClient();

describe('hackathon AI prompt', () => {
  const testkit = app({});
  const aiGatewayResponse = aGenerateTextByPromptResponse();
  testkit.setConfig('s2s', 's2stest')
  testkit.beforeAndAfter(10000);

  beforeEach(() => {
    testkit.ambassadorV2.reset();

  });


  it('should return prompt', async () => {
    whenAmbassadorCalled(generateTextByPrompt).withAny().thenResolveWith(aiGatewayResponse)
    const result = await httpClient.post(testkit.getUrl('/prompt'),{
      text: 'hello world'
    });
    expect(result.data).toStrictEqual(aiGatewayResponse);
  });
});
