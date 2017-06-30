import React, { Component } from 'react'

import Text     from '../components/Text'
import Author   from '../components/Author'
import Location from '../components/Location'

export default class EditBar extends Component {
    render() {
        return <div className='app-editBar'>
            <p>editBar</p>
            <Text />
            <Author />
            <Location />
        </div>
    }
}