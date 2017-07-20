import React, { Component } from 'react';
import uuidv4 from 'uuid/v4';

import getCorrectDate from './../func/validationTime';

export default class Buttons extends Component {
    onButtonSave = () => {
        let that = this,
            client = that.props.client,
            actions = that.props.actions,
            startDate = new Date(client.startDate);
        startDate.setHours(7);
        startDate.setMinutes(0);
        let data = {
                text: client.text,
                author: client.author,
                location: client.location,
                eventDate: client.eventDate,
                startDate: startDate,
                messageAuthor: client.messageAuthor,
                messageDate: new Date(),
                correctEventDate : getCorrectDate(client.eventDate),
                correctStartDate : getCorrectDate(startDate),
                eventType: client.eventType
            },
            currId = client.focusRow;

        if (client.text && client.author && client.eventDate && client.startDate) {
            if(client.id < 0) {
                actions.addRecord(uuidv4(), {record: data });
                actions.createButton();
            } else {
                actions.updateRecord(currId, {record: data});
                actions.updateButton();
            }
        } else {
            actions.validateError(client.focusRow);
        }
    }
    onButtonDelete = () => {
        let props = this.props, 
            client = props.client,
            id = client.focusRow;

        props.actions.deleteRecord(id);
        props.actions.deleteButton();
    }
    onButtonCancel = () => {
        this.props.actions.cancelButton();
    }
    render() {
        let that = this,
            client = that.props.client,
            idUser = client.id;

        return <div className='buttons'>
            <button className={idUser >= 0 ? 'buttons-buttonDelete' : 'none' }
                onClick={that.onButtonDelete}
                unselectable='on'> 
                Delete
            </button>
            <button className={idUser >= 0 ? 'buttons-buttonCancel' : 'none' }
                onClick={that.onButtonCancel}
                unselectable='on'> 
                Cancel
            </button>
            <button className='buttons-buttonSave' 
                onClick={that.onButtonSave}
                unselectable='on'> 
                { idUser < 0 ? 'Create' : 'Save' }
            </button>
        </div>
    }
}