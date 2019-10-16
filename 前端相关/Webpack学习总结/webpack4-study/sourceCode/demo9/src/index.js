import React, {Component} from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import ReactDom from 'react-dom';
import Loadable from 'react-loadable';

const Loading = () => <div>Loading...</div>;

// 封装LazyLoad组件
const LazyLoad = loader => Loadable({
    loader,
    loading: Loading
});

const A = LazyLoad(() => import('./a.js'));
const B = LazyLoad(() => import('./b.js'));
export default class Index extends Component{
  render() {
    return <div>
      <Router>
        <div>
          <Route path="/A" component={A} />
          <Route path="/B" component={B} />
          <Link to="/A">to A</Link><br/>
          <Link to="/B">to B</Link>
        </div>
      </Router>
    </div>
  }
}
ReactDom.render(
    <Index />,
    document.querySelector("#btn")
);
if (module.hot) {
     module.hot.accept();
}