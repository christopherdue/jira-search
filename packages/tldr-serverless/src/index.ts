import { FullHttpResponse, type FunctionsBuilder } from '@wix/serverless-api';
import { requestPrompt } from './api/prompt-ai';

module.exports = function builder(builder: FunctionsBuilder) {
  return builder
    .addWebFunction('POST', '/prompt', requestPrompt)
    .addWebFunction(
      'OPTIONS',
      '/prompt',
      async () =>
        new FullHttpResponse({
          status: 204,
          headers: {
            'Access-Control-Allow-Origin': 'https://wix.wixanswers.com',
            'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type, Authorization',
            'Access-Control-Expose-Headers': 'x-wix-request-id,x-seen-by',
          },
        }),
    );
};
