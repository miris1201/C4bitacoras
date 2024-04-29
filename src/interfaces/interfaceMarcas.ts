export interface MarcasTemplate {
	windowActive: number;
	idActive: number;
	loading: boolean;
	rActive: { [key: string]: any };
	page: number;
	totalRows: number;
	totalPages: number;
	filterSearch: any;
	list: any[];
	errors?: any;
}

export interface MarcaInterface {
	id: number;
	nombre: string;
	created_at: string;
	updated_at?: string;
}
  
export interface FilterMarcas {
	sNombre:  string;
}

export interface dataItemMarca{
    item: MarcaInterface;
    edit: boolean;
    elim: boolean;
}
