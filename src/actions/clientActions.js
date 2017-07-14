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
    changeStartDate: (day, dayRange) => ({
        type: 'CHANGE_STARTDATE',
        day: day,
        dayRange: dayRange
    }),
    updateRecord: () => ({
        type: 'UPDATE_RECORD'
    }),
    createRecord: () => ({
        type: 'CREATE_RECORD'
    }),
    buttonSave: () => ({
        type: 'BUTTON_SAVE'
    }),
    editRowData: (value) => ({
        type: 'EDIT_ROW_DATA',
        value: value
    }),
    buttonDelete: (value) => ({
        type: 'BUTTON_DELETE',
        value: value
    }),
    buttonCancel: () => ({
        type: 'BUTTON_CANCEL'
    }),
    setRowFocus: (value) => ({
        type: 'SET_ROW_FOCUS',
        value: value
    }),
    validateError: (value) => ({
        type: 'VALIDATE_ERROR',
        value: value
    })
};