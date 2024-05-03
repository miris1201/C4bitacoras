const recordsPerPage = import.meta.env.VITE_APP_RECORSPP;

import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { ProfileTemplateState, ResponseData } from '../../../interfaces';

const initialRegActive = {
    id_rol: '',
    usuario: '',
    sexo: '',
    nombre: '',
    apepa: '',
    apema: '',
    img: '',
    admin: '',
    activo: '',
}

const initialState: ProfileTemplateState = {
	windowActive: 1, 
    idActive: 0,
	loading: false,
    rActive: initialRegActive,
    readOnly: false,
    page: 0,
    totalRows: 0,
    totalPages: 0,
    dataProfileId: [],
    filterSearch: {},
    list: [],
    comboProfile: []
}


export const profileSlice = createSlice({
	name: 'users',
	initialState,
	reducers: {
		setLoadingState: ( state, action: PayloadAction<boolean> ) =>{
			state.loading = action.payload
		},
		setProfileActive: ( state, action: PayloadAction<{}> ) =>{
			state.rActive = action.payload
		},
		setDataProfileById: (state, action: PayloadAction<Array<any>> ) =>{
			state.dataProfileId = action.payload
		},
		setIdProfileActive: ( state, action: PayloadAction<number> ) =>{
			state.idActive = action.payload
		},
		setReadOnly: ( state, action: PayloadAction<boolean> ) =>{
			state.readOnly = action.payload
		},
		setList: ( state, action: PayloadAction<ResponseData> ) =>{

			state.loading = true;
			state.list = action.payload.rows;	
			const totalPages = Math.ceil(action.payload.count / recordsPerPage);

			state.totalPages = totalPages
			state.totalRows = action.payload.count

		},
		unSetActiveProfile: ( state ) => {
			state.idActive = 0;
			state.rActive = initialRegActive;
		},
		setPageNumber: (state, action: PayloadAction<number> ) =>{
			state.page = action.payload
		},
		setSearchProfile: (state, action: PayloadAction<{}> ) =>{
			state.filterSearch = action.payload;
		},
	}
})

export const {  
	setLoadingState,
	setProfileActive,
	setList,
	setDataProfileById,
	setIdProfileActive,
	unSetActiveProfile,
	setReadOnly,
	setSearchProfile,
	setPageNumber,
} = profileSlice.actions;