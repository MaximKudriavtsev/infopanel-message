const initialState = {
    text: '',
    author: '',
    location: '',
    date: '',
    startData:'',
    messageAuthor:'',
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
    }
    return state;
}