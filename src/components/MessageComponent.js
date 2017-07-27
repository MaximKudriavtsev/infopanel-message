import React, { PropTypes } from 'react';
// нужны внутри инфопанели
// import { buildImageUrl } from '../utils';
// import pagesConfig from '../pages_config';
import sizeMe from 'react-sizeme';

import '../styles/MessageComponent.css';

function MessageComponent(props) {
    //const data = props.data[props.index];
    const data = props.data;
    if (!data) return null;

    const hours = data.correctEventDate.split(' ')[1];
    const allMonth = [
        'января',
        'февраля',
        'марта',
        'апреля',
        'мая',
        'июня',
        'июля',
        'августа',
        'сентября',
        'октября',
        'ноября',
        'декабря'
    ];
    const eventDate = new Date(data.eventDate);
    const month = allMonth[eventDate.getMonth()];
    // images download
    // const imageUrl = buildImageUrl(data.author, pagesConfig.messages.images.size);
    const imageUrl = 'someUrl';
    const vh = props.size.height / 100;

    return (
        <div className="eventPage" onClick={props.onMessageClick}>
            <div className="eventPage_orange">
                <div className="eventPage_orange_top" />
                <div className="eventPage_orange_circle" style={{
                    height: 25 * vh,
                    width: 25 * vh,
                    border: vh + 'px solid white'
                }}>
                    <div className="img" style={{ backgroundImage: `url('${imageUrl}')` }} />
                </div>
                <div className="eventPage_orange_text" style={{
                    fontSize: +14 * vh + 'px',
                    paddingTop: 0,
                    paddingRight: 6 * vh,
                    paddingBottom: 0,
                    paddingLeft: 6 * vh
                }}>
                    {data.text}
                </div>
            </div>
            <div className="eventPage_white" style={{
                paddingTop: 3 * vh,
                paddingRight: 5 * vh,
                paddingBottom: 0,
                paddingLeft: 5 * vh
            }}>
                <div className="eventPage_white_date" style={{
                    fontSize: + 16 * vh + 'px',
                    marginRight: 0.5 * vh
                }}>
                    {eventDate.getDate()}
                </div>
                <div className="eventPage_white_textBlock_left" style={{
                    fontSize: 7 * vh,
                    marginTop: 1.5 * vh,
                    marginRight: 0,
                    marginBottom: 1 * vh,
                    marginLeft: 0
                }}>
                    <div className="eventPage_white_textBlock_top_left" style={{ blockSize: 6 * vh + 'px' }}>
                        {month}
                    </div>
                    <div className="eventPage_white_textBlock_bottom_left" style={{ blockSize: 6 * vh + 'px' }}>
                        начало в {hours}
                    </div>
                </div>
                <div className="eventPage_white_textBlock_right" style={{
                    fontSize: 7 * vh,
                    marginTop: 1.5 * vh,
                    marginRight: 0,
                    marginBottom: 1 * vh,
                    marginLeft: 0
                }}>
                    <div className="eventPage_white_textBlock_top_right" style={{ blockSize: 6 * vh + 'px' }}>
                        {data.location ? 'место' : ''}
                    </div>
                    <div className="eventPage_white_textBlock_bottom_right" style={{ blockSize: 6 * vh + 'px' }}>
                        {data.location}
                    </div>
                </div>
            </div>
        </div>
    );
}

MessageComponent.propTypes = {
    data: PropTypes.object
};
export default sizeMe({ monitorHeight: true })(MessageComponent);