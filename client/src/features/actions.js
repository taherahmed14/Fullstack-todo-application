import { SET_TODO, SET_USERNAME } from "./actionTypes"

export const addUsername = (data) => ({
    type: SET_USERNAME,
    payload: data,
});

export const addTodoSuccess = (data) => ({
    type: SET_TODO,
    payload: data,
});
