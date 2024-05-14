const recordsPerPage = import.meta.env.VITE_APP_RECORSPP;

import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { TipoEmergenciaTemplate, ResponseData } from '../../../interfaces';

const initialTipoEmergenciaActive = {
	id_tipo_emergencia: '',
    descripcion: '',
	activo: '',
}

const initialState: TipoEmergenciaTemplate = {
	windowActive: 1, //1 list, 2 create, 3 edit, 4 view
    idActive: 0,
	loading: false,
    rActive: initialTipoEmergenciaActive,
	readOnly: false,
    page: 0,
    totalRows: 0,
    totalPages: 0,
    filterSearch: {},
    list: [],
	comboTipoEmergencia: [],
}

export const sliceTipoEmergencia = createSlice({
	name: 'tipoEmergencia',
	initialState,
	reducers: {
		setTipoEmergenciaActive: ( state, action: PayloadAction<{}> ) =>{
			state.rActive = action.payload
		},
		setIdTipoEmergenciaActive: ( state, action: PayloadAction<number> ) =>{
			state.idActive = action.payload
		},
		setListTipoEmergencia: ( state, action: PayloadAction<ResponseData> ) =>{

			state.list = action.payload.rows;	
			const totalPages = Math.ceil(action.payload.count / recordsPerPage);

			state.totalPages = totalPages
			state.totalRows = action.payload.count

		},
		setPageNumberTipoEmergencia: (state, action: PayloadAction<number> ) =>{
			state.page = action.payload
		},
		unSetActiveTipoEmergencia: ( state ) => {
			state.idActive = 0;
			state.rActive = initialTipoEmergenciaActive;
		},
		setSearchTipoEmergencia: (state, action: PayloadAction<{}> ) =>{
			state.filterSearch = action.payload;
		},
		setComboTipoEmergencia: (state, action: PayloadAction<[]> ) =>{
			state.comboTipoEmergencia = action.payload;
		},
	}
})

export const { 
	setListTipoEmergencia,  
	setTipoEmergenciaActive,
	setPageNumberTipoEmergencia,
	setIdTipoEmergenciaActive,
	unSetActiveTipoEmergencia,
	setSearchTipoEmergencia,
	setComboTipoEmergencia,
} = sliceTipoEmergencia.actions;