export const INCREMENT = {
    type: 'INCREMENT'
};
export const DECREMENT = {
    type: 'DECREMENT'
};

export const actionCreators = {
    increment: () => ({type: 'INCREMENT'}),
    decrement: () => ({type: 'DECREMENT'})
};