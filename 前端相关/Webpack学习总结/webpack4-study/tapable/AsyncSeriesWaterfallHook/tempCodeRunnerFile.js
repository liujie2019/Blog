this.hooks.arch.tapAsync('node', (name, callback) => {
        //     setTimeout(() => {
        //         console.log('node', name);
        //         // callback(null, 'node学的不错喔');
        //         callback('aaa', 'result'); // 如果第一个参数不是null，会直接跳过后面的钩子，直接走到最终的
        //     }, 1000);
        // });
        // this.hooks.arch.tapAsync('react', (data, callback) => {
        //     setTimeout(() => {
        //         console.log('react', data);
        //         callback();
        //     }, 1000);
        // });