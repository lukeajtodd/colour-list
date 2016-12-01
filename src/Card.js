import React, { Component } from 'react';
import Colour from './Colour';
import Label from './Label';

export default class Card extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div>
                <Colour color={this.props.color}/>
                <Label color={this.props.color} removeClick={this.props.removeClick}/>
            </div>
        )
    }
}