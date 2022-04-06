import { createStore } from "@reduxjs/toolkit";
import { reducer } from '../features/reducers';

export const store = createStore(reducer);
