

export default {
    name: 'messages',
    eventHandlers: {
        MessageCreated(state, event) {

            state.messages.push(event.messageData);
        },
        MessageRemoved(state, event) {
            let index = event.messageData.indexOf(event.id); //find index
            state.messages.splice(index, 1);                 //delete
        }
    }
}