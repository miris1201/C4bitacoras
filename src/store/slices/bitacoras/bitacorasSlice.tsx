const recordsPerPage = import.meta.env.VITE_APP_RECORSPP;

import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { BitacorasTemplateState, ResponseData } from '../../../interfaces';
// import { setComboDepartamentos } from '../catalogos';

const initialBitacorasActive = {
	id_bitacora: '',
    folio: '',
    id_usuario: '',
    id_zona: '',
    id_departamento: '',
    departamento: '',
    unidad: '',
    fecha: '',
    hora: '',
    detalle: '',
    activo: '',
}

const initialTermSearch = {}

const initialState: BitacorasTemplateState = {
	windowActive: 1, //1 list, 2 create, 3 edit, 4 view
    idActive: 0,
    loading: false,
    bActive: initialBitacorasActive,
    readOnly: false,
    page: 0,
    totalRows: 0,
    totalPages: 0,
    filterSearch: initialTermSearch,
    list: [],
	comboDepartamentos: [],
    comboZona: [],
}

export const bitacorasSlice = createSlice({
	name: 'bitacoras',
	initialState,
	reducers: {
		setBitacoraActive: ( state, action: PayloadAction<{}> ) =>{
			state.bActive = action.payload
		},
		setIdBitacoraActive: ( state, action: PayloadAction<number> ) =>{
			state.idActive = action.payload
		},
 		setListBitacoras: ( state, action: PayloadAction<ResponseData> ) =>{

			state.list = action.payload.rows;	
			const totalPages = Math.ceil(action.payload.count / recordsPerPage);

			state.totalPages = totalPages
			state.totalRows = action.payload.count

		},
		setPageNumber: (state, action: PayloadAction<number> ) =>{
			state.page = action.payload
		},

		unSetActiveBitacora: ( state ) => {
			state.idActive = 0;
			state.bActive = initialBitacorasActive;
		},
		setComboDepartamentos: (state, action: PayloadAction<[]> ) =>{
			state.comboDepartamentos = action.payload;
		},
        setComboZona: (state, action: PayloadAction<[]> ) =>{
			state.comboZona = action.payload;
		},
		setSearchBitacora: (state, action: PayloadAction<{}> ) =>{
			state.filterSearch = action.payload;
		},
		
	}
})

export const { 
	setListBitacoras,  
	setBitacoraActive,
	setPageNumber,
	unSetActiveBitacora,
	setComboDepartamentos,
	setComboZona,
	setSearchBitacora
} = bitacorasSlice.actions;