//id = 0 default
//id = 1 edit messages
//id = -1 new record
//id = -2 validate error for new element
export default function client(state = {}, action) {
    switch (action.type) {
        case 'CHANGE_TEXT': {
            return { ...state, text: action.value }
        }
        case 'CHANGE_AUTHOR': {
            return { ...state, author: action.value.email, displayName: action.value.displayName }
        }
        case 'CHANGE_LOCATION': {
            return { ...state, location: action.value }
        }
        case 'CHANGE_EVENTDATE': {
            return { ...state, eventDate: action.value, startDate: new Date() }
        }
        case 'CHANGE_STARTDATE': {
            return { ...state, startDate: action.value }
        }
        case 'CHANGE_EVENT_TYPE': {
            return { ...state, eventType: action.value }
        }
        case 'CREATE_BUTTON': {
            return { ...state, displayName: state.fullNameAuthor, text: '', author: state.messageAuthor, location: '', eventDate: new Date(), startDate: new Date(), id: 0, focusRow: '' }
        }
        case 'UPDATE_BUTTON': {
            return { ...state, displayName: state.fullNameAuthor, text: '', author: state.messageAuthor, location: '', eventDate: new Date(), startDate: new Date(), id: 0, focusRow: '' }
        }
        case 'DELETE_BUTTON': {
            return { ...state, displayName: state.fullNameAuthor, id: 0, text: '', author: state.messageAuthor, location: '', eventDate: new Date(), startDate: new Date(), focusRow: '' }
        }
        case 'CANCEL_BUTTON': {
            return { ...state, displayName: state.fullNameAuthor, id: 0, text: '', author: state.messageAuthor, location: '', eventDate: new Date(), startDate: new Date(), focusRow: '' };
        }
        case 'EDIT_ROW_DATA': {
            let value = action.value.record,
                id = action.value.aggregateId;

            return { ...state, text: value.text, author: value.author, location: value.location, eventDate: new Date(value.eventDate), startDate: new Date(value.startDate), id: 1, focusRow: id, displayName: value.displayName }
        }
        case 'SET_ROW_FOCUS': {
            return { ...state, focusRow: action.value };
        }
        case 'VALIDATE_ERROR': {
            return { ...state, id: (action.value < 0 ? -2 : action.value) }
        }
        case 'PREVIEW': {
            return { ...state, preview:action.value }
        }
        case 'RESET_PREVIEW': {
            return { ...state, preview:'' }
        }
        case 'ADD_BUTTON': {
            return { ...state, id: -1 }
        }
    }
    return state;
}