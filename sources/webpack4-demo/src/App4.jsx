import React, { Component, Fragment } from 'react';
import { observable, action, configure, computed } from 'mobx';
import { observer } from 'mobx-react';

// 启用严格模式
configure({ enforceActions: true });

class MyState {
    @observable num1 = 0;
    @observable num2 = 100;

    @action addNum1 = () => {
        this.num1 += 1;
    }
    @action addNum2 = () => {
        this.num2 += 1;
    }
    @computed get total() {
        return this.num1 + this.num2;
    }
}

const newState = new MyState();
const AllNum = observer(props => <div>num1 + num2 = {props.store.total}</div>);

const Main = observer(props => (
    <div>
        <p>num1 = {props.store.num1}</p>
        <p>num1 = {props.store.num2}</p>
        <div>
            <button onClick={props.store.addNum1}>num1 + 1</button>
            <button onClick={props.store.addNum2}>num2 + 1</button>
        </div>
    </div>
));

@observer
export default class App extends Component {
    render() {
        return (
            <Fragment>
               <Main store={newState} />
               <AllNum store={newState} />
            </Fragment>
        );
    }
}