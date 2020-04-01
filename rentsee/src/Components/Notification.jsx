import React, { Component } from 'react';
import utils from '../utils.js';

class Notification extends Component {
    constructor(props) {
        super(props);
        this.state = {
            notificationsCount: 0,
            notifications: [],
            tooltipState: 'none'
        };
        this.display = this.display.bind(this);
        this.fetchNotifications = this.fetchNotifications.bind(this);
        this.tooltip = this.tooltip.bind(this);
        this.notificationTooltip = this.notificationTooltip.bind(this);
    }
    componentDidMount() {
        this.fetchNotifications();
        setInterval(this.fetchNotifications, 10000);
    }
    fetchNotifications() {
        fetch('https://hueco.ml/rentsee/api/notificationsCount', {
            method: 'GET',
            headers: utils.authHeader()
        })
            .then(response => {
                return response.json();
            })
            .then(resJson => {
                const notificationsCount = resJson;
                this.setState({ notificationsCount });
            })
            .catch(error => {
                console.log(error);
            });
    }
    display() {
        return this.state.notificationsCount > 0 ? 'inline-block' : 'none';
    }
    async tooltip() {
		var  res = await fetch('https://hueco.ml/rentsee/api/notifications', {
            method: 'GET',
            headers: utils.authHeader()
        });
		var notifications = await res.json();
		console.log(notifications);
		await this.setState({ notifications });
        const tooltipState = this.state.tooltipState;
        this.setState({
            tooltipState: tooltipState === 'none' ? 'block' : 'none'
        });
    }
    notificationTooltip() {
        var notis = [];
        var i = 0;
        const notifications = this.state.notifications;
        for (const noti of notifications) {
            const msg = noti.message;
            const div =
                i === notifications.length - 1 ? (
                    <div key={i}> {msg} </div>
                ) : (
                    <React.Fragment key={i}>
                        <div> {msg} </div>
                        <hr />
                    </React.Fragment>
                );
            notis.push(div);
            i++;
        }
        return notis.length === 0 ? <div>No Notifications</div> : notis;
    }
    render() {
        return (
            <React.Fragment>
                <i style={{ float: 'right', marginTop: 35, marginLeft: 15 }}>
                    <button className='clear-btn' onClick={this.tooltip}>
                        <svg
                            xmlns='http://www.w3.org/2000/svg'
                            width='17'
                            height='17'
                            viewBox='0 0 24 24'
                            fill='#545372'
                        >
                            <path d='M15 21c0 1.598-1.392 3-2.971 3s-3.029-1.402-3.029-3h6zm.137-17.055c-.644-.374-1.042-1.07-1.041-1.82v-.003c.001-1.172-.938-2.122-2.096-2.122s-2.097.95-2.097 2.122v.003c.001.751-.396 1.446-1.041 1.82-4.668 2.709-1.985 11.715-6.862 13.306v1.749h20v-1.749c-4.877-1.591-2.193-10.598-6.863-13.306zm-3.137-2.945c.552 0 1 .449 1 1 0 .552-.448 1-1 1s-1-.448-1-1c0-.551.448-1 1-1zm-6.451 16c1.189-1.667 1.605-3.891 1.964-5.815.447-2.39.869-4.648 2.354-5.509 1.38-.801 2.956-.76 4.267 0 1.485.861 1.907 3.119 2.354 5.509.359 1.924.775 4.148 1.964 5.815h-12.903z' />
                        </svg>
                        <span
                            style={{ display: this.display() }}
                            className='badge badge-pill badge-danger'
                        >
                            {this.state.notificationsCount}
                        </span>
                    </button>
                </i>
                <div
                    className='card text-center py-3'
                    style={{
                        minWidth: 250,
                        // position: 'absolute',

                        backgroundColor: 'rgba(255,255,255)',
                        boxShadow: '10 10',
                        borderRadius: 5,
                        zIndex: 101,
                        display: this.state.tooltipState
                    }}
                >
                    {this.notificationTooltip()}
                </div>
            </React.Fragment>
        );
    }
}

export default Notification;
