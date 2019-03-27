import React, { Component, Fragment } from 'react';
import './App.css';
import DigtalClock from './components/DigtalClock';
import ThemeContext from './theme-context';
import ThemedBar from './components/ThemedBar';

const themes = {
    light: {
        classnames: 'btn btn-primary',
        bgColor: '#eee',
        color: '#000'
    },
    dark: {
        classnames: 'btn btn-light',
        bgColor: '#222',
        color: '#fff'
    }
};

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            theme: 'light'
        };
    }

    handleThemeChange(theme) {
        this.setState({
            theme: theme
        });
    }

    render() {
        const { theme } = this.state;
        return (
            <ThemeContext.Provider value={themes[theme]}>
                <Fragment>
                    <a
                        href="#theme-switcher"
                        className="btn btn-light"
                        onClick={() => this.handleThemeChange('light')}
                    >
                        浅色主题
                    </a>
                    <a
                        href="#theme-switcher"
                        className="btn btn-secondary"
                        onClick={() => this.handleThemeChange('dark')}
                    >
                        深色主题
                    </a>
                    <ThemedBar />
                </Fragment>
            </ThemeContext.Provider>
        );
    }
}

export default App;
