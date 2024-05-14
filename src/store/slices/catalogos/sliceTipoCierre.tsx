const recordsPerPage = import.meta.env.VITE_APP_RECORSPP;

import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { TipoCierreTemplate, ResponseData } from '../../../interfaces';

const initialTipoCierreActive = {
	id_tipo_cierre: '',
    descripcion: '',
	activo: '',
}

const initialState: TipoCierreTemplate = {
	windowActive: 1, //1 list, 2 create, 3 edit, 4 view
    idActive: 0,
	loading: false,
    rActive: initialTipoCierreActive,
	readOnly: false,
    page: 0,
    totalRows: 0,
    totalPages: 0,
    filterSearch: {},
    list: [],
	comboTipoCierre: [],
}

export const sliceTipoCierre = createSlice({
	name: 'TipoCierre',
	initialState,
	reducers: {
		setTipoCierreActive: ( state, action: PayloadAction<{}> ) =>{
			state.rActive = action.payload
		},
		setIdTipoCierreActive: ( state, action: PayloadAction<number> ) =>{
			state.idActive = action.payload
		},
		setListTipoCierre: ( state, action: PayloadAction<ResponseData> ) =>{

			state.list = action.payload.rows;	
			const totalPages = Math.ceil(action.payload.count / recordsPerPage);

			state.totalPages = totalPages
			state.totalRows = action.payload.count

		},
		setPageNumberTipoCierre: (state, action: PayloadAction<number> ) =>{
			state.page = action.payload
		},
		unSetActiveTipoCierre: ( state ) => {
			state.idActive = 0;
			state.rActive = initialTipoCierreActive;
		},
		setSearchTipoCierre: (state, action: PayloadAction<{}> ) =>{
			state.filterSearch = action.payload;
		},
		setComboTipoCierre: (state, action: PayloadAction<[]> ) =>{
			state.comboTipoCierre = action.payload;
		},
	}
})

export const { 
	setListTipoCierre,  
	setTipoCierreActive,
	setPageNumberTipoCierre,
	setIdTipoCierreActive,
	unSetActiveTipoCierre,
	setSearchTipoCierre,
	setComboTipoCierre,
} = sliceTipoCierre.actions;