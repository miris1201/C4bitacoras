const recordsPerPage = import.meta.env.VITE_APP_RECORSPP;

import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { CuadrantesTemplate, ListasTemplate, ResponseData } from '../../../interfaces';

const initialCuadrantesActive = {
	id_cuadrante: '',
    id_zona: '',
	zona: '',
    sector: '',
    cuadrante: '',
	activo: '',
}

const initialState: CuadrantesTemplate = {
	windowActive: 1, //1 list, 2 create, 3 edit, 4 view
    idActive: 0,
	loading: false,
    rActive: initialCuadrantesActive,
	readOnly: false,
    page: 0,
    totalRows: 0,
    totalPages: 0,
    filterSearch: {},
    list: [],
	comboCuadrantes: [],
	comboSector: [],
	comboZona: [],
}

export const sliceCuadrantes = createSlice({
	name: 'cuadrantes',
	initialState,
	reducers: {
		setCuadranteActive: ( state, action: PayloadAction<{}> ) =>{
			state.rActive = action.payload
		},
		setIdCuadranteActive: ( state, action: PayloadAction<number> ) =>{
			state.idActive = action.payload
		},
		setListCuadrantes: ( state, action: PayloadAction<ResponseData> ) =>{

			state.list = action.payload.rows;	
			const totalPages = Math.ceil(action.payload.count / recordsPerPage);

			state.totalPages = totalPages
			state.totalRows = action.payload.count

		},
		setPageNumberCuadrantes: (state, action: PayloadAction<number> ) =>{
			state.page = action.payload
		},
		unSetActiveCuadrante: ( state ) => {
			state.idActive = 0;
			state.rActive = initialCuadrantesActive;
		},
		setSearchCuadrantes: (state, action: PayloadAction<{}> ) =>{
			state.filterSearch = action.payload;
		},
		setComboCuadrantes: (state, action: PayloadAction<[]> ) =>{
			state.comboCuadrantes = action.payload;
		},
		setComboSector: (state, action: PayloadAction<[]> ) =>{
			state.comboSector = action.payload;
		},
		setComboZona: (state, action: PayloadAction<[]> ) =>{
			state.comboZona = action.payload;
		},
	}
})

export const { 
	setListCuadrantes,  
	setCuadranteActive,
	setPageNumberCuadrantes,
	setIdCuadranteActive,
	unSetActiveCuadrante,
	setSearchCuadrantes,
	setComboCuadrantes,
    setComboSector,
    setComboZona,
} = sliceCuadrantes.actions;