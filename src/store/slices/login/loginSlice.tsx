import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { templateState  } from '../../../interfaces';

const initialState: templateState = {
	checking: false,
	menu: [],
	uid: null,
	id_rol: 0,
	user_name: "",
	name: ""
}

export const loginSlice = createSlice({
	name: 'login',
	initialState,
	reducers: {
		setLoadingState: ( state, action: PayloadAction<boolean> ) =>{
			state.checking = action.payload
		},
		setDataUserMenu: ( state, action: PayloadAction<[]> ) =>{
			state.menu = action.payload
		},
		setDataUid: ( state, action: PayloadAction< number | null > ) =>{
			state.uid = action.payload
		},
		setIdRol: (state, action: PayloadAction<number>) => {
			state.id_rol = action.payload
		},
		setDataName: (state, action: PayloadAction<string>) => {
			state.name = action.payload
		},
		setUserName: (state, action: PayloadAction<string>) => {
			state.user_name = action.payload
		},
		startLogout: ( state ) => {
			localStorage.clear();
			state.checking = false
			state.uid = null
			state.name = ""
		},
		
	}
})

// Action creators are generated for each case reducer function
export const { 
	setLoadingState, 
	setDataUserMenu, 
	setDataUid, 
	setIdRol,
	setDataName,
	setUserName,
	startLogout 
} = loginSlice.actions;