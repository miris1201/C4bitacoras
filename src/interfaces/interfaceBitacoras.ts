export interface BitacoraTemplate {
    windowsActive: number;
    idActive: number;
    loading: boolean;
    rActive: { [key: string]: any};
    readOnly: boolean;
    page: number;
    totalRows: number;
    totalPages: number;
    filterSearch: any;
    filterDeptos: Array<number>;
    list: any[];
    errors?: any;
}

export interface BitacoraInterface {
    id_bitacora: number;
    folio: number;
    fecha_captura: string;
    id_usuario: number;
    usuario: string;
    id_zona: number;
    id_departamento: number;
    departamento: string;
    unidad: string;
    fecha: string;
    hora: string;
    detalle: string;
}

export interface FilterBitacora {
    sFolio: string;
    sFechaInicial: string;
    sFechaFinal: string;
}

export interface dataItemBitacora {
    item: BitacoraInterface;
}

export interface iModalDetalle {
    folio: number;
    user: string;
    fecha: string;
    detalle: string;
	showModal: boolean;
	setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
}
