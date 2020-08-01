var Node = function(ele) {
    this.ele = ele
    this.next = null
}
function LinkList() {
    this.length = 0
    this.head = null
}
/**添加*/
LinkList.prototype.append = function(ele) {
    var node = new Node(ele)
    var current // 找到尾节点即node.next为null时

    if(this.head === null) {
        this.head = node
    }else {
        current = this.head
        //  找到尾节点
        while(current.next) {
            current = current.next
        }
        current.next = node
    }
    this.length++
}
/**插入*/
LinkList.prototype.insert = function(pos, ele) {
    if(pos > -1 && pos <= this.length) {
        var node = new Node(ele)

        var current = this.head
        var index = 0
        var previous
        if(pos === 0) {
            node.next = current
            this.head = node
        }else{
            // 从head开始 循环遍历依次向下查找，
            // 找到pos位置的前一个节点和当前节点
            while(index++ < pos){
                previous = current
                current = current.next
            }
            previous.next = node
            node.next = current
        }
        this.length++
        return true
    }else{
        return false
    }
}

/**根据pos删除*/
LinkList.prototype.removeByPos = function(pos) {
    if(pos > -1 && pos < this.length) {
        var current = this.head
        var index = 0
        var previous
        if(pos == 0) {
            this.head = current.next
        }else {
            // 从head开始 循环遍历依次向下查找，
            // 找到pos位置的前一个节点和当前节点
            while(index++ < pos) {
                previous = current
                current = current.next
            }
            previous.next = current.next
        }
        this.length--
        return current.ele
    }else {
        return null
    }
}

/**返回位置*/
LinkList.prototype.indexOf = function(ele){
    var current = this.head
    var index = 0
    while(current){
        if(ele === current.ele){
            return index
        }
        index++
        current = current.next
    }
    return -1
}

var link = new LinkList();
link.append('hell');
link.append('yoyo');
link.insert(0, 'first');
console.log(link);
// {
//   "length": 3,
//   "head": {
//     "ele": "first",
//     "next": {
//       "ele": "hell",
//       "next": {
//         "ele": "yoyo",
//         "next": null
//       }
//     }
//   }
// }