import React, { Component } from 'react';
import ReactDOM from 'react-dom'

import { DropdownList } from 'react-widgets';
import 'react-widgets/lib/less/react-widgets.less';

export default class Author extends Component {
    changeEventType = (e) => {
        this.props.actions.changeEventType(e);
    }
    // componentDidUpdate() {
    //     let that = this,
    //         text = that.props.eventType,
    //         id = that.props.id,
    //         DOM_input_eventType_error = ReactDOM.findDOMNode(that.refs.input_eventType_error);
    //     if(id == -1){
    //         DOM_input_eventType_error.className = 'none';
    //     } else {
    //         DOM_input_eventType_error.className = (text ? 'none' : 'error-label');
    //     }
    // }
    render() {
        let that = this,
            props = that.props,
            eventTypeList = [
              'Birthday', 'New Junior'
            ]

        return <div className='eventType'>
            <label className='eventType-label' unselectable='on'
                title='Choose type of event'>Type of event</label>
            <DropdownList
                className='eventType-dropdownList'
                data={eventTypeList}
                filter='contains'
                placeholder='Choose type of event...'
                title='Choose one of this'
                value={props.eventType}
                onChange={that.changeEventType}
                />
            </div>
    }
}           // for validate
            // <label htmlFor='input-eventType' ref='input_eventType_error' className='none' unselectable='on'>
            //     Please choose type of event
            // </label>