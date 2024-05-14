const recordsPerPage = import.meta.env.VITE_APP_RECORSPP;

import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { ColoniaTemplate, ListasTemplate, ResponseData } from '../../../interfaces';

const initialColoniasActive = {
	id_colonia: '',
    nombre: '',
    tipo: '',
    sector: '',
    region: '',
	activo: '',
}

const initialState: ColoniaTemplate = {
	windowActive: 1, //1 list, 2 create, 3 edit, 4 view
    idActive: 0,
	loading: false,
    rActive: initialColoniasActive,
	readOnly: false,
    page: 0,
    totalRows: 0,
    totalPages: 0,
    filterSearch: {},
    list: [],
	comboColonias: [],
	comboTipo: [],
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
		setComboColonias: (state, action: PayloadAction<[]> ) =>{
			state.comboColonias = action.payload;
		},
		setComboTipo: (state, action: PayloadAction<[]> ) =>{
			state.comboTipo = action.payload;
		},
	}
})

export const { 
	setListColonias,  
	setColoniasActive,
	setPageNumberColonias,
	setIdColoniasActive,
	unSetActiveColonias,
	setSearchColonias,
	setComboColonias,
    setComboTipo,
} = sliceColonias.actions;