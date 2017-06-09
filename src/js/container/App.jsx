import React from 'react'
import {withRouter, Link} from 'react-router-dom'
import {connect} from "react-redux"
import _ from 'lodash'
import Rooms from './Rooms'
import * as pageActions from '../action/index'

class App extends React.Component{
    constructor(props) {
        super(props);
        this.parseLink = this.parseLink.bind(this);
    }
    componentDidMount() {
        pageActions.getUser();
        pageActions.getRoomsUser();
    }
    parseLink() {
        if ((typeof this.props.user !== 'object') || (typeof this.props.user === 'undefined') || (this.props.user === null)) {
            return(
                <div>
                    <h1><span className="fa fa-lock"/> Chat Authentication</h1>
                    <p>Login or Register with:</p>
                    <a href="/auth/facebook" className="btn btn-primary"><span className="fa fa-facebook"/> Facebook</a>
                    <a href="/auth/twitter" className="btn btn-info"><span className="fa fa-twitter"/> Twitter</a>
                    <a href="/auth/google" className="btn btn-danger"><span className="fa fa-google-plus"/> Google+</a>
                </div>
            );
        } else {
            return(
                <div>
                    { _.map(this.props.user, (value, key) => {
                        if(value.facebook || value.twitter || value.google) {
                            if(value.facebook) return <div key={key}><img className="img-circle" src={value.facebook.photos}/><h2><strong>Welcome</strong>, <Link to="/profile">{value.facebook.name}</Link></h2></div>;
                            if(value.twitter) return <div key={key}><img className="img-circle" src={value.twitter.photos}/><h2><strong>Welcome</strong>, <Link to="/profile">{value.twitter.name}</Link></h2></div>;
                            if(value.google) return <div key={key}><img className="img-circle" src={value.google.photos}/><h2><strong>Welcome</strong>, <Link to="/profile">{value.google.name}</Link></h2></div>;
                        } else {
                            return(
                                <div key={key}>
                                    <h1><span className="fa fa-lock"/> Chat Authentication</h1>
                                    <p>Register with:</p>
                                    <a href="/auth/facebook" className="btn btn-primary"><span className="fa fa-facebook"/> Facebook</a>
                                    <a href="/auth/twitter" className="btn btn-info"><span className="fa fa-twitter"/> Twitter</a>
                                    <a href="/auth/google" className="btn btn-danger"><span className="fa fa-google-plus"/> Google+</a>
                                </div>
                            );
                        }
                    })}
                </div>
            );
        }
    }
    render() {
        //console.log('App state: ',this.state);
        //console.log('App props: ',this.props);
        return(
            <div className="container">
                <div className="jumbotron text-center">
                    {this.parseLink()}
                </div>
                <Rooms/>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    users: state.users.users,
    user: state.user.user,
    rooms: state.rooms.rooms
});

export default withRouter(connect(mapStateToProps)(App));