import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import _ from 'lodash';

class Home extends Component {
    render() {
        return (
            <div>
                {_.join(['This', 'is', 'Home'], ' ')}
            </div>
        );
    }
}

ReactDOM.render(
    <Home />,
    document.querySelector('#root')
);