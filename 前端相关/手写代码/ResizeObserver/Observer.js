const callback = entries => {
    entries.forEach(entry => {
        console.log(entry);
    });
}
const observer = new ResizeObserver(callback);
observer.observe(document.body);

const root = document.querySelector('#root');
console.log(root.getBoundingClientRect());