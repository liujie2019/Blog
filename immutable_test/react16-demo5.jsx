// 更加自由的DOM属性
import React, { Component } from 'react';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            overlayActive: true
        };
    }

    closeOverlay() {
        this.setState({
            overlayActive: false
        });
    }

    render() {
        return (
            <div>
                <h2>Dashboard</h2>
                {
                    this.state.overlayActive &&
                    <Overlay onClose={() => this.closeOverlay()}/>
                }
            </div>
        );
    }
}

export default App;