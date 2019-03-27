export const counter = (state = {count: 0}, action) => {
    switch (action.type) {
        case 'INCREMENT':
            return Object.assign({}, state, {count: state.count + 1});
        case 'DECREMENT':
            return Object.assign({}, state, {count: state.count - 1});
        default:
            return state;
    }
}