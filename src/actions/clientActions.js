export default {
    changeText: (value) => ({
        type: 'CHANGE_TEXT',
        value: value
    }),
    changeAuthor: (value) => ({
        type: 'CHANGE_AUTHOR',
        value: value
    }),
    changeLocation: (value) => ({
        type: 'CHANGE_LOCATION',
        value: value
    }),
    changeEventDate: (value) => ({
        type: 'CHANGE_EVENTDATE',
        value: value
    }),
    changeStartDate: (value) => ({
        type: 'CHANGE_STARTDATE',
        value: value
    }),
    changeEventType: (value) => ({
        type: 'CHANGE_EVENT_TYPE',
        value: value
    }),
    updateButton: () => ({
        type: 'UPDATE_BUTTON'
    }),
    createButton: () => ({
        type: 'CREATE_BUTTON'
    }),
    deleteButton: (value) => ({
        type: 'DELETE_BUTTON',
        value: value
    }),
    cancelButton: () => ({
        type: 'CANCEL_BUTTON'
    }),
    addButton: () => ({
        type: 'ADD_BUTTON',
    }),
    editRowData: (value) => ({
        type: 'EDIT_ROW_DATA',
        value: value
    }),
    setRowFocus: (value) => ({
        type: 'SET_ROW_FOCUS',
        value: value
    }),
    validateError: (value) => ({
        type: 'VALIDATE_ERROR',
        value: value
    }),
    preview: (value) => ({
        type: 'PREVIEW',
        value: value
    }),
    resetPreview: () => ({
        type: 'RESET_PREVIEW'
    })
};