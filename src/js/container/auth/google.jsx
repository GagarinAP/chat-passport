import React from 'react'
import _ from 'lodash'

export default class Google extends React.Component{
    constructor() {
        super();
    }
    render() {
        return(
            <div>
                {_.map(this.props.user,(value)=>{
                    if(value._id) {
                        if(value.google) {
                            return <div className="col-md-6" key={value._id}>
                                <h3 className="text-danger"><span className="fa fa-google-plus"/> Google+</h3>
                                <p><strong>id</strong>: { value.google.id } </p>
                                <p><strong>email</strong>: { value.google.email }</p>
                                <p><strong>name</strong>: { value.google.name }</p>
                                <a href="/unlink/google" className="btn btn-danger">Delete</a>
                            </div>
                        } else {
                            return <div className="col-md-6" key={value._id}>
                                <h3><span className="fa fa-google-plus"/> Google</h3>
                                <a href="/connect/google" className="btn btn-default">Connect Google</a>
                            </div>
                        }
                    }
                })}
            </div>
        );
    }
}