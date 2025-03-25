import { configureStore } from '@reduxjs/toolkit';
import UserReducer from './redux/slices/user-slice';
import TaskReducer from './redux/slices/task-slice';

const store = configureStore({
    reducer : {
        user : UserReducer,
        task : TaskReducer,
    },
});

export default store;