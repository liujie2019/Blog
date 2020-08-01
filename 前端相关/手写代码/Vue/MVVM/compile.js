class Compile {
    constructor(el, vm) { // vm就是当前的vm实例
        // 如果在实例化vm的时候，el传的是字符串，即el: '#app'。
        // 这里就需要document.querySelector(el)获取到对应的DOM节点
        this.el = this.isElementNode(el) ? el : document.querySelector(el);
        this.vm = vm;
        if (this.el) {
            // 如果可以获取到元素，才开始编译
            // 1. 先把this.el中的真实的DOM放到内存中(采用文档碎片-fragment，在内存中操作元素性能好)
            // 放在内存中操作DOM不会造成页面的重复渲染，性能更好
            const fragment = this.nodeToFragment(this.el);
            // 2. 编译 => 提取想要的元素节点v-model和文本节点{{}}
            this.compile(fragment);
            // 3. 最后把编译好的fragment放回到页面里去
            this.el.appendChild(fragment);
        }
    }
    /**一些辅助方法 */
    isElementNode(node) {
        // 判断是否为元素节点
        return node.nodeType === 1;
    }
    // 判断是否为指令
    isDirective(name) {
        return name.startsWith('v-');
    }
    isEventDirective(dir) {
        return dir.startsWith('on');
    }
    /**核心方法 */
    compileElement(node) { // node是当前要编译的节点
        // 带v-model
        const attrs = node.attributes; // 获取当前节点的所有属性
        // console.log(attrs);
        Array.from(attrs).forEach(attr => {
            // attr举例：v-model="message.a"
            const attrName = attr.name;
            // 判断属性名字是不是包含v-
            if (this.isDirective(attrName)) {
                // 如果包含v-，则取到对应的值放到节点中
                // expr为指令对应的值
                const expr = attr.value;
                // node vm.$data
                // todo this.vm.$data中多级属性获取值，比如vm.$data.obj.a.a...
                // const type = attrName.slice(2);
                // attrName的值为v-model
                // 还有其他指令v-text、v-html
                const [, type] = attrName.split('-');
                // 事件指令特殊处理
                if (this.isEventDirective(type)) {
                    CompileUtil.eventHandler(node, this.vm, expr, type);
                } else { // 普通指令处理
                    CompileUtil[type](node, this.vm, expr);
                }
            }
        });
    }
    compileText(node) {
        // 带{{}}
        const text = node.textContent; // 获取文本中的内容
        // const reg = /\{\{(.+?)\}\}/g;
        const reg = /\{\{([^}]+)\}\}/g;
        if (reg.test(text)) {
            CompileUtil['text'](node, this.vm, text);
        }
    }

    compile(fragment) {
        // 需要递归
        // 注意childNodes也包含了空白节点
        const childNodes = fragment.childNodes;
        // console.log(childNodes);
        // 这里拿到的childNodes只是第一层，需要递归拿深层元素和文本
        // childNodes是一个NodeList，即类数组
        Array.from(childNodes).forEach(node => {
            if (this.isElementNode(node)) {
                // 如果当前节点是元素节点，其可能还有子节点，因此需要递归检查
                // console.log('元素节点', node);
                // 编译元素节点
                this.compileElement(node);
                // 递归编译元素节点
                this.compile(node);
            } else { // 当前节点是文本节点
                // 编译文本节点
                // console.log('文本节点', node);
                this.compileText(node);
            }
        });
    }
    nodeToFragment(el) { // 将el中的内容全部放到内存中
        // 新建一个文档碎片
        const fragment = document.createDocumentFragment();
        let firstChild;
        while(firstChild = el.firstChild) {
            // appendChild具有移动性，这里是将页面中的dom元素先放到文档碎片中
            // 每循环一次，就会将el中的第一个子节点放到文档碎片中
            fragment.appendChild(firstChild);
        }
        return fragment; // 返回内存中的节点
    }
}

