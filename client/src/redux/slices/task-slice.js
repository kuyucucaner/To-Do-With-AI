import { createSlice , createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';

export const getTaskByUserId = createAsyncThunk(
    "task/getTaskByUserId",
    async() => {
        try{
            const response = await axios.get('http://localhost:5000/api/v1/task/get-tasks');
            return response.data;
        }
        catch(error){
            throw error.response.data.message;
        }
    }
);

export const AddTask = createAsyncThunk(
    "task/addTask",
    async(taskData , {rejectWithValue} ) => {
        try{
            const response = await axios.post('http://localhost:5000/api/v1/task/create-task',
                taskData,
                {withCredentials: true}
            );
            return response.data;
        }
        catch(error){
            return rejectWithValue(error.response.data.message);
        }
       
    }
);

export const updateTask = createAsyncThunk(
    "task/updateTask",
    async({id , taskData} , {rejectWithValue} ) => {
        try {
            const response = await axios.put(`http://localhost:5000/api/v1/task/update-task/${id}`,
                taskData,
                {withCredentials: true}
            );
            return response.data;
        }
        catch(error){
            return rejectWithValue(error.response.data.message);
        }
    });

export const deleteTask = createAsyncThunk(
    "task/deleteTask",
    async(id) => {
        try {
            await axios.delete(`http://localhost:5000/api/v1/task/delete-task/${id}`,
                {withCredentials: true}
            );
            return { id };
        }
        catch(error){
            throw error.response.data.message;
        }
    }
);

const taskSlice = createSlice({
    name: 'task',
    initialState: {
        tasks: [],
        error: null,
        loading: false,
        },
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(getTaskByUserId.pending, (state) => {
            state.loading = true;
        })
        .addCase(getTaskByUserId.fulfilled, (state, action) => {
            state.loading = false;
            state.tasks = action.payload;
        })
        .addCase(getTaskByUserId.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        })
        .addCase(AddTask.pending, (state) => {
            state.loading = true;
        })
        .addCase(AddTask.fulfilled, (state, action) => {
            state.loading = false;
            state.tasks.push(action.payload);
        })
        .addCase(AddTask.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        })
        .addCase(updateTask.pending, (state) => {
            state.loading = true;
        })
        .addCase(updateTask.fulfilled, (state, action) => {
            state.loading = false;
            const updatedTasks = state.tasks.map(task => task._id === action.payload._id? action.payload : task);
            state.tasks = updatedTasks;
        })
       .addCase(updateTask.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        })
        .addCase(deleteTask.pending, (state) => {
            state.loading = true;
        })
        .addCase(deleteTask.fulfilled, (state, action) => {
            state.loading = false;
            state.tasks = state.tasks.filter(task => task._id!== action.payload);
        })
        .addCase(deleteTask.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        })  
    }
});
export default taskSlice.reducer;
