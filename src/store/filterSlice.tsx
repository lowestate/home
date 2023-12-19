import { createSlice } from "@reduxjs/toolkit";

const resourceFromOcean = localStorage.getItem('resourceFromOcean')
    ? localStorage.getItem('resourceFromOcean')
    : '';

const resourceFromVost = localStorage.getItem('resourceFromVost')
    ? localStorage.getItem('resourceFromVost')
    : '';
    
const resourceFromVlazh = localStorage.getItem('resourceFromVlazh')
    ? localStorage.getItem('resourceFromVlazh')
    : '';

const resName = localStorage.getItem('resName')
    ? localStorage.getItem('resName')
    : '';
const requestStatus = localStorage.getItem('requestStatus')
    ? localStorage.getItem('requestStatus')
    : '';

const initialState = {
    resourceFromOcean,
    resourceFromVost,
    resourceFromVlazh,
    resName,
    requestStatus,
}

const filtersSlice = createSlice({
    name: 'filters',
    initialState,
    reducers: {
        setResourcesFromOcean(state, {payload}) {
            state.resourceFromOcean = payload
            localStorage.setItem('resourcesFromOcean', payload)
        },
        setResourcesFromVlazh(state, {payload}) {
            state.resourceFromVlazh = payload
            localStorage.setItem('resourceFromVlazh', payload)
        },
        setResourcesFromVost(state, {payload}) {
            state.resourceFromVost = payload
            localStorage.setItem('resourceFromVost', payload)
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