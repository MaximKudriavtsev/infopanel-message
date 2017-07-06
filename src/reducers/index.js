import $ from 'jquery';

const initialState = {
    text: '',
    author: 'User156',
    location: '',
    eventDate: new Date(),
    startDate: new Date(),
    messageAuthor: 'User156',
    messageDate: '',
    authorList: queryUsers(),
    eventList: getEventList()
};

function queryUsers() {
    fetch('/query_users')
        .then(function (response) {
            if (response.status !== 200) {
                console.log('Looks like there was a problem. Status Code: ' +
                    response.status);
                return;
            }
 
            response.json().then(function (data) {
                console.log('query Users => ');
                console.log(data)
            });
        })
        .catch(function (err) {
            console.log('Fetch Error :-S', err);
        });

    return ['Кошкин', 'Кудрявцев', 'Туголуков', 'User15', 'User156'];
}

sendData();

function sendData() {
    var sendData = {
        1:'one',
        2:'two'
    };

    $;
    fetch('/send_data', {
            method: 'POST',
            body: JSON.stringify(sendData),
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
            }
        })
        // .then(json)
        .then(function (data) {
            console.log('Request succeeded with JSON response', data);
        })
        .catch(function (error) {
            console.log('Request failed', error);
    });

    // var ajaxSettings = {
    //     method: 'post',
    //     url: '/send_data',
    //     data: JSON.stringify(sendData),
    //     dataType: 'json',
    //     contentType: 'application/json',
    //     processData: false,
    //     xhrFields: {
    //         withCredentials: true
    //     }
    // };
    // $.ajax(ajaxSettings);
}

function getEventList() {
    var list = [];

    for (var i = 0, len = localStorage.length; i < len; i++) {
        var key = localStorage.key(i),
            date, hours, min;

        list.push(JSON.parse(localStorage[key]));

        date = new Date(list[i].eventDate);
        hours = date.getHours().lenght == 1 ? '0' + date.getHours() : date.getHours();
        min = date.getMinutes().lenght == 1 ? '0' + date.getMinutes() : date.getMinutes();
        list[i].correctEventDate = date.getDate() + '.' + date.getMonth() + '.' + date.getFullYear() + ' ' + hours + ':' + min;

        date = new Date(list[i].startDate);
        hours = date.getHours().lenght == 1 ? '0' + date.getHours() : date.getHours();
        min = date.getMinutes().lenght == 1 ? '0' + date.getMinutes() : date.getMinutes();
        list[i].correctStartDate = date.getDate() + '.' + date.getMonth() + '.' + date.getFullYear() + ' ' + hours + ':' + min;
    }

    return list;
}

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
            var lenght = localStorage.length;
            localStorage.setItem(lenght + 1, JSON.stringify({
                text: state.text.trim(),
                author: state.author,
                location: state.location.trim(),
                eventDate: state.eventDate,
                startDate: state.startDate,
                messageAuthor: state.messageAuthor,
                messageDate: new Date()
            }));
            return { ...state, eventList: getEventList(), text: '', author: state.messageAuthor, location: '', eventDate: new Date(), startDate: new Date() }
        }
    }
    return state;
}