export interface TerminalesInterface {
	id: number;
	nombre: string;
	uuid: string;
	created_at: string;
	updated_at?: string;
	activo: number;
}

export interface FilterTerminales {
	sNombre: string;
	sUuid: string;
}

export interface dataItemTerminales {
	item: TerminalesInterface;
	edit: boolean;
	elim: boolean;
}
