import React, { Component } from 'react';

import Text from '../components/Text';
import Author from '../components/Author';
import Location from '../components/Location';
import EventDate from '../components/EventDate';
import Buttons from '../components/Buttons';
import StartDate from '../components/StartDate';
// import EventType from '../components/EventType';

export default class EditBar extends Component {
    render() {
        let that = this,
          actions = that.props.actions,
          client = that.props.client;

        return <div className='app-editBar none'>
            <Text text={client.text} id={client.id} actions={actions}/>
            <Author author={client.author} id={client.id} fullNameAuthor={client.fullNameAuthor} actions={actions} authorList={client.authorList}/>
            <Location location={client.location} actions={actions}/>
            {/* <EventType eventType={client.eventType} actions={actions}/> */}
            <EventDate eventDate={client.eventDate} actions={actions}/>
            <StartDate startDate={client.startDate} eventDate={client.eventDate} actions={actions}/>
            <Buttons client={client} actions={actions}/>
        </div>
    }
}