import React, { Component } from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {searchItemChange} from './actions';
import './App.css';

class App extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        const {foodList, searchItemChange, searchTerm} = this.props;
        console.log(foodList);
        return (
            <div className="App">
                <div className="search">
                    <input
                        type="text"
                        placeholder="请输入要搜索的内容"
                        value={searchTerm}
                        onChange={e => searchItemChange(e.target.value)}
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
                            foodList.food.map(item => {
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

const mapStateToProps = (state, ownProps) => {
    return {
        foodList: state.foodList
    }
}
const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        searchItemChange: bindActionCreators(searchItemChange, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
