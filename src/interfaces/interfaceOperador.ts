export interface OperadorTemplate {
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
}

export interface OperadorInterface {
	id: number;
	nombre: string;
	apellido_paterno: string;
	apellido_materno: string;
	email: string;
	password: string;
	id_user_flotilla: string;
	id_tarjeta?: null;
	created_at: string;
}
  
export interface FilterOperadores {
	sNombre:  string;
	sCorreo:  string;
	sUsuario: string;
}

export interface dataItemOperador{
    item: OperadorInterface;
    edit: boolean;
    elim: boolean;
}
