import React, { Component } from 'react';
import './App.css';

class App extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        const {food, searchTermChanged, searchTerm} = this.props;
        return (
            <div className="App">
                <div className="search">
                    <input
                        type="text"
                        placeholder="请输入要搜索的内容"
                        value={searchTerm}
                        onChange={e => searchTermChanged(e.target.value)}
                    />
                </div>
                <table>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Origin</th>
                            <th>Continent</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            food.map(item => {
                                return (
                                    <tr key={item.name}>
                                        <td>{item.name}</td>
                                        <td>{item.origin}</td>
                                        <td>{item.continent}</td>
                                    </tr>
                                );
                            })
                        }
                    </tbody>
                </table>
            </div>
        );
    }
}

export default App;