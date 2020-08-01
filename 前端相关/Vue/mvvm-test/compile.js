class Compile {
    constructor(el, vm) {
        // 判断el属性是不是一个元素，如果不是元素，那就回去对应的元素
        // isElementNode该方法用来判断是否是元素节点
        this.el = this.isElementNode(el) ? el : document.querySelector(el);
        this.vm = vm;
        if(this.el) {
            // 如果这个元素能获取到，我们才开始编译
            // 1.先把这些真实的DOM移入到内存中 fragement
            const fragment = this.nodeToFragment(this.el);
            // 2.编译并把节点中的内容用数据进行替换 => 提取想要的元素节点 v-model 和文本节点 {{}}
            this.compile(fragment);
            // 3.把编译好的fragement再返回页面去
            this.el.appendChild(fragment);
        }
    }
    //辅助方法，比如判断功能
    /**
     * 判断是否是一个元素节点(nodeType为1)
     * @param {any} node
     * @returns
     * @memberOf Compile
     * 属性节点nodeType为2，文本节点nodeType为3
     */
    isElementNode(node) {
        return node.nodeType === 1;
    }
    //核心方法，主要功能
    /**
     * 判断属性是否为指令属性，即是否以'v-'开头
     * @param name
     * @returns
     */
    isDirective(name) {
        return name.startsWith('v-');
    }
    /**
     * 编译带'v-'属性的元素节点，DOM元素不能用正则判断
     * @param node
     */
    compileElement(node) {
        // attributes 属性返回指定节点的属性集合，即 NamedNodeMap
        const attrs = node.attributes;
        // Array.from(attrs)将属性节点集合转为数组
        // 这里attrs为['type="text"', 'v-model="message"']
        Array.from(attrs).forEach(attr => {
            const {name, value} = attr;
            // name=v-model
            // value="message"
            const attrName = name;
            // 判断是否是指令属性
            if (this.isDirective(attrName)) {
                // 取到对应的值放到节点中
                const expr = value; // expr="message"
                // 即找this.vm.data.message
                // 取'v-'后面的值
                // const type = attrName.slice(2);
                //node this.vm.$data  在对象vm上，取实例的值expr，放到节点node上
                const [, directive] = attrName.split('v-');
                // 去this.vm的data中找到表达式expr的值，并更新node节点的值
                CompileUtil[directive](node, this.vm, expr);
            }
        });
    }

    /**
     * 编译文本节点，取文本内容整体 {{a}} {{b}} {{c}} 或者是{{ abc }}
     * @param node
     */
    compileText(node) {
        let text = node.textContent;
        // 匹配{{ 非}的所有内容 }}
        // let reg = /\{\{([^}]+)\}\}/g;
        // 匹配任意字符，匹配到下一个}之前
        let reg = /\{\{(.+?)\}\}/g;
        if (reg.test(text)) {
            // node this.vm.$data text
            // 去this.vm.$data找到text对应的值
            CompileUtil['text'](node, this.vm, text);
        }
    }
    /**
     * 需要递归所有节点，判断是什么类型的节点，分别使用不同的编译方法
     * @param fragment 文档碎片
     */
    // 编译内存中的节点的方法
    compile(fragment) {
        // 获取到fragment的子节点，嵌套的节点是获取不到的，需要递归获取
        const childNodes = fragment.childNodes;
        // 需要将childNodes先转为数组
        Array.from(childNodes).forEach(node => {
            // 如果是元素节点
            if(this.isElementNode(node)) {
                // 元素节点，里面可能还有子节点，所以还要递归
                // 这里需要编译元素
                this.compileElement(node);
                // 如果是元素的话，把当前元素节点递归遍历其子节点
                this.compile(node); // 递归，因为可能存在多层元素嵌套
            }
            else if (node.nodeType === 3) {
                //文本节点
                //这里需要编译文本
                this.compileText(node);
            }
        });
    }

    /**
     * 将节点el里的全部内容放到内存里面
     * @param el
     * @returns {DocumentFragment}
     */
    nodeToFragment(el) {
        // 内存中的DOM节点
        const fragment = document.createDocumentFragment();
        let firstChild;
        // 每次取app里面的第一个子节点，直到取完
        while (firstChild = el.firstChild) {
            // appendChild具有移动性，将dom元素一个一个的放到内存中
            fragment.appendChild(firstChild);
        }
        // 内存中的节点
        return fragment;
    }
}

