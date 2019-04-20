require('./styles.scss');
const z = require('./optimize.js');
const codeFrameColumns = require('@babel/code-frame').codeFrameColumns;
const button = document.querySelector('button');
const input = document.querySelector('#input');
const output = document.querySelector('#output');
const hljs = require('highlight.js/lib/highlight.js');
const js = require('highlight.js/lib/languages/javascript');
hljs.registerLanguage('javascript', js);
button.addEventListener('click', e => {
    button.classList.add('is-loading');
    z(input.value).then(result => {
        output.textContent = result.code;
        hljs.highlightBlock(output);
        output.classList.remove('is-hidden');
        button.classList.remove('is-loading');
        output.scrollIntoView();
    }, err => {
        output.textContent = 'Parse error:\n' + codeFrameColumns(input.value, err.loc, {message: err.message});
        button.classList.remove('is-loading');
        output.classList.remove('is-hidden');
    });
});