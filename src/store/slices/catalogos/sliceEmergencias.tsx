const recordsPerPage = import.meta.env.VITE_APP_RECORSPP;

import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { EmergenciasTemplate, ResponseData } from '../../../interfaces';

const initialEmergenciasActive = {
	id_Emergencias: '',
    descripcion: '',
	activo: '',
}

const initialState: EmergenciasTemplate = {
	windowActive: 1, //1 list, 2 create, 3 edit, 4 view
    idActive: 0,
	loading: false,
    rActive: initialEmergenciasActive,
	readOnly: false,
    page: 0,
    totalRows: 0,
    totalPages: 0,
    filterSearch: {},
    list: [],
	comboEmergencias: [],
	comboEmergenciaCierre: [],
}

export const sliceEmergencias = createSlice({
	name: 'emergencias',
	initialState,
	reducers: {
		setEmergenciasActive: ( state, action: PayloadAction<{}> ) =>{
			state.rActive = action.payload
		},
		setIdEmergenciasActive: ( state, action: PayloadAction<number> ) =>{
			state.idActive = action.payload
		},
		setListEmergencias: ( state, action: PayloadAction<ResponseData> ) =>{

			state.list = action.payload.rows;	
			const totalPages = Math.ceil(action.payload.count / recordsPerPage);

			state.totalPages = totalPages
			state.totalRows = action.payload.count

		},
		setPageNumberEmergencias: (state, action: PayloadAction<number> ) =>{
			state.page = action.payload
		},
		unSetActiveEmergencias: ( state ) => {
			state.idActive = 0;
			state.rActive = initialEmergenciasActive;
		},
		setSearchEmergencias: (state, action: PayloadAction<{}> ) =>{
			state.filterSearch = action.payload;
		},
		setComboEmergencias: (state, action: PayloadAction<[]> ) =>{
			state.comboEmergencias = action.payload;
		},
		setComboEmergenciaCierre: (state, action: PayloadAction<[]> ) =>{
			state.comboEmergenciaCierre = action.payload;
		},
	}
})

export const { 
	setListEmergencias,  
	setEmergenciasActive,
	setPageNumberEmergencias,
	setIdEmergenciasActive,
	unSetActiveEmergencias,
	setSearchEmergencias,
	setComboEmergencias,
	setComboEmergenciaCierre,
} = sliceEmergencias.actions;