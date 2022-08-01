import React from 'react';
import { createSlice, configureStore } from '@reduxjs/toolkit';

const todoSlice = createSlice({
    name: "todo",
    initialState: {
        value: []
    },
    reducers: {
        addItems: (state, action) => {
            var task = {"task":action.payload, "isCompleted":false, "id":state.value.length + 1};
            state.value.push(task);
        },
        isCompleted: (state, action) => {
            // console.log(action.payload)
            state.value = state.value.map((task) => {
                if (task.id === action.payload[0]) {
                    task["isCompleted"] = action.payload[1];
                    return task;
                }
                return task;
            })
        }
    }
})

export const {addItems, isCompleted} = todoSlice.actions;

var store = configureStore({
    reducer: todoSlice.reducer
});

export {store};