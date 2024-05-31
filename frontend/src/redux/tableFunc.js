import { createSlice } from '@reduxjs/toolkit'
import { act } from 'react';

const tableFunc = createSlice({
    name: 'function',
    initialState: {
        pageData: [],
        selectedRows: [],
        selectAll: false,
        sortOrder: "asc"
    },
    reducers: {
        setPageData(state, action) {
            state.pageData = action.payload
        },

        searchData(state, action) {
            state.pageData = action.payload
        },

        handleSelectRow(state, action) {
            const id = action.payload.id
            const isAlreadySelected = state.selectedRows.includes(id)

            if (isAlreadySelected) {
                state.selectedRows = state.selectedRows.filter((rowId) => rowId !== id)
                state.selectAll = false
            } else {
                state.selectedRows = [...state.selectedRows, id]
            }
        },

        handleSelectAll(state) {
            if (state.selectAll == true) {
                state.selectedRows = []
                state.selectAll = false
            } else {
                const a = state.pageData.map((row) => row._id)
                state.selectedRows = state.pageData.map((row) => row._id)
                state.selectAll = !state.selectAll
            }
        },

    }
})

export const { setPageData, searchData, handleSelectRow, handleSelectAll, sortData } = tableFunc.actions
export default tableFunc.reducer
