import React, { Component } from 'react';

class PrintOut extends Component {
    state = {  }
    render() {
        return <button onClick={() => window.print()}>PRINT</button>;
    }
}

export default PrintOut;