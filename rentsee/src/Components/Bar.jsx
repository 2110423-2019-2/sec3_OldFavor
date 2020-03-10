import React, { Component } from 'react';
import barDisabled from '../images/bar-disabled.svg';
import barEnabled from '../images/bar-enabled.svg';

class Bar extends Component {
    render() {
        return (
            <img
                src={this.props.type === 'enabled' ? barEnabled : barDisabled}
                alt=''
                style={{
                    height: '10px',
                    width: '20%',
                    margin: 'auto auto'
                }}
            />
        );
    }
}

export default Bar;
