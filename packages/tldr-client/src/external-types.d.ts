/// <reference types="@wix/yoshi/types" />
/// <reference types="@wix/jest-yoshi-preset/types" />

import type { ExtendedTicket, TicketTimeline } from '@wix/answers-api';

declare global {
  interface Window {
    __LOCALE__: string;
    __BASEURL__: string;
    ___TLDRTicketData: ExtendedTicket;
    ___TLDRTicketTimeline: TicketTimeline;
    answersBackofficeSdk: any;
  }
}
