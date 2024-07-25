import { createSlice } from '@reduxjs/toolkit'

const studentSlice = createSlice({
    name: 'students',
    initialState: {
        loading: false,
        error: null,
        page: 0,
        counsellorPage: 0,
        loginCounsellorId: null,
        loginType: null,
        data: [],
    },
    reducers: {
        fetchDetailreq: (state) => {
            state.loading = true
            state.error = null
            state.data = []
        },


        updatePage: (state, action) => {
            console.log(action.payload);
            state.page = action.payload
        },
        updateCounsellorPage: (state, action) => {
            state.counsellorPage = action.payload
        },

        updateCounsellorId: (state, action) => {
            state.loginCounsellorId = action.payload
        },

        setLoginType: (state, action) => {
            state.loginType = action.payload
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

export const { fetchDetailfail, fetchDetailsucess, fetchDetailreq, updatePage, updateCounsellorId, setLoginType, updateCounsellorPage } = studentSlice.actions

export const selectStudentData = (state) => state.data.data
export default studentSlice.reducer
