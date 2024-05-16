import { MenuAuth } from "./interfaceAuth";

export interface templateState {
	checking: boolean
	uid?: number | null,
	name?: string,
	menu:  MenuAuth[],
	id_rol: number
	user_name: string,
	errors?: any;
	systemOptions?: any
}

export interface userLoginData {
    user:     string;
    password: string;
	token?: string;
}