import React from 'react';
import Test from './componnents/Test';
// import { Controlled as CodeMirror } from 'react-codemirror2';
// import { Icon, Steps, Button } from 'antd';
// import Routes from './router2';
// import HocComponent from './User';

// require('codemirror/lib/codemirror.css');
// require('codemirror/mode/python/python');
// require('codemirror/theme/midnight.css');

// const Step = Steps.Step;
// const options = {
//     lineNumbers: true,
//     mode: 'python',
//     theme: 'midnight'
// };

export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: 'hello world'
        };
    }

    render() {
        const { value } = this.state;
        return (
            <div style={{ marginLeft: 20, padding: 10 }}>
                hello world!
                {/* {Routes} */}
                {/* <span>
                    {VERSION}
                </span> */}
                <Test testStr="我是父组件传递的值" />
                {/* <Button type="primary">
                    <Icon type="plus"></Icon>新增app
                </Button> */}
                {/* <div className="codemirror-mid">
                    <CodeMirror
                        value={value}
                        options={options}
                        onBeforeChange={(editor, data, value) => {
                            this.setState({ value });
                        }}
                    />
                </div> */}
                {/* <HocComponent />
                <Steps current={1}>
                    <Step title="Finished" description="This is a description." />
                    <Step title="In Progress" description="This is a description." />
                    <Step title="Waiting" description="This is a description." />
                </Steps> */}
            </div>
        );
    }
}