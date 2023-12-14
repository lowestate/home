import { createSlice } from "@reduxjs/toolkit"

const resources = localStorage.getItem('resources')
    ? localStorage.getItem('resources')?.split(',')
    : [];

const initialState = {
    resources,
    added: false
}

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers:{
        addResources(state, {payload}) {
            if (state.resources == null) {
                state.resources = []
            }

            if (state.resources.indexOf(payload.toString()) === -1) {
                state.resources.push(payload.toString())
                localStorage.setItem('resources', state.resources.toString())
            }
            state.added = true
            
        },
        removeResource(state, {payload}) {
            if (state.resources == null) {
                state.resources = []
            }

            if (state.resources.length == 0) {
                return
            }
            
            const resourceIndex = state.resources.indexOf(payload.toString())
            if (resourceIndex > -1) {
                state.resources.splice(resourceIndex, 1)
                localStorage.setItem('resources', state.resources.toString())
            }
        },
        disableAdded(state) {
            state.added = false
        }
    }
})

export default cartSlice