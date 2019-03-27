import React, { Component } from 'react';
import A from './A';

class B extends Component {
  render() {
    return (
      <div>
          <p>我是名字：{this.props.name}</p>
          <p>我的年龄：{this.props.age}</p>
          <p>我的性别：{this.props.sex}</p>
          我是B组件
      </div>
    )
  }
}
export default A(B);
