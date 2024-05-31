import { createSlice } from '@reduxjs/toolkit'

const studentSlice = createSlice({
    name: 'students',
    initialState: {
        loading: false,
        error: null,
        data: [],
    },
    reducers: {
        fetchDetailreq: (state) => {
            state.loading = true
            state.error = null
            state.data = []
        },

        fetchDetailsucess: (state, action) => {
            state.loading = false
            state.error = null
            state.data = action.payload
        },

        fetchDetailfail: (state, action) => {
            state.loading = false
            state.error = action.payload
            state.data = []
        },
    }
})

export const { fetchDetailfail, fetchDetailsucess, fetchDetailreq } = studentSlice.actions

export const selectStudentData = (state) => state.data.data
export default studentSlice.reducer
