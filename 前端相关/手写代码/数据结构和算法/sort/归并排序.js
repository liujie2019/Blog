function Merge(a, b) {
    var n = a && a.length;
    var m = b && b.length;
    var c = [];
    var i = 0, j = 0;
    // 定义两个指针，分别从头开始进行比较
    while (i < n && j < m) {
         if (a[i] < b[j])
             c.push(a[i++]);
         else
             c.push(b[j++]);
     }

     while (i < n)
         c.push(a[i++]);

     while (j < m)
         c.push(b[j++]);

    // console.log("将数组",a,'和',b,'合并为',c)
    return c;
}

function merge_sort(arr){
    // console.log(arr)
    if(arr.length == 1)
        return arr; // 递归出口

    var mid = Math.floor(arr.length/2);
    var left = arr.slice(0, mid);
    var right = arr.slice(mid);
    // Merge辅助函数
    return Merge(merge_sort(left), merge_sort(right)); //合并左右部分
}

console.log(merge_sort([42, 20, 17, 13, 28, 14, 23, 15])); // [ 13, 14, 15, 17, 20, 23, 28, 42 ]