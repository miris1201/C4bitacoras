export interface ServiciosTemplate {
    windowsActive: number;
    idActive: number;
    loading: boolean;
    rActive: ServicioInterface;
    readOnly: boolean;
    page: number;
    totalRows: number;
    totalPages: number;
    filterSearch: any;
    filterDeptos: Array<number>;
    filterStatus: Array<number>;
    list: any[];
    errors?: any;
    comboStatus: any[];
}

export interface ServicioInterface {
    id_servicio: number;
    folio: number;
    fecha_captura: string;
    id_usuario: number;
    id_zona: number;
    id_status: number;
    estatus: string;
    class_name: string;
    fecha: string;
    hora: string;
    calle: string;
    calle1: string;
    calle2: string;
    id_colonia: number;
    colonia: string;
    nombre: string;
    telefono: string;
    observaciones: string;
    id_emergencia: number;
    emergencia: string;
    id_operativo: number;
    operativo: string;
    otros_operativos: string;
    id_llamada: number;
    id_turno: number;
    id_cuadrante: number;
    sector: number;
    cuadrante: string;
    id_departamento: number;
    departamento: string;
    placas: string;
	modelo?: string;
	marca?: string;
	subMarca?: string;
	color?: string;
	serie?: string;
    id_usuario_dtl: number;
    usuario_dtl: string,
    fecha_captura_dtl: string;
	resultado: string;
	unidad: string;
	hrecibe: string;
	hasignacion: string;
	harribo: string;
    id_usuario_cierre: number;
    usuario_cierre: string
    fecha_cierre: string;
	id_emergencia_cierre: number;
	emergencia_cierre: string;
	id_tipo_cierre: number;
	tipo_cierre: string;
	id_tipo_emergencia: number;
	tipo_emergencia: string;
    
}

export interface FilterServicios {
    sFolio: string;
    sId_emergencia: number;
    sFechaInicial: string;
    sFechaFinal: string;
}

export interface dataItemServicio {
    item: ServicioInterface;
    edit: boolean;
    elim: boolean;
}

export interface ServicioDtlInterface {
	id_servicio_dtl: number;
	id_servicio: number;
    id_usuario: number;
    fecha_captura: string;
	resultado: string;
	unidad: string;
	hrecibe: string;
	hasignacion: string;
	harribo: string;
    id_usuario_cierre: number;
    fecha_cierre: string;
	id_emergencia_cierre: number;
	emergencia_cierre: string;
	id_tipo_cierre: number;
	tipo_cierre: string;
	id_tipo_emergencia: number;
	tipo_emergencia: string;
}

export interface iModalAsignar {
	showModal: boolean;
	setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface iModalRespuesta {
	showModal: boolean;
	setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
}
