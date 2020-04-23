import React, { Component } from 'react';

class CancelButton extends Component {
    constructor(props){
        super(props);
        this.state = {};
    }

    onCancel = () => {
        const id = this.props._id;
        alert(`Boop Beep cancel change policy cancel deal ${id}!`);
    }

    onAccept = () => {
        const id = this.props._id;
        alert(`Boop Beep accept change policy update deal ${id}!`);
    }

    render() {
        return this.props.haveChanged === true ? (
            <div className='w-100'>
                <div className='d-flex flex-row justify-content-end text-danger'>Policy has been changed. Do you accept the change?</div>
                <div className='d-flex flex-row justify-content-end'>
                    <button className='d-flex flex-column mx-1 btn'>
                        Cancel Change
                    </button>
                    <button className='d-flex flex-column mx-1 btn'>
                        Accept Change
                    </button>
                </div>
            </div>
        ) : (
            <div></div>
        );
    }
}

export default CancelButton;