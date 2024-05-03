const recordsPerPage = import.meta.env.VITE_APP_RECORSPP;

import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { ResponseData, UserTemplateState } from '../../../interfaces';

const initialUserActive = {
	id_usuario: '',
    id_rol: '',
    usuario: '',
    sexo: '',
    nombre: '',
    apepa: '',
    apema: '',
    img: '',
    admin: '',
    activo: '',
    menuActive: [],
}

const initialTermSearch = {}

const initialState: UserTemplateState = {
	windowActive: 1, //1 list, 2 create, 3 edit, 4 view
    idActive: 0,
    loading: false,
    uActive: initialUserActive,
    readOnly: false,
    page: 0,
    totalRows: 0,
    totalPages: 0,
    dataProfileId: [],
    filterSearch: initialTermSearch,
    list: [],
	comboProfile: [],
}

export const userSlice = createSlice({
	name: 'users',
	initialState,
	reducers: {
		setUserActive: ( state, action: PayloadAction<{}> ) =>{
			state.uActive = action.payload
		},
		setIdUserActive: ( state, action: PayloadAction<number> ) =>{
			state.idActive = action.payload
		},
 		setListUser: ( state, action: PayloadAction<ResponseData> ) =>{

			state.list = action.payload.rows;	
			const totalPages = Math.ceil(action.payload.count / recordsPerPage);

			state.totalPages = totalPages
			state.totalRows = action.payload.count

		},
		setPageNumber: (state, action: PayloadAction<number> ) =>{
			state.page = action.payload
		},
		setDataProfileById: (state, action: PayloadAction<Array<any>> ) =>{
			state.dataProfileId = action.payload
		},
		unSetActiveUser: ( state ) => {
			state.idActive = 0;
			state.uActive = initialUserActive;
		},
		setComboProfile: (state, action: PayloadAction<[]> ) =>{
			state.comboProfile = action.payload;
		},
		setSearchUser: (state, action: PayloadAction<{}> ) =>{
			state.filterSearch = action.payload;
		},
	}
})

export const { 
	setListUser,  
	setUserActive,
	setPageNumber,
	setDataProfileById,
	setIdUserActive,
	unSetActiveUser,
	setComboProfile,
	setSearchUser,
} = userSlice.actions;