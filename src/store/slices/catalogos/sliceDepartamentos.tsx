const recordsPerPage = import.meta.env.VITE_APP_RECORSPP;

import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { DepartamentosTemplate, ResponseData } from '../../../interfaces';

const initialDepartamentosActive = {
	id_tipo_cierre: '',
    descripcion: '',
	activo: '',
}

const initialState: DepartamentosTemplate = {
	windowActive: 1, //1 list, 2 create, 3 edit, 4 view
    idActive: 0,
	loading: false,
    rActive: initialDepartamentosActive,
	readOnly: false,
    page: 0,
    totalRows: 0,
    totalPages: 0,
    filterSearch: {},
    list: [],
	comboDepartamentos: [],
}

export const sliceDepartamentos = createSlice({
	name: 'departamentos',
	initialState,
	reducers: {
		setDepartamentosActive: ( state, action: PayloadAction<{}> ) =>{
			state.rActive = action.payload
		},
		setIdDepartamentosActive: ( state, action: PayloadAction<number> ) =>{
			state.idActive = action.payload
		},
		setListDepartamentos: ( state, action: PayloadAction<ResponseData> ) =>{

			state.list = action.payload.rows;	
			const totalPages = Math.ceil(action.payload.count / recordsPerPage);

			state.totalPages = totalPages
			state.totalRows = action.payload.count

		},
		setPageNumberDepartamentos: (state, action: PayloadAction<number> ) =>{
			state.page = action.payload
		},
		unSetActiveDepartamentos: ( state ) => {
			state.idActive = 0;
			state.rActive = initialDepartamentosActive;
		},
		setSearchDepartamentos: (state, action: PayloadAction<{}> ) =>{
			state.filterSearch = action.payload;
		},
		setComboDepartamentos: (state, action: PayloadAction<[]> ) =>{
			state.comboDepartamentos = action.payload;
		},
	}
})

export const { 
	setListDepartamentos,  
	setDepartamentosActive,
	setPageNumberDepartamentos,
	setIdDepartamentosActive,
	unSetActiveDepartamentos,
	setSearchDepartamentos,
	setComboDepartamentos,
} = sliceDepartamentos.actions;