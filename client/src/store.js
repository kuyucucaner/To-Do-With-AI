import { configureStore } from '@reduxjs/toolkit';
import UserReducer from './redux/slices/user-slice';

const store = configureStore({
    reducer : {
        user : UserReducer,
    },
});

export default store;