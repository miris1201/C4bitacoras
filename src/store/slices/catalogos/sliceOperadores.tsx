const recordsPerPage = import.meta.env.VITE_APP_RECORSPP;

import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { ListasTemplate, ResponseData } from '../../../interfaces';

const initialUserActive = {
	id: '',
    nombre: '',
    apellido_paterno: '',
    apellido_materno: '',
    email: '',
    password: '',
    id_user_flotilla: '',
    id_tarjeta: '',
    created_at: '',
}

const initialState: ListasTemplate = {
	windowActive: 1, //1 list, 2 create, 3 edit, 4 view
    idActive: 0,
    rActive: initialUserActive,
    page: 0,
    totalRows: 0,
    totalPages: 0,
    filterSearch: {},
    list: [],
}

export const sliceOperadores = createSlice({
	name: 'operadores',
	initialState,
	reducers: {
		setOperadorActive: ( state, action: PayloadAction<{}> ) =>{
			state.rActive = action.payload
		},
		setIdOperadorActive: ( state, action: PayloadAction<number> ) =>{
			state.idActive = action.payload
		},
		setListOperadores: ( state, action: PayloadAction<ResponseData> ) =>{

			state.list = action.payload.rows;	
			const totalPages = Math.ceil(action.payload.count / recordsPerPage);

			state.totalPages = totalPages
			state.totalRows = action.payload.count

		},
		setPageNumberOperadores: (state, action: PayloadAction<number> ) =>{
			state.page = action.payload
		},
		unSetActiveOperador: ( state ) => {
			state.idActive = 0;
			state.rActive = initialUserActive;
		},
		setSearchOperadores: (state, action: PayloadAction<{}> ) =>{
			state.filterSearch = action.payload;
		},
	}
})

export const { 
	setListOperadores,  
	setOperadorActive,
	setPageNumberOperadores,
	setIdOperadorActive,
	unSetActiveOperador,
	setSearchOperadores
} = sliceOperadores.actions;