import React from 'react';
import {withRouter, Link} from 'react-router-dom'
import {connect} from "react-redux"
import _ from 'lodash'
import * as pageActions from '../action/index'

class Rooms extends React.Component {
    constructor(props) {
        super(props);
        this.removeRoom = this.removeRoom.bind(this);
    }
    removeRoom(id) {
        pageActions.deleteRoom(id);
    }
    render() {
        return (
            <div className="container">
                <div className="row">
                    <hr/>
                    {_.reverse(_.map(_.filter(this.props.rooms,(item => item.title)), (item, key) => {
                        if(item._id || !item.title) {
                            return <div key={key} className="col-md-4">
                                <div className="well">
                                <h2><Link to={'/room/'+item._id}>{item.title}</Link></h2>
                                <p>
                                    <i className="fa fa-calendar"/> {(new Date(item.date)).toDateString()}
                                    <a onClick={() => this.removeRoom(item._id)}><i className="fa fa-trash-o"/></a>
                                </p>
                                </div>
                            </div>
                        }
                    }))}
                </div>
            </div>
        );
    }
}
const mapStateToProps = (state) => ({
    user: state.user.user,
    users: state.user.users,
    rooms: state.rooms.rooms
});

export default withRouter(connect(mapStateToProps)(Rooms));