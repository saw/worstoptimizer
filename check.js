const z = require('./src/optimize.js');

const test = `
function check(checkTrue) {

    var bob = "hello";
    if (checkTrue === true) {
        console.log(null === undefined);
        const f = 22;
        return true;
    }
console.log('hello');
    return false;
}
          
`;

z(test).then(out => {
    console.log(out.code);
}, err => {
    console.error(err);
})