console.log('hello pwa666');

if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/service-worker.js')
            .then(registration => {
                console.log('service-worker registed');
            }).catch(error => {
                console.log('service-worker register error');
            });
    })
}