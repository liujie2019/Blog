class Compile {
    constructor(el, vm) {
        // this.el = el;
        this.el = this.isElementNode(el) ? el : document.querySelector(el);
        this.vm = vm;
        if (this.el) {
            // 如果可以获取到元素，才开始编译
            // 1. 先把this.el中的真实的DOM放到内存中(采用文档碎片-fragment，在内存中操作元素性能好)
            let fragment = this.nodeToFragment(this.el);
            // 2. 编译 => 提取想要的元素节点v-model和文本节点{{}}
            this.compile(fragment);
            // 最后把编译好的fragment放回到页面里去
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
        return name.includes('v-');
    }
    /**核心方法 */
    compileElement(node) {
        // 带v-model
        let attrs = node.attributes; // 取出当前节点的属性
        // console.log(attrs);
        Array.from(attrs).forEach(attr => {
            let attrName = attr.name;
            // 判断属性名字是不是包含v-
            if (this.isDirective(attrName)) {
                // 如果包含v-，则取到对应的值放到节点中
                // expr为指令对应的值
                let expr = attr.value;
                // node vm.$data
                // todo this.vm.$data中多级属性获取值，比如vm.$data.obj.a.a...
                // let type = attrName.slice(2);
                let [, type] = attrName.split('-');
                CompileUtil[type](node, this.vm, expr);
            }
        });
    }
    compileText(node) {
        // 带{{}}
        let text = node.textContent; // 获取文本中的内容
        let reg = /\{\{([^}]+)\}\}/g;
        if (reg.test(text)) {
            CompileUtil['text'](node, this.vm, text);
        }
    }
    compile(fragment) {
        // 需要递归
        // 注意childNodes也包含了空白节点
        let childNodes = fragment.childNodes;
        // console.log(childNodes);
        // 这里拿到的childNodes只是第一层，需要递归拿深层元素和文本
        Array.from(childNodes).forEach(node => {
            if (this.isElementNode(node)) {
                // 元素节点，还需要递归检查
                // console.log('元素节点', node);
                // 编译元素节点
                this.compileElement(node);
                this.compile(node);
            } else {
                // 文本节点
                // 编译文本节点
                // console.log('文本节点', node);
                this.compileText(node);
            }
        });
        // console.log(childNodes);
    }
    nodeToFragment(el) { // 将el中的内容全部放到内存中
        // 新建一个文档碎片
        let fragment = document.createDocumentFragment();
        let firstChild;
        while(firstChild = el.firstChild) {
            fragment.appendChild(firstChild);
        }
        return fragment; // 返回内存中的节点
    }
}

CompileUtil = {
    getVal(vm, expr) { // 获取实例上对应的数据
        expr = expr.split('.');
        // console.log(expr);
        // console.log(vm.$data);
        return expr.reduce((prev, next) => {
            return prev[next];
        }, vm.$data);
    },
    getTextVal(vm, expr) { // 获取编译文本
        return expr.replace(/\{\{([^}]+)\}\}/g, (...arguments) => {
            //  ["{{message.a}}", "message.a", 0, "{{message.a}}"]
            // console.log(arguments);
            return this.getVal(vm, arguments[1]);
        });
    },
    setVal(vm, expr, value) {
        expr = expr.split('.');
        // reduce数据收敛
        return expr.reduce((prev, next, currentIndex) => {
            // 最后一项改为赋值
            if (currentIndex === expr.length - 1) {
                return prev[next] = value;
            }
            return prev[next];
        }, vm.$data);
    },
    text(node, vm, expr) { // 文本处理
        let updateFn = this.update['textUpdate'];
        // message.a => [message, a] vm.$data.message.a
        // console.log(expr); // {{message.a}}
        let value = this.getTextVal(vm, expr);
        // console.log(value); // message.a
        // {{a}} {{b}}
        // 给每个文本添加一个watcher
        expr.replace(/\{\{([^}]+)\}\}/g, (...arguments) => {
            new Watcher(vm, arguments[1], () => {
                // 如果数据变化了，文本节点需要重新获取依赖的属性更新文本中的内容
                updateFn && updateFn(node, this.getTextVal(vm, expr));
            });
        });
        updateFn && updateFn(node, value);
    },
    model(node, vm, expr) { // v-model处理
        let updateFn = this.update['modelUpdate'];
        // 这里应该加一个数据监控
        // 数据变化了，应该调用watcher的callback
        new Watcher(vm, expr, newValue => {
            // 当值变化后会调用cb 将新的值传递过来
            updateFn && updateFn(node, newValue);
        });
        node.addEventListener('input', e => {
            let newValue = e.target.value;
            this.setVal(vm, expr, newValue);
        });
        // message.a => [message, a] vm.$data.message.a
        updateFn && updateFn(node, this.getVal(vm, expr));
    },
    update: {
        // 文本更新
        textUpdate(node, value) {
            node.textContent = value;
        },
        // 输入框更新
        modelUpdate(node, value) {
            node.value = value;
        }
    }
};