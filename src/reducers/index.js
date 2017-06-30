const initialState = {
    text: '',
    author: '',
    location: '',
    eventDate: '',
    startData:'',
    messageAuthor:'user',
    messageDate:'',
    authorList:example()
};

function example(){
    return ['Кошкин','Кудрявцев', 'Туголуков', 'user15'];
}

export default function user(state = initialState, action) {
    switch(action.type) {
        case 'CHANGE_TEXT': {
            return { ...state, text: action.value }
        }
        case 'CHANGE_AUTHOR': {
            return { ...state, author: action.value }
        }
        case 'CHANGE_LOCATION': {
            return { ...state, location: action.value }
        }
        case 'CHANGE_EVENTDATE':{
            var date = new Date(action.value);
            date.setDate(date.getDate() - 5);
            
            return { ...state, eventDate: action.value, startDate: date }
        }
        case 'CHANGE_STARTDATE':{
            return { ...state, startDate: action.value }
        }
        case 'BUTTON_SAVE':{
            var lenght = localStorage.length;
            localStorage.setItem( lenght+1, JSON.stringify({
                                text : state.text,
                                author: state.author,
                                location: state.location,
                                eventDate: state.eventDate,
                                startData: state.startData,
                                messageAuthor: state.messageAuthor,
                                messageDate: new Date()
                             }));
        }
    }
    return state;
}