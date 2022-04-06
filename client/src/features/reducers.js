import { SET_TODO, SET_USERNAME } from "./actionTypes";

const init = { username: "", todo: [] };

export const reducer = (state = init, { type, payload }) => {
    switch(type) {
        case SET_USERNAME:
            return {
                ...state,
                username: payload,
            };
        
        case SET_TODO: 
            return {
                ...state,
                todo: payload,
            }
        
        default:
            return state;
    }
};