import san from 'san';
import {router} from 'san-router';
import 'san-xui/dist/xui.css';
import Home from './components/home/Home';
import NotFound from './components/notFound/notFound';
import List from './components/list/List';

router.add({rule: '/', Component: Home, target: '#root'});
router.add({rule: '/list', Component: List, target: '#root'});
router.add({rule: '/404', Component: NotFound, target: '#root'});

router.start();