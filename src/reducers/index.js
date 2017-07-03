const initialState = {
    text: '',
    author: '',
    location: '',
    eventDate: new Date(),
    startDate: new Date(),
    messageAuthor:'User',
    messageDate:'',
    authorList:example(),
    eventList:getEventList()
};

function example(){
    return ['Кошкин','Кудрявцев', 'Туголуков', 'user15'];
}

function getEventList(){
    var list = [];

    for(var i=0, len=localStorage.length; i<len; i++) {
        var key = localStorage.key(i),
            date;
            
        list.push(JSON.parse(localStorage[key]));

        date = new Date(list[i].eventDate);
        list[i].correctEventDate = date.getDate() + '.' + date.getMonth() + '.' + date.getFullYear() + ' ' + date.getHours() + ':' + date.getMinutes();
        date = new Date(list[i].startDate);
        list[i].correctStartDate = date.getDate() + '.' + date.getMonth() + '.' + date.getFullYear() + ' ' + date.getHours() + ':' + date.getMinutes();
    }
    
    return list;
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
            if(date < new Date()) {
                date = new Date();
            }
            
            return { ...state, eventDate: action.value, startDate: date }
        }
        case 'CHANGE_STARTDATE':{
            return { ...state, startDate: action.value }
        }
        case 'BUTTON_SAVE':{
            var lenght = localStorage.length;
            localStorage.setItem( lenght+1, JSON.stringify({
                                text : state.text.trim(),
                                author: state.author,
                                location: state.location.trim(),
                                eventDate: state.eventDate,
                                startDate: state.startDate,
                                messageAuthor: state.messageAuthor,
                                messageDate: new Date()
                             }));
        }
    }
    return state;
}