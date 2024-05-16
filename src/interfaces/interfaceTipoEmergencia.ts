export interface TipoEmergenciaTemplate {
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
	comboTipoEmergencia: any[];
}

export interface TipoEmergenciaInterface {
	id_tipo_emergencia: number;
	descripcion: string;
	activo: string;
}
  
export interface FilterTipoEmergencia {
	sDescripcion:  string;
}

export interface dataItemTipoEmergencia{
    item: TipoEmergenciaInterface;
    edit: boolean;
    elim: boolean;
}
