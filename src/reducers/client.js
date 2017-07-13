import * as querys from '../querys/querys';

//id = -1 default
//id = -2 validate error for new element
//id = -3 validate error for edit 

function validateRecord(record) {
    function getCorrectDate(time) {
        let date,
            day, month, hours, min,
            getDay, getMonth, getHours, getMinutes;
        date = new Date(time);
        getDay = date.getDate().toString();
        getMonth = (date.getMonth() + 1).toString();
        getHours = date.getHours().toString();
        getMinutes = date.getMinutes().toString();

        day = getDay.length == 1 ? '0' + getDay : getDay;
        month = getMonth.length == 1 ? '0' + getMonth : getMonth;
        hours = getHours.length == 1 ? '0' + getHours : getHours;
        min = getMinutes.length == 1 ? '0' + getMinutes : getMinutes;
        return (day + '.' + month + '.' + date.getFullYear() + ' ' + hours + ':' + min);
    }
    record.correctEventDate = getCorrectDate(record.eventDate);
    record.correctStartDate = getCorrectDate(record.startDate);
    return record;
}

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
        case 'CREATE_RECORD': {
            let id = 9,
                data = {
                    id: id,
                    text: state.text,
                    author: state.author,
                    location: state.location,
                    eventDate: state.eventDate,
                    startDate: state.startDate,
                    messageAuthor: state.messageAuthor,
                    messageDate: new Date()
                },
                eList = state.eventList;

            eList.push(validateRecord(data));
            querys.createRecord(data);
            return { ...state, text: '', author: state.messageAuthor, location: '', eventDate: new Date(), startDate: new Date(), id: -1, focusRow: '', eventList: eList }
        }
        case 'UPDATE_RECORD': {
            let data = {
                id: state.id,
                text: state.text,
                author: state.author,
                location: state.location,
                eventDate: state.eventDate,
                startDate: state.startDate,
                messageAuthor: state.messageAuthor,
                messageDate: new Date(),
                dayRange: state.dayRange
            };
            querys.updateRecord(data);
            return { ...state, text: '', author: state.messageAuthor, location: '', eventDate: new Date(), startDate: new Date(), id: -1, focusRow: '' }
        }
        case 'EDIT_ROW_DATA': {
            return { ...state, text: action.value.text, author: action.value.author, location: action.value.location, eventDate: new Date(action.value.eventDate), startDate: new Date(action.value.startDate), id: action.value.id, focusRow: action.value.id }
        }
        case 'BUTTON_DELETE': {
            querys.deleteData({ id: state.id });
            return { ...state, id: -1, text: '', author: state.messageAuthor, location: '', eventDate: new Date(), startDate: new Date(), focusRow: '' }
        }
        case 'BUTTON_CANCEL': {
            return { ...state, id: -1, text: '', author: state.messageAuthor, location: '', eventDate: new Date(), startDate: new Date(), focusRow: '', dayRange: 0 };
        }
        case 'SET_ROW_FOCUS': {
            return { ...state, focusRow: action.value };
        }
        case 'VALIDATE_ERROR': {
            return { ...state, id: (action.value < 0 ? -2 : action.value) }
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
        case 'RECORD_DID_UPDATED' : {
            console.log('Client: record did updated!')
            return state;
        }
        case 'RECORD_DID_CREATED' : {
            console.log('Client: record did created!')
            return state;
        }
        case 'RECORD_DID_DELETED' : {
            console.log('Client: record did deleted!')
            return state;
        }
    }
    return state;
}