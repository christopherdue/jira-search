import type { FunctionsBuilder } from '@wix/serverless-api';
import {requestPrompt, returnCorsHeaders} from './api/prompt-ai'
module.exports = function builder (builder: FunctionsBuilder) {
  return builder
  .addWebFunction('OPTIONS', '/prompt', returnCorsHeaders )
  .addWebFunction('POST', '/prompt', requestPrompt)
};
