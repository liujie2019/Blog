import React, {Component} from 'react';
import ReactDOM from 'react-dom';

class Home extends Component {
    render() {
        return (
            <div>
                This is Home Page
            </div>
        );
    }
}

ReactDOM.render(
    <Home />,
    document.querySelector('#root')
);