import React, { Component } from 'react';
import uuidv4 from 'uuid/v4';

import getCorrectDate from './../func/validationTime';

export default class Buttons extends Component {
    onButtonSave = () => {
        this.props.actions.addButton();
    }
    render() {
        let that = this,
            client = that.props.client;
            
        return <div className={that.props.buttonStyle}>
            <button className='buttonAdd_add' 
                onClick={that.onButtonSave}
                unselectable='on'> 
                ДОБАВИТЬ ЕЩЕ...
            </button>
        </div>
    }
}