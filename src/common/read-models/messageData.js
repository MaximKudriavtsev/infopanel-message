

export default {
    name: 'messageData',
    initialState: [],
    eventHandlers: {
        ChangeText(state, event) {
            return { ...state, text: event.value }
        },
        ChangeAuthor(state, event) {
            return { ...state, author: event.value }
        },
        ChangeLocation(state, event) {
            return { ...state, location: event.value }
        },
        ChangeEventdate(state, event) {
            //перед отправкой на сервер/смены состояния
            // let date = new Date(event.value);
            // date.setDate(date.getDate() - 5);
            // if (date < new Date()) {
            //     date = new Date();
            // }
            return { ...state, eventDate: event.value, startDate: date }
        },
        ChangeStartdate(state, event) {
            return { ...state, startDate: event.value }
        },
        EditRowData(state, event) {
            return { ...state, text: event.value.text, author: event.value.author, location: event.value.location, eventDate: new Date(event.value.eventDate), startDate: new Date(event.value.startDate), id: event.value.id, focusRow: event.value.id }
        },
        ButtonCancel(state, event) {
            return { ...state, id: -1, text: '', author: state.messageAuthor, location: '', eventDate: new Date(), startDate: new Date(), focusRow: '' };
        },
        // не используется
        // case 'SET_ROW_FOCUS': {
        //     return { ...state, focusRow: action.value };
        // }
        ValidateError(state, event) {
            return {...state, id: (action.value < 0 ? -2 : action.value) }
        }
    }
}