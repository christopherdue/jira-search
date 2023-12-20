export { default } from './App';

import { injectButton } from '../../utils/helper';
import { setTicketData, isAgentAllowed } from '../../utils/sdkUtils';
import type { ExtendedTicket } from '@wix/answers-api';

const sdk = window.answersBackofficeSdk;

sdk.addListener(sdk.eventTypes.ticketLoaded, async (data: ExtendedTicket) => {
  await setTicketData(data);
  if (isAgentAllowed()) {
    injectButton();
  }
});
