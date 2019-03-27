import React from 'react';

const ele = [1, 2, 3].map((item, index) => {
    return (
        <div>
            {item + '-' + index}
        </div>
    )
});

console.log(ele);