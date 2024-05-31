export interface BitacorasTemplateState {
	windowActive: number;
	idActive: number;
	loading: boolean;
	bActive: { [key: string]: any };
	readOnly: boolean;
	page: number;
	totalRows: number;
	totalPages: number;
	filterSearch: any;
	list: any[];
	errors?: any;
	comboDepartamentos: any[];
    comboZona: any[];
}

export interface BitacorasInterface {
	id_bitacora: number;
	folio: number;
	id_usuario: number;
	id_zona: number;
	id_departamento: number;
	unidad: string;
	fecha: string;
	hora: string;
	detalle: string;
	
}
  
export interface FilterBitacoras {
	sFolio: number;
	sDescripcion:  string;
	SFechaInicio: string;
	SFechaFin: string;
}

export interface dataItemBitacoras{
    item: BitacorasInterface;
    edit: boolean;
    elim: boolean;
}
