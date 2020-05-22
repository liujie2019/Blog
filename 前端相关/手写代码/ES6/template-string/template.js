// const msg = `hello world`;
// console.log(msg);

const msg = `hello \` world`;
console.log(msg); // hello ` world

const tpl = `
    <ul>
        <li>1</li>
        <li>2</li>
    </ul>
`;
console.log(tpl);

const tpl2 = `
    <ul>
        <li>1</li>
        <li>2</li>
    </ul>
`.trim();
// console.log(tpl2);

const arr = [{name: 'lisi'}, {name: 'wangwu'}]
const tpl3 = `
    <ul>
        ${arr.map(({name}) => {
            return `
                <li>${name}</li>
            `;
        }).join('')}
    </ul>
`.trim();

console.log(tpl3);