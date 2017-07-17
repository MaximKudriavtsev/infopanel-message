
const events = {
  RECORD_ADDED:    'recordAdded',
  RECORD_UPDATED:  'recordUpdated',
  RECORD_DELETED:  'recordDeleted',
  RECORD_COMPLETED:'recordCompleted'
};

export type RecordAdded = {
  aggregateId: string;
  corName: string;
  payload: {
    record: object;
  };
};

export type RecordUpdate = {
  aggregateId: string;
  corName: string;
  payload: {
    record: object;
  };
};

export type RecordDeleted = {
  aggregateId: string;
  corName: string;
};

export type RecordCompleted = {
  aggregateId: string;
  corName: string;
  payload: {
    completed: boolean;
  };
};

export default events;