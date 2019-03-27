import React, { Component } from 'react';
import './App.css';
import Person from './person/Person';

class App extends Component {
    state = {
        count: 1,
        name: 'hello jsx'
    };
    handleAdd = () => {
        let count = this.state.count;
        this.setState({
            count: ++count
        });
    };
    handleNameChange = e => {
        this.setState({
            name: e.target.value
        });
    }
    render() {
        return (
        <div className="App">
            hello react
            <Person
                handleChange = {this.handleNameChange}
                name={this.state.name}
            />
            <Person name={this.state.name}>
                我是子属性
                <span>---哈哈哈</span>
            </Person>
            <button onClick={this.handleAdd}>+</button>
            <h2>{this.state.count}</h2>
        </div>
        );
    }
}

export default App;
