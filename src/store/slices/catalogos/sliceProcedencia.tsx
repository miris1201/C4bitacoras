const recordsPerPage = import.meta.env.VITE_APP_RECORSPP;

import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { ProcedenciaTemplate, ResponseData } from '../../../interfaces';

const initialProcedenciaActive = {
	id_procedencia: '',
    descripcion: '',
	activo: '',
}

const initialState: ProcedenciaTemplate = {
	windowActive: 1, //1 list, 2 create, 3 edit, 4 view
    idActive: 0,
	loading: false,
    rActive: initialProcedenciaActive,
	readOnly: false,
    page: 0,
    totalRows: 0,
    totalPages: 0,
    filterSearch: {},
    list: [],
	comboProcedencia: [],
}

export const sliceProcedencia = createSlice({
	name: 'procedencia',
	initialState,
	reducers: {
		setProcedenciaActive: ( state, action: PayloadAction<{}> ) =>{
			state.rActive = action.payload
		},
		setIdProcedenciaActive: ( state, action: PayloadAction<number> ) =>{
			state.idActive = action.payload
		},
		setListProcedencia: ( state, action: PayloadAction<ResponseData> ) =>{

			state.list = action.payload.rows;	
			const totalPages = Math.ceil(action.payload.count / recordsPerPage);

			state.totalPages = totalPages
			state.totalRows = action.payload.count

		},
		setPageNumberProcedencia: (state, action: PayloadAction<number> ) =>{
			state.page = action.payload
		},
		unSetActiveProcedencia: ( state ) => {
			state.idActive = 0;
			state.rActive = initialProcedenciaActive;
		},
		setSearchProcedencia: (state, action: PayloadAction<{}> ) =>{
			state.filterSearch = action.payload;
		},
		setComboProcedencia: (state, action: PayloadAction<[]> ) =>{
			state.comboProcedencia = action.payload;
		},
	}
})

export const { 
	setListProcedencia,  
	setProcedenciaActive,
	setPageNumberProcedencia,
	setIdProcedenciaActive,
	unSetActiveProcedencia,
	setSearchProcedencia,
	setComboProcedencia,
} = sliceProcedencia.actions;