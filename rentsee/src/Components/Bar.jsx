import React, { Component } from 'react';
import barDisabled from '../images/bar-disabled.svg';
import barEnabled from '../images/bar-enabled.svg';

class Bar extends Component {
    render() {
        return (
            <div style={{ margin: 'auto auto' }}>
                <span
                    className='row px-5 font-weight-bold'
                    style={{
                        color: '#545372',
                        lineHeight: '18px',
                        minHeight: '18px'
                    }}
                >
                    {this.props.type === 'enabled' ? this.props.label : ' '}
                </span>
                <div className='row'>
                    <img
                        src={
                            this.props.type === 'enabled'
                                ? barEnabled
                                : barDisabled
                        }
                        alt=''
                        style={{
                            height: '10px',
                            width: '100%'
                        }}
                    />
                </div>
            </div>
        );
    }
}

export default Bar;
