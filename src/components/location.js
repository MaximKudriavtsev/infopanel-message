import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import ReactDOM from 'react-dom'

import * as actions from '../actions/actions';

class Location extends Component {
    changeLocation(e) {
        this.props.actions.changeLocation(e.target.value);
    }
    componentDidUpdate() {
        if(this.props.user.location === '') {
            ReactDOM.findDOMNode(this.refs.input_location).value = '';
        }
    }
    render() {
        let that = this;

        return <div className='location'>
                <label className='location-label' htmlFor='input-location'>Location</label>
                <input className='location-input'
                    id='input-location'
                    ref='input_location'
                    placeholder='Enter location...'
                    onBlur={:: that.changeLocation}
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
export default connect(mapStateToProps, mapDispatchToProps)(Location);