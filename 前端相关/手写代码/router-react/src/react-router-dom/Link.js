import React, { Component } from 'react';
import {Consumer} from './context';

class Link extends Component {
    constructor() {
        super();
    }
    render() {
        return (
            <Consumer>
                {
                    state => {
                        return <a
                                href="javascript:void(0);"
                                onClick={() => {
                                state.history.push(this.props.to);
                            }}>
                            {this.props.children}
                        </a>
                    }
                }
            </Consumer>
        );
    }
}

export default Link;
