import React, { Component } from 'react';
import uuidv4 from 'uuid/v4';

import getCorrectDate from './../func/validationTime';

export default class Buttons extends Component {
    onButtonSave = () => {
        console.log('buttonCreat clicked');
    }
    render() {
        let that = this,
            client = that.props.client,
            idUser = client.id;

        return <div className='buttonAdd'>
            <button className='buttonAdd_add' 
                onClick={that.onButtonSave}
                unselectable='on'> 
                ДОБАВИТЬ ЕЩЕ...
            </button>
        </div>
    }
}