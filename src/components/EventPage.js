import React, { Component } from 'react';

import '../styles/EventPage.css';

export default class EventPage extends Component {
  resetPreview() {
    debugger;
    this.props.actions.resetPreview();
  }
  render() {
    if(this.props.preview){
      debugger;
      let that = this,
          props = that.props,
          data = props.preview.value,
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
              <div className='eventPage_orange_circle'>
                {/*<img src='https://www.google.ru/url?sa=i&rct=j&q=&esrc=s&source=images&cd=&cad=rja&uact=8&ved=0ahUKEwiRgP2No5LVAhXJHJoKHWM2AjoQjRwIBw&url=http%3A%2F%2Fwww.boredpanda.com%2Fcelebrity-faces-mix-combined-pedro-berg-johnsen-thatnordicguy%2F&psig=AFQjCNFwOkj6RdrYMMoyX-BkJU9VNFiHRg&ust=1500448154192679'></img>*/}
              </div>
              <div className='eventPage_orange_text'>{data.text}</div>
            </div>
            <div className='eventPage_white'>
              <div className='eventPage_white_textBlock'>
                <div className='eventPage_white_textBlock_top'>
                  <div className='eventPage_white_textBlock_top_left'>{month}</div>
                  <div className='eventPage_white_textBlock_top_right'>{data.location? 'место' : ''}</div>
                </div>
                <div className='eventPage_white_textBlock_bottom'>
                  <div className='eventPage_white_textBlock_bottom_left'>начало в {hours}</div>
                  <div className='eventPage_white_textBlock_bottom_right'>{data.location}</div>
                </div>
              </div>
              <div className='eventPage_white_date'>{eventDate.getDate()}</div>
            </div>
          </div>
    } else {
        return <div className='none'></div>
    }
  }
}