// import a from './a';
console.log('this is index.js');
const btn = document.querySelector('#btn');

btn.onclick = () => {
    import(/* webpackChunkName: "a" */'./a').then(module => {
        const a = module.default;
        a();
    });
};

if (module.hot) {
    module.hot.accept();
}