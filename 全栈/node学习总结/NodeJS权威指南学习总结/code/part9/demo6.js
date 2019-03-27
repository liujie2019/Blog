var oldmask, newmask = 0644;
oldmask = process.umask(newmask);
console.log('修改前的掩码：' + oldmask.toString(8) + '，修改后的掩码：' + newmask.toString(8));