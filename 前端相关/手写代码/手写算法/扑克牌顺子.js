var isStraight = function(nums) {
    let count = 0; // 记录王的个数
    nums.sort((a, b) => a - b);
    // 因为数组是排序的，有王的话就是数组前两个
    for (let i = 0; i < 4; i++) {
        // 统计王的个数
        if (nums[i] === 0) {
            count++;
            continue;
        }
        // 这里的话i最大值到3就可以了，否则数组就越界了，因此for循环的终止条件为i<4就可以了
        if (nums[i] === nums[i+1]) { // 存在重复元素则返回false
            return false;
        }
    }
    // nums[count]是王之后的第一个元素，count可能为0，即没有王的情况
    return nums[4] - nums[count] < 5;
};

Array.prototype.shuffle = function() {
    const res = this;
    for (let i = arr.length; i; i--) {
        // 核心思想，遍历数组元素，在前i项中随机取一项，与第i项交换
        let j = Math.floor(Math.random() * i); // j是小于i的
        // i-1可能等于j
        [arr[i - 1], arr[j]] = [arr[j], arr[i - 1]];
    }
    return res;
}

Array.prototype.shuffle = function() {
    const arr = this;
    for (let i = arr.length; i; i--) {
        let j = Mtah.floor(Math.round() * i);
        [arr[i-1], arr[j]] = [arr[j], arr[i-1]];
    }
    return arr;
}
