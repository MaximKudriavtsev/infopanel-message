const initialState = {
    text: '',
    author: '',
    location: '',
    date: '',
    startData:'',
    messageAuthor:'',
    messageDate:''
};

export default function user(state = initialState, action) {
    switch(action.type) {
        case 'CHANGE_TEXT': {
            return { ...state, text: action.value }
        }
    }
    return state;
}