import React from 'react'
import ReactDOM from 'react-dom'
import {withRouter, Link} from 'react-router-dom'
import {connect} from "react-redux"
import _ from 'lodash'
import createFragment from 'react-addons-create-fragment'
import * as pageActions from '../action/index'
import io from "socket.io-client"
import moment from "moment"

const socket = io();

class Room extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            nickname: {},
            users: [],
            message: '',
            messages: [],
            statusMessage: false,
            userWhoTypingMessage: ''
        };

        this.userNames = this.userNames.bind(this);
        this.submitMessage = this.submitMessage.bind(this);
        this.handleMessage = this.handleMessage.bind(this);
        this.messagesChat = this.messagesChat.bind(this);
        this.anymessageView = this.anymessageView.bind(this);
        this.parseDateWithMomento = this.parseDateWithMomento.bind(this);
        this.userSwapper = this.userSwapper.bind(this);
        this.messageSwapper = this.messageSwapper.bind(this);
        this.userSwapperWithStatus = this.userSwapperWithStatus.bind(this);
    }

    componentWillMount() {
        socket.on('usernames', this.userNames);
        socket.on('new:message', this.messagesChat);
        socket.on('status:message', this.anymessageView);
    }
    componentDidMount() {
        let user = {};
        if(this.props.user.user.facebook){
            user = this.props.user.user.facebook;
        } else if(this.props.user.user.twitter) {
            user = this.props.user.user.twitter;
        } else if(this.props.user.user.google) {
            user = this.props.user.user.google;
        }
        this.scrollToBottom();
        this.setState({
            nickname: user
        });
        socket.emit('new:user', user);
    }

    componentDidUpdate(prevProps, prevState) {
        this.scrollToBottom();
    }

    scrollToBottom() {
        const chatContainer = ReactDOM.findDOMNode(this.chatContainer);
        chatContainer.scrollTop = chatContainer.scrollHeight;
    }

    userNames(data) {
        this.setState({
            users: data
        });
    }

    anymessageView(data) {
        let that = this;
        const {status,userWhoTypingMessage} = data;

        let timerId = setInterval(function() {
            if(data) {
                that.setState({
                    statusMessage: status,
                    userWhoTypingMessage: userWhoTypingMessage
                });
            }
        }, 200);

        setTimeout(function() {
            clearInterval(timerId);
            that.setState({
                statusMessage: false
            });
        }, 1500);
    }

    handleMessage(event) {
        this.setState({message: event.target.value});
        socket.emit('status:message', event.target.value);
    }

    submitMessage(event) {
        event.preventDefault();
        socket.emit('send:message', this.state.message);
        this.setState({
            message: ''
        });
    }

    messagesChat(data) {
        let {messages} = this.state;
        messages.push(data);
        this.setState(messages);
    }

    parseDateWithMomento(date) {
        let localTime  = moment.utc(date).toDate();
        localTime = moment(localTime).format('HH:mm');
        return localTime;
    }

    userSwapper(data) {
        let name;
        let photos;
        name = createFragment({
            name: data.name
        });
        photos = createFragment({
            photos: data.photos
        });
        return <div><img className="img-circle" src={photos}/> <strong> {name}</strong></div>;
    }

    messageSwapper(data) {
        let nick,photos;
        nick = createFragment({
            nick: data.nick.name
        });
        photos = createFragment({
            photos: data.nick.photos
        });
        return <div>
            <img src={photos}/>
            <span className="chat-date">{this.parseDateWithMomento(data.date)}</span>
            <strong> {nick}: </strong>
            <span className="chat-message">{data.msg}</span>
        </div>;
    }

    userSwapperWithStatus(data) {
        let name;
        let photos;
        name = createFragment({
            name: data.name
        });
        photos = createFragment({
            photos: data.photos
        });
        return <div>
            <img className="img-circle" src={photos}/>
            <strong> {name}</strong>
            <i style={{display: !this.state.statusMessage ? 'none' : ''}}
               className="glyphicon glyphicon-pencil pull-right pencil-padding-top"/>
        </div>;
    }

    render() {
        console.log('props Room: ', this.props);
        console.log('state Room: ', this.state);
        return (
            <div className="container-fluid" id="main">
                <Link to="/"> Home</Link>
            <div className="row">
                <div className="col-md-4 col-lg-4">
                    <div className="well users">
                        <h3 className="text-center">Online users:</h3>
                        <ul className="list-group">
                            {
                                _.map(this.state.users, (value, key) => {
                                    if(this.state.nickname.token === value.token) {
                                        return <li className="list-group-item" key={key}>
                                            {this.userSwapper(value)}
                                        </li>
                                    } else if (this.state.userWhoTypingMessage.token === value.token) {
                                        return <li className="list-group-item" key={key}>
                                            {this.userSwapperWithStatus(value)}
                                        </li>
                                    } else {
                                        return <li className="list-group-item" key={key}>
                                            {this.userSwapper(value)}
                                        </li>
                                    }
                                })
                            }
                        </ul>
                    </div>
                </div>
                <div className="col-md-8 col-lg-8 chat-border">
                    <div className="well chat" ref={(el) => { this.chatContainer = el; }}>
                        {
                            _.map(this.state.messages, (value, key) => {
                                if (this.state.nickname.token === value.nick.token) {
                                    return <p className="bg-info bg-info-padding" key={key}>
                                        {this.messageSwapper(value)}
                                    </p>
                                } else {
                                    return <p className="bg-info-padding" key={key}>
                                        {this.messageSwapper(value)}
                                    </p>
                                }
                            })
                        }
                    </div>
                    <form onSubmit={this.submitMessage} id="sendMessage">
                        <div className="input-group">
                            <input type="text"
                                   value={this.state.message}
                                   onChange={this.handleMessage}
                                   className="form-control"
                                   placeholder="Message"
                            />
                            <div className="input-group-btn">
                                <button className="btn btn-default" type="submit" disabled={!this.state.message}>
                                    <i className="glyphicon glyphicon-send"/>
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
        );
    }
}
const mapStateToProps = (state) => ({
    user: state.user.user,
    users: state.users.users,
    rooms: state.rooms.rooms
});

export default withRouter(connect(mapStateToProps)(Room));