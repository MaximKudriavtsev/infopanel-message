
const events = {
  MESSAGE_ADDED:    'infopanelMessageAdded',
  MESSAGE_UPDATED:  'infopanelMessageUpdated',
  MESSAGE_DELETED:  'infopanelMessageDeleted'
};

export type MessageAdded = {
  aggregateId: string;
  payload: object;
};

export type MessageUpdate = {
  aggregateId: string;
  payload: object;
};

export type MessageDeleted = {
  aggregateId: string;
};

export default events;