import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import * as actions from '../actions/actions'

class Text extends Component {
    changeText(e) {
        // var messageText = document.getElementById('input-text').innerHTML;
        // console.log(messageText);
        console.log(e.target.value);
        this.props.actions.changeText(e.target.value);
        //this.props.Text = e; 
    }
    render() {
        var that = this;
            //state = that.props.user;
            //messageText = state.text;

        return <div>
                <label htmlFor='input-text'>Text</label> {that.props.user.text}
                <input id='input-text'
                //value={messageText}
                className='input-text' 
                placeholder='Введите текс'
                onBlur={:: that.changeText}
                /> 
                
            </div>
    }
}

function mapStateToProps(state) {
    return {
        user: state
    };
}
function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(actions, dispatch)
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Text);