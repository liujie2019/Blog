import React, { Component } from 'react';

export default class Home extends Component {
    render() {
        return (
            <div>
                首页内容
            </div>
        );
    }
}

// export default class Home extends Component {
//     render() {
//         // console.log(React.Children.count(this.props.children));
//         // const childArr = React.Children.toArray(this.props.children);
//         const childsWithProps = React.Children.map(
//             this.props.children,
//             (childItem, index) => {
//                 if (index < 1) return null; // 忽略子元素中的第一项
//                 return React.cloneElement(childItem, { name: 'lisi' });
//             }
//         );
//         return (
//             <div>
//                 {childsWithProps}
//             </div>
//         );
//     }
// }