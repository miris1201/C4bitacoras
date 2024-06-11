const recordsPerPage = import.meta.env.VITE_APP_RECORSPP;

import { PayloadAction, createSlice } from "@reduxjs/toolkit"
import { BitacoraTemplate, ResponseData } from "../../../interfaces"

const initialBitacorasActive = {
    id_bitacora: '',
    folio: '',
    id_usuario: '',
    usuario: '',
    id_zona: '',
    id_departamento: '',
    departamento: '',
    unidad: '',
    fecha: '',
    hora: '',
    detalle: ''
}

const initialState: BitacoraTemplate = {
    windowsActive: 1,
    idActive: 0,
    loading: false,
    rActive: initialBitacorasActive,
    readOnly: false,
    page: 0,
    totalRows: 0,
    totalPages: 0,
    filterSearch: {},
    list: [],
    comboDepartamentos: [],
}

export const sliceBitacoras = createSlice({
    name: 'bitacoras',
    initialState,
    reducers: {
        setBitacorasActive: ( state, action: PayloadAction<{}> ) => {
            state.rActive = action.payload
        },
        setListaBitacoras: ( state, action: PayloadAction<ResponseData> ) => {
            state.list = action.payload.rows;
            const totalPages = Math.ceil(action.payload.count / recordsPerPage);

            state.totalPages = totalPages
            state.totalRows = action.payload.count
        },
        setPageNumberBitacoras: ( state, action: PayloadAction<number> ) => {
            state.page = action.payload
        },
        unSetActiveBitacoras: ( state ) => {
			state.idActive = 0;
			state.rActive = initialBitacorasActive;
		},
        setSearchBitacoras: ( state, action: PayloadAction<{}> ) => {
            state.filterSearch = action.payload
        },
        setComboDepartamentos: ( state, action: PayloadAction<Array<[]>> ) => {
            state.comboDepartamentos = action.payload;
        },

    }
})

export const {
    setBitacorasActive,
    setListaBitacoras,
    setPageNumberBitacoras,
    unSetActiveBitacoras,
    setSearchBitacoras,
    setComboDepartamentos,
} = sliceBitacoras.actions;