import san from 'san';
import {Link} from 'san-router';
import {template} from './Home.template';

export default san.defineComponent({
    template,
    components: {
        'router-link': Link
    }
});