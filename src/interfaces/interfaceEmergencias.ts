export interface EmergenciasTemplate {
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
	comboEmergencias: any[];
	comboEmergenciaCierre: any[];
}

export interface EmergenciasInterface {
	id_emergencia: number;
	id_departamento: number;
	departamento: string;
	descripcion: string;
	activo: string;
}
  
export interface FilterEmergencias {
	sId_departamento:  number;
	sDescripcion:  string;
}

export interface dataItemEmergencias{
    item: EmergenciasInterface;
    edit: boolean;
    elim: boolean;
}
