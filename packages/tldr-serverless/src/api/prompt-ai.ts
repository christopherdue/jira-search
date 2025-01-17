import { FullHttpResponse, HttpError, type FunctionContext, type WebRequest } from "@wix/serverless-api";
import { APP_DEF_ID } from '../consts';
import { generateTextByPrompt } from '@wix/ambassador-ds-wix-ai-gateway-v1-prompt/rpc';

const preflightCorsHeaders = (origin = '*'): any => ({
  'Access-Control-Allow-Credentials': 'true',
  'Access-Control-Allow-Origin': origin,
  // eslint-disable-next-line sort-keys
  'Access-Control-Allow-Headers': '*',
  'Access-Control-Allow-Methods': 'GET, POST, DELETE',
  'Access-Control-Expose-Headers': 'x-wix-request-id,x-seen-by',
  Vary: 'Origin',
});

export const returnCorsHeaders = async (
  _ctx: FunctionContext,
  _req: WebRequest
): Promise<FullHttpResponse> =>
  new FullHttpResponse({
      status: 204,
      headers: preflightCorsHeaders(),
  });

export const requestPrompt = async (ctx: FunctionContext, req: WebRequest): Promise<FullHttpResponse> => {
  const s2s = ctx.getConfig('s2s');

  const {text} = req.body;

  if(s2s === undefined) {
    throw new HttpError({status: 401, message: 'unable to retrive server signature'});
  }

  ctx.apiGatewayClient.signWith(APP_DEF_ID, s2s);
  const signedAspects = await ctx.apiGatewayClient.addServerSignature(ctx.aspects);
  const promptResponse =  await ctx.ambassador.request(generateTextByPrompt({
    promptId: '2ffac328-6554-43c5-b606-784e5fcebd20',
    params: {
      text
    }
  }), signedAspects);

return new FullHttpResponse({
    status: 200,
    body: promptResponse,
    headers: {
        'Access-Control-Allow-Credentials': 'true',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': '*',
        'Access-Control-Allow-Methods': 'GET, POST, DELETE',
        'Access-Control-Expose-Headers': 'x-wix-request-id,x-seen-by',
        Vary: 'Origin',
    },
  });

}
