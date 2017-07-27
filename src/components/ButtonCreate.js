import React, { Component } from 'react';
import uuidv4 from 'uuid/v4';

import getCorrectDate from './../func/validationTime';

export default class Buttons extends Component {
    onButtonSave = () => {
        this.props.actions.addButton();
    }
    render() {
        let that = this,
            client = that.props.client,
            idUser = client.id;

        return <div className='buttonCreate'>
            <button className='buttonCreate_create' 
                onClick={that.onButtonSave}
                unselectable='on'> 
                СОЗДАТЬ АНОНС
            </button>
        </div>
    }
}