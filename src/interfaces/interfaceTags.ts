export interface TagsInterface {
	id: number;
	nombre: string;
	created_at: string;
	updated_at?: string;
	activo: number;
}

export interface FilterTags {
	sNombre: string;
}

export interface dataItemTags {
	item: TagsInterface;
	edit: boolean;
	elim: boolean;
}
