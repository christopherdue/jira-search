import {
  TimelineChatMessage,
  TimelineItem,
  TimelineItemType,
  TimelineReply,
} from '@wix/answers-api';
import App from '../components/App';
import { createRoot } from 'react-dom/client';
import React from 'react';

export const getTimelineItems = () =>
  window.___TLDRTicketTimeline.timelineItems;

export const getUsersMessages = (): string[] => {
  const timelineItems = getTimelineItems();
  return timelineItems
    .filter(
      (item) =>
        (isItemReply(item) || isItemChatMessage(item)) && !item.user.isAgent,
    )
    .map((item) => {
      if (isItemReply(item) || isItemChatMessage(item)) {
        return removeTags(item.content);
      }
      return '';
    });
};

export const removeTags = (string: string): string => {
  return string
    .replace(/<[^>]*>/g, ' ')
    .replace(/\s{2,}/g, ' ')
    .trim();
};

function isItemReply(item: TimelineItem): item is TimelineReply {
  return item.timelineItemType === TimelineItemType.REPLY;
}

function isItemChatMessage(item: TimelineItem): item is TimelineChatMessage {
  return item.timelineItemType === TimelineItemType.CHAT_MESSAGE;
}

export const injectButton = () => {
  const actionsContainer = document.querySelector('.main-actions-container');
  if (actionsContainer) {
    const buttonContainer = document.createElement('div');
    buttonContainer.classList.add('tldr-button-container');
    actionsContainer.appendChild(buttonContainer);

    const root = createRoot(buttonContainer);
    root.render(<App />);
  }
};
