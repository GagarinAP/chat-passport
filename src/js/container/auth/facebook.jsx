import React from 'react'
import _ from 'lodash'

export default class Facebook extends React.Component{
    constructor() {
        super();
    }
    render() {
        return(
            <div>
            {_.map(this.props.user,(value)=> {
                if (value._id) {
                    if (value.facebook) {
                        return <div className="col-md-6" key={value._id}>
                            <h3 className="text-primary"><span className="fa fa-facebook"/> Facebook
                            </h3>
                            <p><strong>id</strong>: { value.facebook.id } </p>
                            <p><strong>email</strong>: { value.facebook.email }</p>
                            <p><strong>name</strong>: { value.facebook.name }</p>
                            <p><strong>photos</strong>: { value.facebook.photos }</p>
                            <a href="/unlink/facebook" className="btn btn-primary">Delete</a>
                        </div>
                    } else {
                        return <div className="col-md-6" key={value._id}>
                            <h3><span className="fa fa-facebook"/> Facebook</h3>
                            <a href="/connect/facebook" className="btn btn-default">Connect Facebook</a>
                        </div>
                    }
                }
            })}
            </div>
        );
    }
}