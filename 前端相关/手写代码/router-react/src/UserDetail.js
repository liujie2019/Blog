import React, { Component } from 'react'

class UserDetail extends Component {
    constructor() {
        super();
    }
    render() {
        return (
            <div>
                Detail {this.props.match.params.id}
            </div>
        )
    }
}

export default UserDetail
