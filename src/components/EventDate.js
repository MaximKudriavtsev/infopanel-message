import React, { Component } from 'react';
import ReactDOM from 'react-dom'

import Globalize from 'globalize';
import globalizeLocalizer from 'react-widgets/lib/localizers/globalize';

import { DateTimePicker } from 'react-widgets';
import { Calendar } from 'react-widgets';

import 'react-widgets/lib/less/react-widgets.less';

Globalize('ru');
globalizeLocalizer(Globalize);

export default class EventDate extends Component {
    validate = (e) => {
        let DOM_input_eventDate_error = ReactDOM.findDOMNode(this.refs.input_eventDate_error);

        DOM_input_eventDate_error.className = ((e == null) ? 'error-label' : 'none');
    }
    changeEventDate = (e) => {
        let that = this;

        that.validate(e);
        that.props.actions.changeEventDate(e);
    }
    componentDidUpdate = () => {
        let that = this;
        
        that.validate(that.props.eventDate);
    }
    render() {
        let that = this,
            props = that.props;
        let today = new Date();
        today.setHours(0);
        today.setMinutes(0);

        return <div className='eventDate'>
            <label className='eventDate-label' unselectable='on'
                title="Выберите в какой день будет мероприятие">Дата проведения</label>
            <DateTimePicker
                className='timePicker'
                calendar={false}
                min={today}
                defaultValue={today}
                step={30}
                value={new Date(props.eventDate)}
                onChange={that.changeEventDate}
                format={"dd.MM.yyyy HH:mm"}
                timeFormat={"HH:mm"}
            />
            <Calendar 
                className='calendarPicker'
                min={today}
                defaultValue={today}
                value={new Date(props.eventDate)}
                onChange={that.changeEventDate}
            />
                <label ref='input_eventDate_error' className='none' unselectable='on'>
                    Please choose event date
                </label>
        </div>
    }
}