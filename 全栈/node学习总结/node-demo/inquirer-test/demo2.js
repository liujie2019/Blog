var currentNodeVersion = process.versions.node; // 返回Node版本信息，如果有多个版本返回多个版本
var semver = currentNodeVersion.split('.');

console.log(semver);