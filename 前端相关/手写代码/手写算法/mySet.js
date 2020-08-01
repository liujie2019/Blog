function Set() {
    var items = {};
    var length = 0;
    //判断元素是否存在
    this.has = function(val) {
        return items.hasOwnProperty(val)
    }
    //增加操作
    this.add = function(val) {
        if(!this.has(val)) {
            items[val] = val;
            length++;
            return true;
        }
        return false;
    }
    // 删除操作
    this.remove = function(val){
        if(this.has(val)) {
            delete items[val];
            length -= 1;
            return true;
        }
        return false;
    }
    // 清除
    this.clear = function() {
        items = {};
        length = 0
        return true
    }
    //获取大小
    this.size = function() {
        return length;
    }
    //获取属性
    this.values = function() {
        return Object.keys(items);
    }
}
var set = new Set();
set.add(1);
set.add(2);
set.add(3);
set.add('a');
set.add([1, 2, 3]);
console.log(set.values());