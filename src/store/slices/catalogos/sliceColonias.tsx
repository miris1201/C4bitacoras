const recordsPerPage = import.meta.env.VITE_APP_RECORSPP;

import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { ListasTemplate, ResponseData } from '../../../interfaces';

const initialColoniasActive = {
	id_colonia: '',
    nombre: '',
    tipo: '',
    sector: '',
    region: '',
}

const initialState: ListasTemplate = {
	windowActive: 1, //1 list, 2 create, 3 edit, 4 view
    idActive: 0,
    rActive: initialColoniasActive,
    page: 0,
    totalRows: 0,
    totalPages: 0,
    filterSearch: {},
    list: [],
}

export const sliceColonias = createSlice({
	name: 'colonias',
	initialState,
	reducers: {
		setColoniasActive: ( state, action: PayloadAction<{}> ) =>{
			state.rActive = action.payload
		},
		setIdColoniasActive: ( state, action: PayloadAction<number> ) =>{
			state.idActive = action.payload
		},
		setListColonias: ( state, action: PayloadAction<ResponseData> ) =>{

			state.list = action.payload.rows;	
			const totalPages = Math.ceil(action.payload.count / recordsPerPage);

			state.totalPages = totalPages
			state.totalRows = action.payload.count

		},
		setPageNumberColonias: (state, action: PayloadAction<number> ) =>{
			state.page = action.payload
		},
		unSetActiveColonias: ( state ) => {
			state.idActive = 0;
			state.rActive = initialColoniasActive;
		},
		setSearchColonias: (state, action: PayloadAction<{}> ) =>{
			state.filterSearch = action.payload;
		},
	}
})

export const { 
	setListColonias,  
	setColoniasActive,
	setPageNumberColonias,
	setIdColoniasActive,
	unSetActiveColonias,
	setSearchColonias
} = sliceColonias.actions;