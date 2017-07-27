import React, { Component } from 'react';
import ReactDOM from 'react-dom'

import { SelectList } from 'react-widgets';

export default class StartDate extends Component {
    custom = (text) => {
        let data = text.item;
        return (
            <div className='radio-input-div'>
                <div className='radio-input-text' >{data.name}</div>
            </div>
        );
    }

    changeStartDate = (value) => {
        let props = this.props,
            date;

        if (value.id == 0) {
            date = new Date();
        } else {
            date = new Date(props.eventDate);
            date.setDate(date.getDate() - value.id);
        }
        props.actions.changeStartDate(date);
    }

    render() {
        let that = this,
            props = that.props,
            eventDate = new Date(props.eventDate),
            startDate = new Date(props.startDate),
            today = new Date(),
            dayRange = 0;

eventDate.setHours(0);          startDate.setHours(0);          today.setHours(0);
eventDate.setMinutes(0);        startDate.setMinutes(0);        today.setMinutes(0);
eventDate.setSeconds(0);        startDate.setSeconds(0);        today.setSeconds(0);
eventDate.setMilliseconds(0);   startDate.setMilliseconds(0);   today.setMilliseconds(0);

        let dates = [
            { id: 30, name: 'Month' },
            { id: 14, name: '2 weeks' },
            { id: 7, name: '1 week' },
            { id: 3, name: '3 days' },
            { id: 1, name: '1 days' },
            { id: 0, name: 'Now' }
        ],
            name = 'Now',
            countOfDisabled = 0,
            days = Math.round((eventDate - today) / 3600 / 1000 / 24);

        while (countOfDisabled < dates.length - 1 && dates[countOfDisabled].id >= days) countOfDisabled++;

        if(today.toString() != startDate.toString()) {
            dayRange = Math.round((eventDate - startDate) / 1000 / 60 / 60 / 24);

            for (var i = 0; i < dates.length; i++) {
                if (dates[i].id == dayRange) {
                    name = dates[i].name;
                    break;
                }
            }
        }
        return <div className='startDate'>
            <label className='startDate-label' unselectable='on'
                title="Publish about your event from choosed date">Show message since date</label>
            <SelectList
                className="startDate-SelectList"
                data={dates}
                valueField='id' textField='name'
                disabled={dates.slice(0, countOfDisabled)}
                value={{ id: dayRange, name: name }}
                onChange={that.changeStartDate}
                itemComponent={that.custom}
            />
        </div>
    }
}