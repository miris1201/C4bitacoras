

export interface ResponseData {
	done: boolean;
	msg: string;
	rows: [];
	count: number;
}

export interface ResponseInsertUpdate {
	done: boolean;
	msg: string;
	id: number;
}


export interface ListasTemplate {
	windowActive: number;
	idActive: number;
	rActive: { [key: string]: any };
	page: number;
	totalRows: number;
	totalPages: number;
	filterSearch: any;
	list: any[];
	errors?: any;
}

export interface ModalSearchList {
    showModal: boolean;
    setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
}