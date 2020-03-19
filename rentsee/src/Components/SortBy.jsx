import React, { Component } from 'react';
import downArrow from '../images/down-arrow.svg';

class SortBy extends Component {
    constructor(props) {
        super(props);
        var sort = this.props.sort;
        this.state = { tooltipState: 'none', sort: sort };
        this.tooltip = this.tooltip.bind(this);
        this.options = this.options.bind(this);
    }
    tooltip() {
        const tooltipState = this.state.tooltipState;
        this.setState({
            tooltipState: tooltipState === 'none' ? 'block' : 'none'
        });
    }
    handleOnClickSort = e => {
        var target = e.target;
        var value = target.value;
        this.setState({ sort: value });
        this.tooltip();
        // process.nextTick(() => {
        //     console.log('after', this.state.sort);
        // });
    };
    options() {
        const opts = [];
        var i = 0;
        for (const opt of this.props.options) {
            opts.push(
                <div className='text-center' key={i++}>
                    <button
                        className='clear-btn'
                        onClick={this.handleOnClickSort}
                        value={opt}
                    >
                        {opt}
                    </button>
                </div>
            );
        }
        return opts;
    }
    render() {
        return (
            <React.Fragment>
                <div className='align-bottom'>
                    Sort By: {this.state.sort}
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
