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
    list: any[];
    errors?: any;
    comboDepartamentos: any[];
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
    sDepartamento: string;
    sFechaInicial: string;
    sFechaFinal: string;
}

export interface dataItemBitacora {
    item: BitacoraInterface;
}