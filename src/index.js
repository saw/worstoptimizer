require('./styles.scss');
import './styles.scss';
const button = document.querySelector('button');
const input = document.querySelector('#input');
const output = document.querySelector('#output');


button.addEventListener('click', async e => {
    button.classList.add('is-loading');
    const d = await import(/* webpackChunkName: "optimize" */ './optimize.js');
    const hljs = d.hljs;
    const transform = d.transform;
    transform(input.value).then(result => {
        output.textContent = result.code;
        hljs.highlightBlock(output);
        output.classList.remove('is-hidden');
        button.classList.remove('is-loading');
        output.scrollIntoView();
    }, err => {
        console.log('error', err);
        output.textContent = 'Parse error: ' +  err.message;
        button.classList.remove('is-loading');
        output.classList.remove('is-hidden');
    });
});