CompileUtil = {
    // 这里的expr值是message.a
    // 根据表达式expr取到对应的数据
    getVal(vm, expr) { // 获取实例上对应的数据
        expr = expr.split('.');
        // console.log(expr);
        // console.log(vm.$data);
        // 上一次的结果作为下一次循环的输入，采用reduce
        return expr.reduce((prev, next) => {
            return prev[next];
        }, vm.$data);
    },
    getTextVal(vm, expr) { // 获取编译文本
        // 遍历表达式，将内容重新替换为一个完整的新内容进行替换
        return expr.replace(/\{\{([^}]+)\}\}/g, (...arguments) => {
            //  ["{{message.a}}", "message.a", 0, "{{message.a}}"]
            // console.log(arguments);
            // arguments[1]对应的值为message.a，即正则中分组的值
            return this.getVal(vm, arguments[1]);
        });
    },
    setVal(vm, expr, value) {
        expr = expr.split('.');
        // reduce数据收敛
        expr.reduce((prev, next, currentIndex) => {
            // 最后一项改为赋值
            if (currentIndex === expr.length - 1) {
                return prev[next] = value;
            }
            return prev[next];
        }, vm.$data);
    },
    text(node, vm, expr) { // 文本处理
        const updateFn = this.update['textUpdate'];
        // message.a => [message, a] vm.$data.message.a
        // console.log(expr); // {{message.a}}
        // expr可能是多层嵌套的，比如data.message.obj.a
        // 对于属性嵌套的情况，先将对应的expr拆分为数组，一层一层的取
        const value = this.getTextVal(vm, expr);
        // console.log(value); // message.a
        // {{a}} {{b}}
        // {{x}}可能有多个，这里循环给每个文本添加一个watcher
        expr.replace(/\{\{([^}]+)\}\}/g, (...arguments) => {
            // console.log(arguments); // ["{{message.a}}", "message.a", 0, "{{message.a}}"]
            // arguments[1]获取表达式分组的值
            // 给表达式每个{{}}都添加观察者
            new Watcher(vm, arguments[1], () => {
                // 如果数据变化了，文本节点需要重新获取依赖的数据更新文本中的内容
                updateFn && updateFn(node, this.getTextVal(vm, expr));
            });
        });
        updateFn && updateFn(node, value);
    },
    model(node, vm, expr) { // v-model处理
        const updateFn = this.update['modelUpdate'];
        // 这里应该给数据添加一个观察者，如果数据更新了就会触发对应的回调，拿新值进行更新
        // 数据变化了，应该调用watcher的callback
        new Watcher(vm, expr, newValue => {
            // 当值变化后会调用cb 将新的值传递过来
            updateFn && updateFn(node, newValue);
        });
        // 输入框input事件绑定，实现数据的双向绑定
        node.addEventListener('input', e => {
            const newValue = e.target.value; // 获取用户输入的内容
            // 值的改变会调用set，set中又会调用notify，notify中调用watcher的update方法实现更新
            this.setVal(vm, expr, newValue);
        });
        // message.a => [message, a] vm.$data.message.a
        updateFn && updateFn(node, this.getVal(vm, expr));
    },
    html(node, vm, expr) {
        const updateFn = this.update['htmlUpdate'];
        const value = this.getVal(vm, expr);
        new Watcher(vm, expr, newValue => {
            updateFn && updateFn(node, newValue);
        });
        updateFn && updateFn(node, value);
    },
    eventHandler(node, vm, expr, dir) {
        const eventType = dir.split(':')[1];
        const handler = vm.methods && vm.methods[expr];
        if (eventType && handler) {
            node.addEventListener(eventType, handler.bind(vm), false);
        }
    },
    update: {
        // 文本更新
        textUpdate(node, value) {
            node.textContent = value;
        },
        // 输入框更新
        modelUpdate(node, value) {
            node.value = value;
        }, // html更新
        htmlUpdate(node, value) {
            node.innerHTML = typeof value === 'undefined' ? '' : value;
        }
    }
};