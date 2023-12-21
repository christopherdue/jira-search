import type { ExtendedTicket } from '@wix/answers-api';

const sdk = window.answersBackofficeSdk;
const ALLOWED_GROUP_IDS = [
  // // Production group ID
  '82d15a75-ce6e-427f-a666-070c6c50116e',
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

export const postInternalNote = async (content: string) => {
  const ticketData = window.___TLDRTicketData;
  try {
    const response = await sdk.api.tickets.addAgentInternalNote({
      content,
      id: ticketData.id,
    });
    return response;
  } catch (err: any) {
    throw new Error(err.response);
  }
};
