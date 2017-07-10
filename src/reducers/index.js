import * as querys from '../querys/querys';

//id = -1 default
//id = -2 validate error for new element
//id = -3 validate error for edit 
const initialState = {

    id:-1,                  
    text: '',
    author: 'User156',
    location: '',
    eventDate: new Date(),
    startDate: new Date(),
    messageAuthor: 'User156',
    messageDate: '',
    authorList: [],
    eventList: '',
    focusRow: ''
};

export default function user(state = initialState, action) {
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
            var date = new Date(action.value);
            date.setDate(date.getDate() - 5);
            if (date < new Date()) {
                date = new Date();
            }

            return { ...state, eventDate: action.value, startDate: date }
        }
        case 'CHANGE_STARTDATE': {
            return { ...state, startDate: action.value }
        }
        case 'BUTTON_SAVE': {
            var id;
            if(state.id < 0) {
                id = localStorage.length;
                while (localStorage.getItem(id) != null) id++;
            } else {
                id = state.id;
            }
            var data = {
                id: id,
                text: state.text,
                author: state.author,
                location: state.location,
                eventDate: state.eventDate,
                startDate: state.startDate,
                messageAuthor: state.messageAuthor,
                messageDate: new Date()
            };

            localStorage.setItem(id, JSON.stringify(data));
            querys.sendData(data);
            return { ...state, /*eventList: querys.getEventList(),*/ text: '', author: state.messageAuthor, location: '', eventDate: new Date(), startDate: new Date(), id: -1, focusRow: '' }
        }
        case 'EDIT_ROW_DATA' :{
            return { ...state, text: action.value.text, author: action.value.author, location:action.value.location, eventDate: new Date(action.value.eventDate), startDate: new Date(action.value.startDate), id:action.value.id, focusKey:action.value.id}
        }
        case 'BUTTON_DELETE': {
            localStorage.removeItem(action.value);
            return { ...state, id: -1, /*eventList: getEventList(),*/ text: '', author: state.messageAuthor, location: '', eventDate: new Date(), startDate: new Date(), focusRow: '' }
        }
        case 'BUTTON_CANCEL': {
            return { ...state, id: -1, text: '', author: state.messageAuthor, location: '', eventDate: new Date(), startDate: new Date(), focusRow: '' };
        }
        case 'SET_ROW_FOCUS': {
            return { ...state, focusRow: action.value };
        }
        case 'VALIDATE_ERROR':{
            return {...state, id: (action.value < 0 ? -2 : action.value) }
        }
        case 'GET_USERS_REQUEST': {
            return { ...state } 
        }

        case 'GET_USERS_SUCCESS': {
            return { ...state, authorList: action.value }
        }

        case 'GET_RECORDS_REQUEST': {
            return { ...state }
        }

        case 'GET_RECORDS_SUCCESS': {
            return { ...state, eventList: action.value }
        }
    }
    return state;
}