import { configureStore } from '@reduxjs/toolkit'
import studentReducer from './dataSlice'
import funcReducer from './tableFunc'
export default configureStore({
    reducer: {
        data: studentReducer,
        func: funcReducer
    }
})