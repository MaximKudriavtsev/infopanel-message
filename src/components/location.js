import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import ReactDOM from 'react-dom'

import * as actions from '../actions/actions';

class Location extends Component {
    changeLocation(e) {
        this.props.actions.changeLocation(e.target.value.trim());
    }
    componentDidUpdate() {
        let input_location = this.refs.input_location,
            location = this.props.user.location;
        if(location === '') {
            ReactDOM.findDOMNode(input_location).value = '';
        }else{
            ReactDOM.findDOMNode(input_location).value = location;
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