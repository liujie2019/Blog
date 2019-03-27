import(/* webpackChunkName: "child.js" */'./child').then(child => {
    console.log(child);
});

module.exports = "common-async";