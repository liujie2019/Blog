// const todos = {};

// for (let i = 0; i < 100000; i++) {
//     todos[i] = {
//         [i]: {title: `task ${i}`, completed: false}
//     };
// }

// // console.log(todos);

// console.time('start');
// function toggleTodo(todos, id) {
//     return Object.assign({}, todos, {
//         [id]: Object.assign({}, todos[id], {
//             completed: !todos[id].completed
//         })
//     });
// }

// const todo = toggleTodo(todos, 50001);
// console.log(todos['50001']);
// console.timeEnd('start');
const {fromJS} = require('immutable');
const u = require('updeep');
const todos = {};

for (let i = 0; i < 100000; i++) {
    todos[i] = {
        [i]: {title: `task ${i}`, completed: false}
    };
}
const newTodos = fromJS(todos);
// console.log(todos);

console.time('start');
function toggleTodo(newTodos, id) {
    return u({
      [id]: {
        completed: completed => !completed
      }
    }, newTodos)
  }

const todo = toggleTodo(newTodos, '50001');
console.log(todo);
console.timeEnd('start');