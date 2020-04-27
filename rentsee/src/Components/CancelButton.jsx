import React, { Component } from 'react';

class CancelButton extends Component {
    constructor(props) {
        super(props);
        this.state = {
            display: 'd-block',
        };
    }

    render() {
        return (
            <div className={`w-100 ${this.state.display}`}>
                <div className='d-flex flex-row justify-content-end'>
                    <button
                        className='d-flex flex-column mx-1 btn'
                        onClick={this.props.handleCancel}
                    >
                        Cancel Change
                    </button>
                </div>
            </div>
        );
    }
}

export default CancelButton;
