import React from 'react'
import {withRouter, Link} from 'react-router-dom'
import {connect} from "react-redux"
import * as pageActions from '../action/index'

import Rooms from './Rooms'
import Facebook from './auth/facebook'
import Twitter from './auth/twitter'
import Google from './auth/google'

class Profile extends React.Component{
    constructor(props) {
        super(props);
        this.logoutLink = this.logoutLink.bind(this);
    }
    componentDidMount() {
        pageActions.getUser();
        pageActions.getRoomsUser();
    }
    logoutLink() {
        pageActions.logoutUser();
        this.props.history.push('/');
    }
    render() {
        //console.log(this.props);
        return(
            <div className="container">
                <div className="page-header text-center">
                    <h1><span className="fa fa-anchor"/> Profile Page</h1>
                    <Link className="btn btn-default btn-sm" to="/">Home</Link>
                    <a type="submit" onClick={this.logoutLink} className="btn btn-default btn-sm">Logout</a>
                </div>

                <div className="row">
                    <div className="col-md-12">
                        <div className="well">
                            <div className="row">
                                <Facebook user={this.props.user} />
                                <Twitter user={this.props.user} />
                                <Google user={this.props.user} />
                            </div>
                        </div>
                        CREATE ROOM: <Link className="btn btn-danger" to={'/addroom'}><i className="fa fa-plus fa-2x"/></Link>
                        <Rooms />
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

export default withRouter(connect(mapStateToProps)(Profile));