import React, { Component } from 'react';
import Bar from '../Components/Bar';

class BarStatus extends Component {
    render() {
        var bars = [];
        for (var i = 0; i < this.props.count; i++) {
            bars.push(
                <Bar
                    type={i === this.props.current - 1 ? 'enabled' : 'disabled'}
                    label={this.props.labels ? this.props.labels[i]: ' ' }
                    key={i}
                />
            );
        }
        return <div className='row'>{bars}</div>;
    }
}

export default BarStatus;
