
const events = {
  RECORD_ADDED:    'infopanelRecordAdded',
  RECORD_UPDATED:  'infopanelRecordUpdated',
  RECORD_DELETED:  'infopanelRecordDeleted',
  RECORD_COMPLETED:'infopanelRecordCompleted'
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