import {configureStore} from '@reduxjs/toolkit';
import { paragraphAPI } from './paragraph';

export const store = configureStore({
    reducer: {
        [paragraphAPI.reducerPath]: paragraphAPI.reducer 
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(paragraphAPI.middleware)
})