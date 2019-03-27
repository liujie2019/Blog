import Food from '../foods.json';
import {SEARCH_INPUT_CHANGED} from '../constants/food';

const initialState = {
    food: Food,
    searchItem: ''
};

export const foodReducer = (state = initialState, action) => {
    const searchItem = action.payload
    switch (action.type) {
        case SEARCH_INPUT_CHANGED:
            return {
                ...state,
                searchItem: searchItem,
                food: searchItem ? Food.filter(item => {
                    return item.name.toLowerCase().indexOf(searchItem.toLowerCase()) > -1;
                }) : Food
            };
        default:
            return state;
    }
}