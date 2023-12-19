import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface CartState {
  resources: string[];
  added: boolean;
}

const initialState: CartState = {
  resources: localStorage.getItem('resources')
    ? localStorage.getItem('resources')?.split(',') || []
    : [],
  added: false,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addResource(state, { payload }: PayloadAction<string>) {
      if (!state.resources.includes(payload)) {
        state.resources.push(payload);
        localStorage.setItem('resources', state.resources.toString());
      }
      state.added = true;
    },
    removeResource(state, { payload }: PayloadAction<string>) {
      const orbitIndex = state.resources.indexOf(payload);
      if (orbitIndex > -1) {
        state.resources.splice(orbitIndex, 1);
        localStorage.setItem('resources', state.resources.toString());
      }
    },
    disableAdded(state) {
      state.added = false;
    },
    setResources(state, { payload }: PayloadAction<string[]>) {
      state.resources = Array.from(new Set([...state.resources, ...payload]));
      localStorage.setItem('orbits', state.resources.toString());
    },
  },
});

export default cartSlice;