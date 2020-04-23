import React, { Component } from 'react';

class CancelButton extends Component {
    constructor(props){
        super(props)
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
        return (
            <div className='d-flex flex-row'>
                <button className='btn'>Cancel Change</button>
                <button className='btn'>Accept Change</button>
            </div>
        );
    }
}

export default CancelButton;