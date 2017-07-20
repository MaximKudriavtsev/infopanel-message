import React, { Component } from 'react';
import ReactDOM from 'react-dom'

import { SelectList } from 'react-widgets';

export default class StartDate extends Component {
    changeStartDate = (value) => {
        let props = this.props,
            date;

        if(value.id == 0) {
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
            dayRange = new Date(props.eventDate).getDay() - new Date(props.startDate).getDay();

        let dates = [
            { id: 30, name: 'Month' },
            { id: 14, name: '2 weeks' },
            { id: 7, name: '1 week' },
            { id: 3, name: '3 days' },
            { id: 1, name: '1 days' },
            { id: 0, name: 'Now' }
        ],
            name,
            countOfDisabled = 0,
            days = Math.floor((new Date(props.eventDate).getTime() - new Date().getTime()) / 3600 / 1000 / 24);

        if (days < 0) {
            countOfDisabled = dates.length - 1;
            name = 'Now';
        } else {
            while (dates[countOfDisabled].id > days) countOfDisabled++;
        }
        for (var i = 0; i < dates.length; i++) {
            if (dates[i].id == dayRange) {
                name = dates[i].name;
                break;
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
                />
            </div>
    }
}