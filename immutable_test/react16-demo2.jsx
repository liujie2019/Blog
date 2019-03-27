// 返回多个元素
import React, { Component } from 'react';

const Fruits = () => [
    <li key="1">apple</li>,
    <li key="2">pear</li>
];

class App extends Component {
    render() {
        return [
            <ul>
                <li>Banana</li>
                <Fruits />
            </ul>,
            <div>
                this is a div
            </div>
        ];
    }
}

export default App;