export interface UserTemplateState {
	windowActive: number;
	idActive: number;
	loading: boolean;
	uActive: { [key: string]: any };
	readOnly: boolean;
	page: number;
	totalRows: number;
	totalPages: number; 
	dataProfileId: any[];
	filterSearch: any;
	list: any[];
	errors?: any;
	comboProfile: any[];
}

export interface FilterS {
	sNombre:  string;
	sUsuario: string;
	sZona: number
}

export interface ItemUser{
	id_usuario: number;
	no_empleado: number;
	usuario: string;
	nombre: string;
	activo: number;
}
export interface dataItem{
    item: ItemUser;
    edit: boolean;
    elim: boolean;
}
export interface ChangePasswordParams {
    showModal: boolean;
    setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
    id_usuario: number;
}

export interface dataProfileCheck {
    menu: Array<any>;
    handleCheckBoxChange: any;
    handleCheckBoxChangeChild: any;
}

export interface dataAccountParams {
	showModal: boolean;
	setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
}
