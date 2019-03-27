const babel = require('@babel/core');
const path = require('path');
const result = babel.transformFileSync(path.resolve(__dirname) + '/test.js', {
  presets: ['@babel/env'],
  plugins: [
        ["@babel/plugin-transform-runtime", {
        "corejs": 2
        }]
  ]
});

console.log(result.code);