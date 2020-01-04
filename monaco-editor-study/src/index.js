import * as monaco from 'monaco-editor';
import './index.css';
monaco.editor.create(document.getElementById('container'), {
  value: [
    'function x() {',
    '\tconsole.log("Hello world!Hello world!Hello world!!!!!");',
    '}'
  ].join('\n'),
  language: 'javascript'
});