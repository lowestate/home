import { createSlice } from "@reduxjs/toolkit";

const usernameReq = localStorage.getItem('usernameReq')
    ? localStorage.getItem('usernameReq')
    : '';

const dateStart = localStorage.getItem('dateStart')
    ? localStorage.getItem('dateStart')
    : '';
const dateFin = localStorage.getItem('dateFin')
    ? localStorage.getItem('dateFin')
    : '';

const initialState = {
    usernameReq,
    dateStart,
    dateFin,
}

const reqFiltersSlice = createSlice({
    name: 'req_filters',
    initialState,
    reducers: {
        setUsernameReq(state, {payload}) {
            state.usernameReq = payload
            localStorage.setItem('usernameReq', payload)
        },
        setDateStart(state, {payload}) {
            state.dateStart = payload
            localStorage.setItem('dateStart', payload)
        },
        setDateFin(state, {payload}) {
            state.dateFin = payload
            localStorage.setItem('dateFin', payload)
        }
    }
})

export default reqFiltersSlice