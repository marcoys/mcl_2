import { configureStore, createSlice } from '@reduxjs/toolkit';

let user = createSlice({
  name: 'user',
  initialState: {
    name: '',
    id: '',
    isLogin: null
  },
  reducers: {
    loginUser: (state, action) => {

    },

    clearUser: (state, action) => {

    }
  }
})

export let { loginUser, clearUser } = user.actions;

export default configureStore({
  reducer: { 
    user : user.reducer
  }
}) 