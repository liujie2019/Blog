let arr = [1, 2, 3];
arr.map((item, index) => {
	switch (item) {
		case 1:
		case 2:
			console.log(123);
			break;
		case 3:
			console.log(321);
			break;
	}
});