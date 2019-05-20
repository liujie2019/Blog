module.exports = {
  presets: [
    [
      "@babel/preset-env",
      {
        targets: {
          node: "current" // 针对当前node版本进行编译，删除该行可能导致`npm start`报错
        }
      }
    ]
  ]
};
