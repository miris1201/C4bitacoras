const recordsPerPage = import.meta.env.VITE_APP_RECORSPP;

import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import {  OperativosTemplate, ResponseData } from '../../../interfaces';

const initialOperativosActive = {
	id_operativo: '',
    descripcion: '',
	activo: '',
}

const initialState: OperativosTemplate = {
	windowActive: 1, //1 list, 2 create, 3 edit, 4 view
    idActive: 0,
	loading: false,
    rActive: initialOperativosActive,
	readOnly: false,
    page: 0,
    totalRows: 0,
    totalPages: 0,
    filterSearch: {},
    list: [],
	comboOperativos: [],
}

export const sliceOperativos = createSlice({
	name: 'operativos',
	initialState,
	reducers: {
		setOperativosActive: ( state, action: PayloadAction<{}> ) =>{
			state.rActive = action.payload
		},
		setIdOperativoActive: ( state, action: PayloadAction<number> ) =>{
			state.idActive = action.payload
		},
		setListOperativos: ( state, action: PayloadAction<ResponseData> ) =>{

			state.list = action.payload.rows;	
			const totalPages = Math.ceil(action.payload.count / recordsPerPage);

			state.totalPages = totalPages
			state.totalRows = action.payload.count

		},
		setPageNumberOperativos: (state, action: PayloadAction<number> ) =>{
			state.page = action.payload
		},
		unSetActiveOperativo: ( state ) => {
			state.idActive = 0;
			state.rActive = initialOperativosActive;
		},
		setSearchOperativos: (state, action: PayloadAction<{}> ) =>{
			state.filterSearch = action.payload;
		},
		setComboOperativos: (state, action: PayloadAction<[]> ) =>{
			state.comboOperativos = action.payload;
		},
	}
})

export const { 
	setListOperativos,  
	setOperativosActive,
	setPageNumberOperativos,
	setIdOperativoActive,
	unSetActiveOperativo,
	setSearchOperativos,
	setComboOperativos,
} = sliceOperativos.actions;