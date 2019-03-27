import React from 'react';

//创建context实例
const ThemeContext = React.createContext({
    background: 'red',
    color: 'white'
});

class Title extends React.Component {
    render() {
        return (
            <ThemeContext.Consumer>
                {
                    context => (
                        <h1 style={{backgroundColor: context.background, color: context.color}}>
                            {this.props.children}
                        </h1>
                    )
                }
            </ThemeContext.Consumer>
        )
    }
}

class Header extends React.Component {
    render() {
        return (
            <Title>
                Hello React Context API
            </Title>
        )
    }
}

export default class App extends React.Component {
    render() {
        return(
            <ThemeContext.Provider
                value={{background: 'green', color: 'white'}}
            >
                <Header/>
            </ThemeContext.Provider>
        )
    }
}

