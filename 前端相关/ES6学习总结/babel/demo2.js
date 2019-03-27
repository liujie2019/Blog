let birth = '2000/01/01';
const Person = {
	name: '张三',
	birth,
	hello() {
		console.log('我的名字是', this.name);
	}
};
Person.hello();
console.log(Person.hello.name);//name返回对象方法的名称

width={collapsed
                        ? 50
                        : 200}
defaultOpenKeys={['collect', 'share']}