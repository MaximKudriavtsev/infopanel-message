import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import * as actions from '../actions/actions'

class Location extends Component {
    changeLocation(e) {
        this.props.actions.changeLocation(e.target.value);
    }
    render() {
        var that = this;

        return <div>
                <label htmlFor='input-location'>Location</label> {that.props.user.location}
                <input id='input-location'
                    className='input-location' 
                    placeholder='Введите место'
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