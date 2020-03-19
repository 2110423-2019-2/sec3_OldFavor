import React, { Component } from 'react';
import downArrow from '../images/down-arrow.svg';

class SortBy extends Component {
    constructor(props) {
        super(props);
        this.state = { tooltipState: 'none' };
        this.tooltip = this.tooltip.bind(this);
        this.options = this.options.bind(this);
    }
    tooltip() {
        const tooltipState = this.state.tooltipState;
        this.setState({
            tooltipState: tooltipState === 'none' ? 'block' : 'none'
        });
    }
    options() {
        const opts = [];
        var i = 0;
        for (const opt of this.props.options) {
            opts.push(
                <span className='text' key={i++}>
                    <div className='text-center'>{opt}</div>
                </span>
            );
        }
        return opts;
    }
    render() {
        return (
            <React.Fragment>
                <div className='align-bottom'>
                    Sort By: {this.props.sort}
                    <button className='pl-2 clear-btn' onClick={this.tooltip}>
                        <img
                            style={{
                                width: '17',
                                height: '11.96px'
                            }}
                            className=''
                            src={downArrow}
                            alt=''
                        />
                    </button>
                </div>
                <div
                    className='card'
                    style={{
                        display: this.state.tooltipState,
                        position: 'absolute',
                        zIndex: 101,
                        minWidth: 150
                    }}
                >
                    {this.options()}
                </div>
            </React.Fragment>
        );
    }
}

export default SortBy;
