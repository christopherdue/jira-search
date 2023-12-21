import type { FunctionsBuilder } from '@wix/serverless-api';
import {requestPrompt} from './api/prompt-ai'
module.exports = function builder (builder: FunctionsBuilder) {
  return builder
  .addWebFunction('POST', '/prompt', requestPrompt)
};
