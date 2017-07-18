import React, { Component } from 'react';

import '../styles/EventPage.css';

export default class EventPage extends Component {
  resetPreview() {
    this.props.actions.resetPreview();
  }
  render() {
    if(this.props.preview) {
      let that = this,
          data = that.props.preview.value,
          hours = data.correctEventDate.split(' ')[1],
          allMonth = [
            'января', 'февраля', 'марта', 'апреля',
            'мая', 'июня', 'июля', 'августа',
            'сентября', 'октября', 'ноября', 'декабря'
          ],
          eventDate = new Date(data.eventDate),
          month = allMonth[eventDate.getMonth()];

      return <div className={this.props.preview ? 'eventPage' : 'none'} onClick={::that.resetPreview}>
            <div className='eventPage_orange'>
              <div className='eventPage_orange_top'></div>
              <div className='eventPage_orange_circle'></div>
              <div className='eventPage_orange_text'>{data.text}</div>
            </div>
            <div className='eventPage_white'>
              <div className='eventPage_white_date'>{eventDate.getDate()}</div>
              {/*<div className='eventPage_white_textBlock'>*/}
                <div className='eventPage_white_textBlock_left'>
                  <div className='eventPage_white_textBlock_top_left'>{month}</div>
                  <div className='eventPage_white_textBlock_bottom_left'>начало в {hours}</div>
                </div>
                <div className='eventPage_white_textBlock_right'>
                  <div className='eventPage_white_textBlock_top_right'>{data.location? 'место' : ''}</div>
                  <div className='eventPage_white_textBlock_bottom_right'>{data.location}</div>
                </div>
              {/*</div>*/}
            </div>
          </div>
    } else {
        return <div className='none'></div>
    }
  }
}