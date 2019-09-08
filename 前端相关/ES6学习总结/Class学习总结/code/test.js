// js格式化文件大小，单位：Bytes、KB、MB、GB

//  格式化文件大小
function renderSize(value) {
  if (null == value || value == '') {
    return '0 Bytes';
  } else if (value < 1024) {
    return `${value} Bytes`;
  }
  var unitArr = new Array(
    'Bytes',
    'KiB',
    'MiB',
    'GiB',
    'TiB',
    'PiB',
    'EiB',
    'ZiB',
    'YiB'
  );
  var index = 0,
    srcsize = parseFloat(value);
  index = Math.floor(Math.log(srcsize) / Math.log(1024));
  var size = srcsize / Math.pow(1024, index);
  //  保留的小数位数
  size = size.toFixed(2);
  return `${size} ${unitArr[index]}`;
}

console.log(renderSize(1122654)); // 1.07 MiB