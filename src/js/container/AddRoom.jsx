import React from 'react'
import {withRouter, Link} from 'react-router-dom'
import {connect} from "react-redux"
import {addRoom} from '../action/index'

class AddRoom extends React.Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleChange(event) {
        const target = event.target;
        const title = target.name;
        this.setState({
            [title]: event.target.value
        });
    }
    handleSubmit(event) {
        addRoom(this.state.title);
        this.redirect();
        event.preventDefault();
    }
    redirect(){
        this.props.history.push('/profile');
    }
    render() {
        return (
            <div className="container">
                <div className="col-sm-10 col-sm-offset-1">
                    <Link className="btn btn-default" to="/">Home</Link>
                    <form onSubmit={this.handleSubmit}>
                        <div className="form-group">
                            <label>Title room</label>
                            <input type="text" className="form-control" name="title" onChange={this.handleChange}/>
                        </div>

                        <input type="submit" value="Create" className="btn btn-warning btn-lg"/>
                    </form>

                </div>
            </div>
        );
    }
}
const mapStateToProps = (state) => ({
    user: state.user.user,
    rooms: state.rooms.rooms
});

export default withRouter(connect(mapStateToProps)(AddRoom));