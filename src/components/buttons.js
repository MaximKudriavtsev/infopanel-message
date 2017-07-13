import React, { Component } from 'react';

export default class Buttons extends Component {
    onButtonSave() {
        let that = this,
            client = that.props.client,
            actions = that.props.actions,
            data = {
                text: client.text,
                author: client.author,
                location: client.location,
                eventDate: client.eventDate,
                startDate: client.startDate,
                messageAuthor: client.messageAuthor,
                messageDate: client.messageDate,
            },
            id = 1;

        if (client.text && client.author && client.eventDate && client.startDate) {
            (client.id < 0) ? actions.createRecord(id, data) : actions.updateRecord(id, data);
        } else {
            actions.validateError(client.id);
        }
    }
    onButtonDelete(){
        this.props.actions.buttonDelete(this.props.id);
    }
    onButtonCancel() {
        this.props.actions.buttonCancel();
    }
    render() {
        let that = this,
            client = that.props.client,
            idUser = client.id;

        return <div className='buttons'>
            <button className={idUser >= 0 ? 'buttons-buttonDelete' : 'none' }
                onClick={:: that.onButtonDelete}
                unselectable='on'> 
                Delete
            </button>
            <button className={idUser >= 0 ? 'buttons-buttonCancel' : 'none' }
                onClick={:: that.onButtonCancel}
                unselectable='on'> 
                Cancel
            </button>
            <button className='buttons-buttonSave' 
                onClick={:: that.onButtonSave}
                unselectable='on'> 
                { idUser < 0 ? 'Create' : 'Save' }
            </button>
        </div>
    }
}