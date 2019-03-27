import React from 'react';
import { observable, action, configure } from 'mobx';
import { observer } from 'mobx-react';

// 启用严格模式
configure({ enforceActions: true });

class MyState {
    @observable num = 0;
    @action addNum = () => {
        this.num += 1;
    }
}

const newState = new MyState();

@observer
export default class App extends React.Component {
    render() {
        return (
            <React.Fragment>
                <p>{newState.num}</p>
                <button onClick={newState.addNum}>点击加1</button>
            </React.Fragment>
        );
    }
}