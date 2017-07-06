import * as querys from '../querys/querys';

const initialState = {
    text: '',
    author: 'User156',
    location: '',
    eventDate: new Date(),
    startDate: new Date(),
    messageAuthor: 'User156',
    messageDate: '',
    authorList: querys.queryUsers(),
    eventList: querys.getEventList()
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
            var lenght = localStorage.length,
                data = {
                    text: state.text.trim(),
                    author: state.author,
                    location: state.location.trim(),
                    eventDate: state.eventDate,
                    startDate: state.startDate,
                    messageAuthor: state.messageAuthor,
                    messageDate: new Date()
                };

            localStorage.setItem(lenght + 1, JSON.stringify(data));
            querys.sendData(data);
            return { ...state, eventList: querys.getEventList(), text: '', author: state.messageAuthor, location: '', eventDate: new Date(), startDate: new Date() }
        }
    }
    return state;
}