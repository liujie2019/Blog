namespace shuaiGe {
    export class Dehua {
        public name:string = '刘德华'
        talk() {
            console.log('我是帅哥刘德华')
        }
    }
}

namespace bajie {
    export class Dehua {
        public name:string = '马德华'
        talk() {
            console.log('我是二师兄马德华')
        }
    }
}

let dehua1:shuaiGe.Dehua = new shuaiGe.Dehua()
let dehua2:bajie.Dehua = new bajie.Dehua()
dehua1.talk(); // 我是帅哥刘德华
dehua2.talk(); // 我是二师兄马德华
