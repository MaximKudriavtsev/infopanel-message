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
            { id: 30, name: 'за месяц' },
            { id: 7, name: 'за неделю' },
            { id: 3, name: 'за три дня' },
            { id: 1, name: 'за день' },
            { id: 0, name: 'прямо сейчас' }
        ],
            name = 'прямо сейчас',
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
                title="С какого момента мероприятие будет публиковаться на info panel">Начало показа</label>
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