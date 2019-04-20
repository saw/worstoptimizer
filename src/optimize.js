const parser = require('@babel/parser');
const traverse = require("@babel/traverse").default;
const generate = require('@babel/generator').default;
const t = require('@babel/types');

function wait(time) {
    return new Promise((resolve, reject) => {
        setTimeout(()=> {
            resolve();
        }, time);
    });
}

async function trans(fileData) {
    const cache = {};
    // give ui a chance to update before this starts running
    await wait(0);
    let ast;
    ast = parser.parse(fileData);
    traverse(ast, {
        Literal(path) {
            if(!path.getFunctionParent()) {
                return;
            }
            let cacheKey = `${path.node.type}_${path.node.value}`;
            if(cache[cacheKey]) {
                path.replaceWith(cache[cacheKey].id);
            } else {
                const id = path.scope.generateUidIdentifier('_');
                cache[cacheKey] = {id, val: path.node.value};
                const program = path.findParent(t.isProgram);
                program.scope.push({id, init: path.node, kind: "const"});
                path.replaceWith(id);
            }
        }
    });
    return generate(ast, {}, fileData);
}

module.exports = trans;
