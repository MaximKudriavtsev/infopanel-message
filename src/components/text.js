import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as actions from '../actions/actions';

class Text extends Component {
    changeText(e) {
        this.props.actions.changeText(e.target.value);
    }
    render() {
        let that = this;

        return <div className='text'>
                <label className='text-label' htmlFor='input-text'>Text</label>
                <input id='input-text'
                    className='text-input' 
                    placeholder='Введите текс'
                    onBlur={:: that.changeText}
                    maxLength='25'
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