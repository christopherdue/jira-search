import type { ExtendedTicket } from '@wix/answers-api';

const sdk = window.answersBackofficeSdk;
const ALLOWED_GROUP_IDS = [
  //  CHANGE!!!!!
  // // Production group ID
  // '82d15a75-ce6e-427f-a666-070c6c50116e',
  // // Test group ID
  // '784c4991-d292-4477-8dbb-1d5ad159b3d5',
  'sample',
];

export const setTicketData = async (
  ticketData: ExtendedTicket,
): Promise<void> => {
  window.___TLDRTicketData = ticketData;
  window.___TLDRTicketTimeline = await sdk.api.tickets.getTicketTimeline({
    ticketId: ticketData.id,
  });
};

export const isAgentAllowed = (): boolean => {
  const groups = sdk.currentAgent.groupIds;
  return groups.some((id: string) => ALLOWED_GROUP_IDS.includes(id));
};
