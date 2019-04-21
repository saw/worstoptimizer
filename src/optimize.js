import generate from '@babel/generator';
import traverse from '@babel/traverse';
import * as parser from '@babel/parser';
import hljs from 'highlight.js';
import javascript from 'highlight.js/lib/languages/javascript';
hljs.registerLanguage('javascript', javascript);
function wait(time) {
    return new Promise((resolve, reject) => {
        setTimeout(()=> {
            resolve();
        }, time);
    });
}

async function transform(fileData) {
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
                const program = path.findParent(path => path.isProgram());
                program.scope.push({id, init: path.node, kind: "const"});
                path.replaceWith(id);
            }
        }
    });
    return generate(ast, {}, fileData);
}

export { transform, hljs }
