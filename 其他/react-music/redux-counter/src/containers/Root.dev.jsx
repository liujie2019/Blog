import React from 'react';
import { Provider } from 'react-redux';
import CounterApp from './CounterApp';
import DevTool from './DevTool';

export default class Root extends React.Component {
    render() {
        const { store } = this.props;
        return (
            <Provider store={store}>
                <div>
                    <CounterApp />
                    <DevTool />
                </div>
            </Provider>
        )
    }
}
