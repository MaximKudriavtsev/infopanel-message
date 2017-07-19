import React, { Component } from 'react';
import ReactDOM from 'react-dom'

import { SelectList } from 'react-widgets';

export default class StartDate extends Component {
    changeStartDate = (value) => {
        let props = this.props,
            date = new Date(props.eventDate);

        date.setHours(7);
        date.setMinutes(0);
        date.setDate(date.getDate() - value.id);

        props.actions.changeStartDate(date, value.id);
    }

    render() {
        let that = this,
            props = that.props;

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
            if (dates[i].id == props.dayRange) {
                name = dates[i].name;
                break;
            }
        }
        return <div className='startDate'>
            <label className='startDate-label' unselectable='on'
                title="Publish about your event from choosed date">Show message from date</label>
            <SelectList
                className="startDate-SelectList"
                data={dates}
                valueField='id' textField='name'
                disabled={dates.slice(0, countOfDisabled)}
                value={{ id: that.props.dayRange, name: name }}
                onChange={that.changeStartDate}
                />
            </div>
    }
}