module.exports = function (api) {
    api.cache(true);

    const presets = ["@babel/env"];
    const plugins = [];
    return {
      presets,
      plugins
    };
}