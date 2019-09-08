interface Alarm {
    alert();
}

interface Light {
    lightOn();
    lightOff();
}
// 实现多个接口
class Car implements Alarm, Light {
    alert() {
        console.log('Car alert');
    }
    lightOn() {
        console.log('Car light on');
    }
    lightOff() {
        console.log('Car light off');
    }
}

let car = new Car();

car.alert();