export interface GasolinasInterface {
	id: number;
	nombre: string;
	color: string;
	created_at: string;
	updated_at?: string;
}

export interface FilterGasolinas {
	sNombre: string;
	sColor: string;
}

export interface dataItemGasolinas {
	item: GasolinasInterface;
	edit: boolean;
	elim: boolean;
}
