export interface DepartamentosTemplate {
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
	comboDepartamentos: any[];
}

export interface DepartamentosInterface {
	id_departamento: number;
	departamento: string;
	abreviatura: string;
	activo: string;
}
  
export interface FilterDepartamentos {
	sDepartamento:  string;
}

export interface dataItemDepartamentos{
    item: DepartamentosInterface;
    edit: boolean;
    elim: boolean;
}
