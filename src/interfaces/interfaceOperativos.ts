export interface OperativosTemplate {
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
	comboOperativos: any[];
}

export interface OperativosInterface {
	id_operativo: number;
	descripcion: string;
	activo: string;
}
  
export interface FilterOperativos {
	sDescripcion:  string;
}

export interface dataItemOperativos{
    item: OperativosInterface;
    edit: boolean;
    elim: boolean;
}
