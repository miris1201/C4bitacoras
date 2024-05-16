export interface ProcedenciaTemplate {
	windowActive: number;
	idActive: number;
	loading: boolean;
	rActive: { [key: string]: any };
	readOnly: boolean;
	page: number;
	totalRows: number;
	totalPages: number;
	filterSearch: any;
	list: any[];
	errors?: any;
	comboProcedencia: any[];
}

export interface ProcedenciaInterface {
	id_procedencia: number;
	descripcion: string;
	activo: string;
}
  
export interface FilterProcedencia {
	sDescripcion:  string;
}

export interface dataItemProcedencia{
    item: ProcedenciaInterface;
    edit: boolean;
    elim: boolean;
}
