export interface ProfileTemplateState {
	windowActive: number;
	idActive: number;
	loading: boolean;
	rActive: { [key: string]: any };
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

export interface ItemProfile{
	id: number;
	rol: string;
	descripcion: string;
	activo: number;
}

export interface dataItemProfile{
    item: ItemProfile;
    edit: boolean;
    elim: boolean;
}