import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface templateState {
  sidebarShow: boolean,
  modalChangeDataUser: boolean,
}

const initialState: templateState = {
  sidebarShow: true,
  modalChangeDataUser: false,
}

export const templateSlice = createSlice({
	name: 'template',
	initialState,
	reducers: {
		setSideBar: (state, action: PayloadAction<boolean>) => {
			state.sidebarShow = action.payload
		},
		setModalChangeUser: (state, action: PayloadAction<boolean>) => {
			state.modalChangeDataUser = action.payload
		},
	},
})

// Action creators are generated for each case reducer function
export const { setSideBar, setModalChangeUser } = templateSlice.actions;