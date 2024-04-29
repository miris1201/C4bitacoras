import { store } from "../store";

export interface templateListData {
	limite: number;
	regIni: number;
	regFin: number;
	filtroB: Array<any>;
}

export type AppState = ReturnType<typeof store.getState>;