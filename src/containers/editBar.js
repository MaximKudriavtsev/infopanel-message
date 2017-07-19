import React, { Component } from 'react';

import Text from '../components/Text';
import Author from '../components/Author';
import Location from '../components/Location';
import EventDate from '../components/EventDate';
import Buttons from '../components/Buttons';
import StartDate from '../components/StartDate';

export default class EditBar extends Component {
    render() {
        let that = this,
          actions = that.props.actions,
          client = that.props.client;

        return <div className='app-editBar'>
            <Text text={client.text} id={client.id} actions={actions}/>
            <Author author={client.author} messageAuthor={client.messageAuthor} authorList={client.authorList} actions={actions}/>
            <Location location={client.location} actions={actions}/>
            <EventDate eventDate={client.eventDate} actions={actions}/>
            <StartDate dayRange={client.dayRange} eventDate={client.eventDate} actions={actions}/>
            <Buttons client={client} actions={actions}/>
        </div>
    }
}