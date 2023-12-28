import { createSlice } from "@reduxjs/toolkit";

const resourceWithHighDemand = localStorage.getItem('resourcesWithHighDemand')
    ? localStorage.getItem('resourcesWithHighDemand')
    : '';

const resName = localStorage.getItem('resName')
    ? localStorage.getItem('resName')
    : '';
const requestStatus = localStorage.getItem('requestStatus')
    ? localStorage.getItem('requestStatus')
    : '';

const initialState = {
    resourceWithHighDemand,
    resName,
    requestStatus,
}

const filtersSlice = createSlice({
    name: 'filters',
    initialState,
    reducers: {
        setResourcesWithHighDemand(state, {payload}) {
            state.resourceWithHighDemand = payload
            localStorage.setItem('resourcesWithHighDemand', payload)
        },
        setResourceName(state, {payload}) {
            state.resName = payload
            localStorage.setItem('resName', payload)
        },
        setRequestStatus(state, {payload}) {
            state.requestStatus = payload
            localStorage.setItem('requestStatus', payload)
        }
    }
})

export default filtersSlice