const input = document.createElement('input');
document.body.appendChild(input);

const div = document.createElement('div');
document.body.appendChild(div);

const render = () => {
    const content = require('./content').default;
    console.log(content);
    div.innerText = content;
}

render();

if (module.hot) {
    module.hot.accept(['./content.js'], render);
}