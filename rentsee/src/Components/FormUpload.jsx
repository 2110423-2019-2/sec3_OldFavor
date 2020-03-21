import React, { Component } from 'react';
import './FormUpload.css';

class FormUpload extends Component {
    constructor(props) {
        super(props);
        this.state = {
            photoUrl: this.props.photoUrl
        };
        this.handleChange = this.handleChange.bind(this);
    }
    handleChange(event) {
        const target = event.target.files[0];
        const name = target.name;
        let formData = new FormData();
        formData.append('file', target);
        console.log('change: ' + [name] + ' ' + target);
        fetch('https://hueco.ml/temppic/upload.php', {
            method: 'POST',
            mode: 'cors',
            cache: 'no-cache',
            headers: {
                Accept: '*/*'
            },
            redirect: 'follow',
            referrer: 'no-referrer',
            body: formData
        })
            .then(response => {
                if (response.status === 200) {
                    return response.json();
                } else {
                    alert('Request failed');
                }
            })
            .then(resJson => {
                console.log(resJson);
                this.props.handleFormUploadChange(this.props.name, resJson.url);
            })
            .catch(error => {
                console.log('error: ', error);
            });
    }
    render() {
        return (
            <div className='row mx-1'>
                <label class='btn btn-default btn-sm'>
                    Browse{' '}
                    <input type='file' onChange={this.handleChange} hidden />
                </label>
                <a
                    className='ml-2 text'
                    href={this.props.photoUrl}
                    target='_blank'
                    rel='noopener noreferrer'
                    style={{
                        textOverflow: 'ellipsis',
                        overflow: 'hidden',
                        whiteSpace: 'nowrap',
                        display: 'block',
                        width: 150
                    }}
                >
                    {this.props.photoUrl
                        ? this.props.photoUrl
                        : 'No file chosen'}
                </a>
            </div>
        );
    }
}

export default FormUpload;
