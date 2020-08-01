/**
 * {
	type: 'h1',
	props: {
		className: "",
		style: "",
	},
	children: [] // 嵌套节点
}
*/

// function isStraight(nums) {
//     let count = 0;
//     for (let i = 0; i < 4; i++) {
//         if (nums[i] === 0) {
//             count++;
//             continue;
//         }
//         if (nums[i] === nums[i+1]) {
//             return false;
//         }
//     }
//     return nums[4] - nums[count] < 5;
// }

function renders(obj) {
    const {type, props, children} = obj;
    const el = document.createElement(type);
    for (let key in props) {
        setAttr(el, key, props[key]);
    }
}

function setAttr(node, key, value) {
    switch(key) {
        case 'value': {
            if (el.tagName.toLowerCase === 'input') {
                node.value = value;
            } else {
                node.setAttribute(key, value);
            }
            break;
        }
        case 'style': {
            node.style.cssText = value;
            break;
        }
        default: {
            node.setAttribute(key, value);
            break;
        }
    }
}

function render(elObj) {
    const {type, props, children} = elObj;
    const el = document.createElement(type);
    for (let key in props) {
        setAttr(el, key, props[key]);
    }
    children.forEach(child => {
        child = child instanceof Element ? render(child) : document.createTextNode(child);
        el.appendChild(child);
    });
    return el;
}