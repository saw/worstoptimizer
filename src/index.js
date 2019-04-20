require('./styles.scss');
const z = require('./optimize.js');
const codeFrameColumns = require('@babel/code-frame').codeFrameColumns;
const button = document.querySelector('button');
const input = document.querySelector('#input');
const output = document.querySelector('#output');
button.addEventListener('click', e => {
    button.classList.add('is-loading');
    z(input.value).then(result => {
        output.textContent = result.code;
        output.scrollIntoView();
        button.classList.remove('is-loading');
    }, err => {
        output.textContent = 'Parse error:\n' + codeFrameColumns(input.value, err.loc, {message: err.message});
        button.classList.remove('is-loading');
    });
});