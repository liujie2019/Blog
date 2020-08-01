module.exports = function({types: t}) {
    console.log(t.valueToNode);
    return {
        name: 'insert-html-plugin',
        visitor: {
            ImportDeclaration(path, state) { // 匹配import声明语句
                const node = path.node;
                const {specifiers} = node;
                newSpecifier = t.importSpecifier(t.identifier('html'), t.identifier('html'));
                // 插入html
                specifiers.push(newSpecifier);
            },
            TemplateLiteral(path, state) { // 匹配模板字符串
                const {node, parent} = path;
                if (parent.id.name !== 'template') {
                    return;
                }
                // 将模板字符串替换为标签模板字符串
                //基于原来的模板字符串生成新的标签模板字符串
                parent.init = t.taggedTemplateExpression(t.identifier('html'), t.templateLiteral(node.quasis, node.expressions));
            }
        }
    };
};