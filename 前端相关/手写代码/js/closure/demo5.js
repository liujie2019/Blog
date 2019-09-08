// function fn() {
//     var arr = [];
//     for (var i = 0; i < 10; i++) {
//         arr[i] = function() {
//             return i;
//         }
//     }
//     return arr;
// }

// fn().forEach(item => {
//     console.log(item());
// });

function fn() {
    var arr = [];
    for (var i = 0; i < 10; i++) {
        arr[i] = (function(num) {
            return function() {
                return num;
            }
        })(i);
    }
    return arr;
}

fn().forEach(item => {
    console.log(item());
});