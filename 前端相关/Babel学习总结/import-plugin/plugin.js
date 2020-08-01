module.exports = function({types: t}) {
    return {
        name: 'import-plugin',
        visitor: {
            ImportDeclaration(path, state) {
                const {node} = path;
                const {opts} = state;
                // console.log(opts); // { library: 'lodash' }
                // console.log(11); 这里会打印3次
                // console.log(node.specifiers[0]);
                // isImportDefaultSpecifier判断是否是默认导入，是的话不做处理
                if (opts.library === 'lodash' && !t.isImportDefaultSpecifier(node.specifiers[0])) {
                    const newImportDeclarations = node.specifiers.map(specifier => {
                        return t.importDeclaration([t.importDefaultSpecifier(specifier.local)], t.stringLiteral(`${node.source.value}/${specifier.local.name}`));
                    });
                    // 这里替换之后还会再次进行遍历，因此上述的console.log(11); 会打印3次
                    path.replaceWithMultiple(newImportDeclarations);
                }
            }
        }
    };
};