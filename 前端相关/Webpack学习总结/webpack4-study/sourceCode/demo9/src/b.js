import React, {Component} from 'react';
import { Route, Link} from 'react-router-dom';
import Loadable from 'react-loadable';

const Loading = props => {
    return <div>Loading</div>;
};
const C = Loadable({
    loader: () => import('./c.js'),
    loading: Loading
});

export default class B extends Component {
  render() {
    return (
        <div>
            this is B
            <Route path="/B/C" component={C} />
            <Link to="/B/C">to C</Link>
        </div>
    );
  }
}