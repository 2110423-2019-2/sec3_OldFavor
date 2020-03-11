import React, { Component } from 'react';
import Bar from '../Components/Bar';

class BarStatus extends Component {
    constructor(props) {
        super(props);
        this.state = { count: 0, current: 0 };
    }
    componentDidMount() {
        const { count, current } = this.props;
        this.setState({ count: count, current: current });
    }
    render() {
        var bars = [];
        for (var i = 0; i < this.state.count; i++) {
            bars.push(
                <Bar
                    type={i === this.state.current - 1 ? 'enabled' : 'disabled'}
                    key={i}
                />
            );
        }
        return <div className='row'>{bars}</div>;
    }
}

export default BarStatus;
