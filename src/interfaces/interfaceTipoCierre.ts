export interface TipoCierreTemplate {
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
	comboTipoCierre: any[];
}

export interface TipoCierreInterface {
	id_tipo_cierre: number;
	descripcion: string;
	activo: string;
}
  
export interface FilterTipoCierre {
	sDescripcion:  string;
}

export interface dataItemTipoCierre{
    item: TipoCierreInterface;
    edit: boolean;
    elim: boolean;
}
