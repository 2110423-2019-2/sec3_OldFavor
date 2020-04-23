import React, { Component } from 'react';

class EditModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            display: 'none',
            policy: this.props.policy
        };
        this.toggle = this.toggle.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    toggle() {
        const display = this.state.display === 'none' ? 'block' : 'none';
        this.setState({ display });
    }
    handleChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        console.log('change: ' + [name] + ' ' + value);
        this.setState({ [name]: value });
    }
    handleSubmit() {
        this.props.handleEditDeal(this.state.policy);
    }
    render() {
        return (
            <React.Fragment>
                <button
                    style={{
                        float: 'right',
                    }}
                    type='button'
                    className='btn mt-4'
                    onClick={this.toggle}
                >
                    Edit Deal
                </button>
                <div
                    className='modal'
                    tabIndex='-1'
                    role='dialog'
                    style={{ display: this.state.display }}
                >
                    <div
                        className='modal-dialog modal-dialog-scrollable'
                        role='document'
                    >
                        <div className='modal-content'>
                            <div className='modal-header'>
                                <h5 className='modal-title'>Car Deal</h5>
                                <button
                                    type='button'
                                    className='close'
                                    data-dismiss='modal'
                                    aria-label='Close'
                                    onClick={this.toggle}
                                >
                                    <span aria-hidden='true'>&times;</span>
                                </button>
                            </div>
                            <div className='modal-body'>
                                <textarea
                                    style={{ width: '100%' }}
                                    rows='10'
                                    onChange={this.handleChange}
                                    value={this.state.policy}
                                />
                            </div>
                            <div className='modal-footer'>
                                <button
                                    type='button'
                                    className='btn btn-secondary'
                                    data-dismiss='modal'
                                    onClick={this.toggle}
                                >
                                    Close
                                </button>
                                <button
                                    type='button'
                                    className='btn btn-primary'
                                    onClick={this.handleSubmit}
                                >
                                    Edit
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

export default EditModal;
