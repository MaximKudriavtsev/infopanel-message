import React, { Component } from 'react';
import ReactDOM from 'react-dom'

import TitleBar from './TitleBar';
import ButtonCreate from './ButtonCreate';
import MessageComponent from './MessageComponent';

import Row from './Row.js'

export default class ViewBar extends Component {
    addScroll = () => {
        let that = this,
            elemTable = ReactDOM.findDOMNode(that.refs['table']),
            isScroll, elemHead;

        if (!elemTable) return;

        isScroll = elemTable.offsetWidth > elemTable.scrollWidth;
        elemHead = ReactDOM.findDOMNode(that.refs['viewBar_head']);

        isScroll ? elemHead.setAttribute('class', 'viewBar_head') : elemHead.setAttribute('class', '');
    }
    componentDidMount = () => {
        this.addScroll();
    }
    componentDidUpdate = () => {
        this.addScroll();
    }
    shouldComponentUpdate(nextProps, nextState) {
        return (this.props.eventList != nextProps.eventList) || (this.props.focusRow != nextProps.focusRow);
    }
    render() {
        let that = this,
            template,
            allData = that.props.eventList,
            data = [{
                text: "First record",
                author: "Maxim",
                location: "Some place",
                eventDate: "2017-07-13T12:53:49.241Z",
                startDate: "2017-07-13T12:53:49.241Z",
                messageAuthor: "Max",
                messageDate: "123",
                correctEventDate: '28.05.17',
                correctStartDate : '28.04.17',
                eventType: 'Event',
                displayName: 'Maxim Kudryavtsev'
            },{
                text: "Second record",
                author: "Max",
                location: "Kitchen",
                eventDate: "2017-07-13T12:53:49.241Z",
                startDate: "2017-07-13T12:53:49.241Z",
                messageAuthor: "Max",
                messageDate: "123",
                correctEventDate: '28.05.17',
                correctStartDate : '28.04.17',
                eventType: 'Event',
                displayName: 'Maxim Kudryavtsev'
            }],
            clientHeight = document.documentElement.clientHeight,
            height = clientHeight - 94;

        //filter!
        // for (var key in allData) {
        //     if (allData[key].record.messageAuthor == that.props.messageAuthor) {
        //         data.push(allData[key]);
        //     }
        // }

        if (data.length) {
            template = data.map((item, index) => {
                    const onMessageClick = () => {
                        console.log(item);
                    }
                return (
                    <div className='messageBox' key={index}>
                        <MessageComponent  data={item} onMessageClick={onMessageClick}/>
                    </div>)
            });
        } else {
            return (
                <div className='viewBar'>
                    <TitleBar messageAuthor={this.props.messageAuthor} />
                    <div className='viewBar_nothingToDisplay'>В данный момент нет никаких анонсов.</div>
                    <div className='viewBar_createRecordText'>Чтобы создать новый анонс, нажмите на кнопку ниже.</div>
                    <ButtonCreate client={that.props.client} />
                </div>)
        }
        return (
            <div className='viewBar'>
                <TitleBar messageAuthor={this.props.messageAuthor} />
                <div className='messageTemplate'>
                  {template}
                </div>
                <ButtonCreate client={that.props.client} />
            </div>)
    }
}