function jsonp(url, cb) {
    const script = document.createElement('script');
    script.src = `${url}?callback=${cb}`;
    document.body.appendChild(script);
    window[cb] = data => {
        console.log(data);
    }
}