import React, { Component } from 'react';

class PrintOut extends Component {
    constructor(props) {
        super(props);
        state = {};
    }
    render() {
        return (
            <button className='btn' onClick={() => window.print()}>
                PRINT
            </button>
        );
    }
}

export default PrintOut;