/**
 * 编译的工具方法
 */
CompileUtil = {
    /**
     * 获取实例上对应的数据，返回 vm.$data.XXX，'info.a' => [info,a] vm.$data.info.a
     * @param vm
     * @param expr 表达式可能是info.txt.xxx的形式
     * @returns {T}
     */
    getVal(vm, expr) {
        expr = expr.split('.'); // 拆分成数组
        return expr.reduce((pre, next) => {
            return pre[next];
        }, vm.$data);
    },
    /**
     * 获取编译文本后的结果
     * @param vm
     * @param text
     * @returns {string | * | void}
     */
    // expr可能是这种情况 => {{a}}{{b}}{{c}}
    getTextVal(vm, expr) {
        return expr.replace(/\{\{([^}]+)\}\}/g, (...arguments) => {
            // 拿到第一个分组，并且要取得没有空格的字符串，否则会报错
            return this.getVal(vm, arguments[1].trim());
        });
    },
    /**
     * 文本节点编译
     * @param node
     * @param vm
     * @param expr
     */
    text(node, vm, expr) {
        let updateFn = this.updater['textUpdater'];
        let value = this.getTextVal(vm, expr);
        //为每一个文本添加观察者，{{a}},{{b}} 既观察a也观察b
        expr.replace(/\{\{([^}]+)\}\}/g, (...arguments) => {
            new Watcher(vm, arguments[1].trim(), (newValue) => {
                //若数据变化，文本节点要重新获取依赖的属性，更新文本中的内容
                updateFn && updateFn(node, this.getTextVal(vm, newValue));
            });
        });
        //这个方法存在再去调用
        updateFn && updateFn(node, value);
    },
    /**
     * 赋新值
     * @param vm
     * @param expr 新的值
     * @param value
     * @returns {T}
     */
    setVal(vm, expr, value) { //expr => [info, a]
        const expr = expr.split('.');
        return expr.reduce((pre,next,currentIndex) => {
            if (currentIndex === expr.length-1){
                return pre[next] = value;
            }
            return pre[next];
        }, vm.$data);

    },
    /**
     * 带v-model属性的元素节点编译
     * @param node 是节点
     * @param vm 是当前实例
     * @param expr 是表达式
     */
    model(node, vm, expr) {
        const updateFn = this.updater['modelUpdater'];
        //给节点添加监控，数据变化了，就调用watcher的回调函数cb(),将新的值传递过来
        //强调一下，他不会一创建Watcher就主动调用cb()，直到调用Watcher.update()时，才会调用这个cb()
        new Watcher(vm, expr, (newValue) => {
            // this.getVal(vm, expr)是获取到对应表达式的值
            updateFn && updateFn(node, this.getVal(vm, expr));
        });

        node.addEventListener('input', (e) => {
            const newValue = e.target.value;
            this.setVal(vm, expr, newValue);
        });
        //这个方法存在再去调用
        updateFn && updateFn(node, this.getVal(vm, expr));
    },
    html(node, vm, expr) {

    },
    // 公共逻辑的复用
    updater: {
        /**
         * 处理文本节点，即文本更新
         * @param node
         * @param value
         */
        textUpdater(node, value) {
            node.textContent = value;
        },
        /**
         * 输入框更新
         * @param node
         * @param value
         */
        modelUpdater(node, value) {
            node.value = value;
        },
        htmlUpdater(node, value) {
            node.innerHTML = value;
        }
    }
};