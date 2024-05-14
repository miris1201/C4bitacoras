export interface CuadrantesTemplate {
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
	comboCuadrantes: any[];
	comboSector: any[];
	comboZona: any[];
}

export interface CuadrantesInterface {
	id_cuadrante: number;
	id_zona: string;
	zona: string;
	sector: string;
	cuadrante: string;
	activo: string;
}
  
export interface FilterCuadrantes {
	sId_zona:  string;
	sCuadrante:  string;
}

export interface dataItemCuadrantes{
    item: CuadrantesInterface;
    edit: boolean;
    elim: boolean;
}
