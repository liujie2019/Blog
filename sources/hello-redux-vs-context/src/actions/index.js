const searchItemChange = searchInput => {
    return {
        type: 'SEARCH_INPUT_CHANGED',
        payload: searchInput
    };
};

export {
    searchItemChange
};