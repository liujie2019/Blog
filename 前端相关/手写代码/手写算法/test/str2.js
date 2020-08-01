function parseCoord(coord) {
	const map = {AA: 27, AB: 28};
  	const reg = /[A-Z]/;
  	const res = {col: '', row: ''};
  	const arr = coord.split('');
    arr.forEach(el => {
    	if (reg.test(el)) {
        	res.col += el;
        } else {
        	res.row += el;
        }
    });
    let str = res.col;
    if (str !== 'AB' && str !== 'AA') {
        res.col = (str.charCodeAt(0) - 65 + 1);
    } else {
        for (let key in map) {
            if (key === res.col) {
                res.col = map[key];
            }
        }
    }
    res.row = parseInt(res.row, 10);
    return res;
}