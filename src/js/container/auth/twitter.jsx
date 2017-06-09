import React from 'react'
import _ from 'lodash'

export default class Twitter extends React.Component{
    constructor() {
        super();
    }
    render() {
        return(
            <div>
                {_.map(this.props.user,(value)=> {
                    if (value._id) {
                        if (value.twitter) {
                            return <div className="col-md-6" key={value._id}>
                                <h3 className="text-info"><span className="fa fa-twitter"/> Twitter</h3>
                                <p><strong>id</strong>: { value.twitter.id } </p>
                                <p><strong>name</strong>: { value.twitter.name }</p>
                                <p><strong>username</strong>: { value.twitter.username }</p>
                                <a href="/unlink/twitter" className="btn btn-info">Delete</a>
                            </div>
                        } else {
                            return <div className="col-md-6" key={value._id}>
                                <h3><span className="fa fa-twitter"/> Twitter</h3>
                                <a href="/connect/twitter" className="btn btn-default">Connect Twitter</a>
                            </div>
                        }
                    }
                })}
            </div>
        );
    }
}