const less = require('less');

function loader(source) {
    // console.log(typeof source); // string
    let css = '';
    less.render(source, (err, output) => {
        // console.log(output);
        /**
         * { css:
            'body {\n  background-color: green;\n  background: url(\'./avatar.jpg\');\n}\n',
            imports: [] }
        */
        css = output.css;
    });
    return css;
}

module.exports = loader;