const recordsPerPage = import.meta.env.VITE_APP_RECORSPP;

import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { ResponseData, ServicioDtlInterface, ServicioInterface, ServiciosTemplate } from "../../../interfaces";


const initialServiciosActive = {
    id_servicio: 0,
    folio: 0,
    fecha_captura: '',
    id_usuario: 0,
    id_zona: 0,
    id_status: 0,
    estatus: '',
    class_name: '',
    fecha: '',
    hora: '',
    calle: '',
    calle1: '',
    calle2: '',
    id_colonia: 0,
    colonia: '',
    nombre: '',
    telefono: '',
    observaciones: '',
    id_emergencia: 0,
    emergencia: '',
    id_operativo: 0,
    operativo: '',
    otros_operativos: '',
    id_llamada: 0,
    id_turno: 0,
    id_cuadrante: 0,
    sector: 0,
    cuadrante: '',
    id_departamento: 0,
    departamento: '',
    placas: '',
	modelo: '',
	marca: '',
	subMarca: '',
	color: '',
	serie: '',
    id_usuario_dtl: 0,
    usuario_dtl: '',
    fecha_captura_dtl: '',
	resultado: '',
	unidad: '',
	hrecibe: '',
	hasignacion: '',
	harribo: '',
    id_usuario_cierre: 0,
    usuario_cierre: '',
    fecha_cierre: '',
	id_emergencia_cierre: 0,
	emergencia_cierre: '',
	id_tipo_cierre: 0,
	tipo_cierre: '',
	id_tipo_emergencia: 0,
	tipo_emergencia: '',
}

const initialState: ServiciosTemplate = {
    windowsActive: 1, //1 list, 2 create, 3 edit, 4 view
    idActive: 0,
    loading: false,
    rActive: initialServiciosActive,
    readOnly: false,
    page: 0,
    totalRows: 0,
    totalPages: 0,
    filterSearch: {},
    list: [],
    filterDeptos: [],
    filterStatus: [],
    comboStatus: [],
}

export const sliceServicios = createSlice({
    name: 'servicios',
    initialState,
    reducers: {
        setServiciosActive: ( state, action: PayloadAction<ServicioInterface> ) => {
            state.rActive = action.payload
        },
        setIdServicioActive: ( state, action: PayloadAction<number> ) =>{
            state.idActive = action.payload
        },
        setServiciosList: ( state, action: PayloadAction<ResponseData> ) =>{
            state.list = action.payload.rows;
            const totalPages = Math.ceil(action.payload.count / recordsPerPage);

            state.totalPages = totalPages
            state.totalRows = action.payload.count
        },
        setPageNumberServicios: (state, action: PayloadAction<number> ) =>{
			state.page = action.payload
		},
		unSetActiveServicios: ( state ) => {
			state.idActive = 0;
			state.rActive = initialServiciosActive;
		},
		setSearchServicios: (state, action: PayloadAction<{}> ) =>{
			state.filterSearch = action.payload;
		},
		setFilterDeptos: (state, action: PayloadAction<any[]> ) =>{
			state.filterDeptos = action.payload;
		},
        setFilterEstatus: (state, action: PayloadAction<any[]> ) =>{
			state.filterStatus = action.payload;
		},
        setComboEstatus: (state, action: PayloadAction<[]> ) =>{
			state.comboStatus = action.payload;
		},
    }
})

export const {
    setServiciosActive,
    setIdServicioActive,
    setServiciosList,
    setPageNumberServicios,
    unSetActiveServicios,
    setSearchServicios,
    setFilterDeptos,
    setFilterEstatus,
    setComboEstatus,
} = sliceServicios.actions;