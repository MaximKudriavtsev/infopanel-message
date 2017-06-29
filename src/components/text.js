import React, { Component } from "react"
import { connect } from "react-redux"
import { bindActionCreators } from "redux"

import * as actions from "../../actions/LoanActions"

class Text extends Component {
    render() {
        return <div>
                Text
            </div>
    }
}

function mapStateToProps(state) {
    return {
        state: state
    };
}
function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(Actions, dispatch)
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Text);