export interface ColoniaTemplate {
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
	comboColonias: any[];
}

export interface ColoniaInterface {
	id_colonia: number;
	nombre: string;
	tipo: string;
	sector: string;
	region: string;
}
  
export interface FilterColonia {
	sNombre:  string;
}

export interface dataItemColonias{
    item: ColoniaInterface;
    edit: boolean;
    elim: boolean;
}
