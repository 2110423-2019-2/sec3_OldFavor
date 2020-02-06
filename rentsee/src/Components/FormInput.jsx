import React, { Component } from 'react';

class FormInput extends Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
    }
    handleChange(event) {
        this.props.handleFormChange(event);
    }
    render() {
        return (
            <div className='input-with-icon my-1'>
                <input
                    className={this.props.className ? this.props.className : 'form-control'}
                    type={this.props.type}
                    name={this.props.name}
                    placeholder={this.props.placeholder}
                    value={this.props.value}
                    onChange={this.handleChange}
                />
                <i>
                    <svg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='#C4C4C4'>
                        <path d={this.props.icon} />
                    </svg>
                </i>
            </div>
        );
    }
}

export default FormInput;
