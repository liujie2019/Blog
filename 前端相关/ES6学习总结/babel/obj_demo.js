let birth = '2000/1/12';
const person = {
	name: 'lisi',
	birth,
	hello() {
		console.log(this.name);
	}
};
person.hello();