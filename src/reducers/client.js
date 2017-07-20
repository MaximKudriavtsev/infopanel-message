//id = -1 default
//id = -2 validate error for new element
//id = -3 validate error for edit 
export default function client(state = {}, action) {
    switch (action.type) {
        case 'CHANGE_TEXT': {
            return { ...state, text: action.value }
        }
        case 'CHANGE_AUTHOR': {
            return { ...state, author: action.value }
        }
        case 'CHANGE_LOCATION': {
            return { ...state, location: action.value }
        }
        case 'CHANGE_EVENTDATE': {
            return { ...state, eventDate: action.value, startDate: new Date(), dayRange: 0 }
        }
        case 'CHANGE_STARTDATE': {
            return { ...state, startDate: action.day, dayRange: action.dayRange }
        }
        case 'CHANGE_EVENT_TYPE': {
            return { ...state, eventType: action.value }
        }
        case 'CREATE_BUTTON': {
            return { ...state, dayRange: 0, text: '', author: state.fullNameAuthor, location: '', eventDate: new Date(), startDate: new Date(), id: -1, focusRow: '' }
        }
        case 'UPDATE_BUTTON': {
            return { ...state, text: '',dayRange: 0, author: state.fullNameAuthor, location: '', eventDate: new Date(), startDate: new Date(), id: -1, focusRow: '' }
        }
        case 'DELETE_BUTTON': {
            return { ...state, dayRange: 0, id: -1, text: '', author: state.fullNameAuthor, location: '', eventDate: new Date(), startDate: new Date(), focusRow: '' }
        }
        case 'CANCEL_BUTTON': {
            return { ...state, dayRange: 0, id: -1, text: '', author: state.fullNameAuthor, location: '', eventDate: new Date(), startDate: new Date(), focusRow: '', dayRange: 0 };
        }
        case 'EDIT_ROW_DATA': {
            return { ...state, text: action.value.text, author: action.value.author, location: action.value.location, eventDate: new Date(action.value.eventDate), startDate: new Date(action.value.startDate), id: 5, focusRow: action.value.id }
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
    }
    return state;
}