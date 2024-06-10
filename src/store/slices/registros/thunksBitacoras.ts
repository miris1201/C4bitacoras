const baseUrl = import.meta.env.VITE_APP_API_URL;
const recordsPerPage = import.meta.env.VITE_APP_RECORSPP;

import Swal from "sweetalert2";
import { AxiosError } from "axios";

import { AppDispatch, GetState } from "../..";
import { AppState } from "../../../interfaces";

import { setLoadingState, setShowList } from "../transaction";
import { exportFile } from "../../../components/helpers/exportGeneric";

import { setListaBitacoras } from "./sliceBitacoras";
import { setComboDepartamentos } from "../catalogos";

import bitacoraApi from "../../../api/bitacoras";
import departamentosApi from "../../../api/departamentos";

export const startGetRegBitacoras = () => async( dispatch: AppDispatch, getState: GetState) => {
    try {
        
        const { bitacoras } = getState() as AppState;

        dispatch( setLoadingState( true) ) ;
        const regIni = bitacoras.page * recordsPerPage;
        
        const dataSend = {
            limite: 0,
            regIni: regIni,
            regFin: recordsPerPage,
            filtroB: bitacoras.filterSearch
        };

        const resp = await bitacoraApi.post(`/list`, dataSend);
        
        dispatch( setListaBitacoras( resp.data )) ;
        dispatch( setLoadingState( false ) ) ;
    } catch (error) {
        
        if ( error instanceof AxiosError ) console.error(error.message);
        else console.error(error);
    }

}

export const exportDataBitacoras = ( setLoadingExport: React.Dispatch<React.SetStateAction<boolean>> ) => async (dispatch: AppDispatch, getState: GetState ) => {  
    try {

        const { bitacoras } = getState() as AppState;

        setLoadingExport( true );
        const regIni = bitacoras.page * recordsPerPage;
        
        const dataSend = {
            limite: 0,
            regIni: regIni,
            regFin: recordsPerPage,
            filtroB: bitacoras.filterSearch
        };

        const resp = await bitacoraApi.post(`/list`, dataSend);

        await exportFile ( 'rptBitacoras',  resp.data.rows );
        setLoadingExport( false );

        
    } catch (error) {

        if (error instanceof AxiosError) console.error(error.message);
        else console.error(error);
    }

}

export const startInsertBitacora = ( data: {}, setLoadingBtn: React.Dispatch<React.SetStateAction<boolean>> ) => async( dispatch: AppDispatch ) => {

    try {

        setLoadingBtn( true );
        const body = await bitacoraApi.post(`/insertupdate`, data);

        const { done, msg } = body.data;

        if ( done ) {
            await Swal.fire("¡Correcto!", msg, "success");
            dispatch( setShowList ( true ) );
            
        } else {
            Swal.fire("Error", msg, "error");
        }
        
    } catch (error) {
        
        const err:any = error as AxiosError;

        let data = err.response?.data;

        if ( typeof data === 'object') {
            Swal.fire('Error', data.msg, "error");
            
        } else {
            Swal.fire('Error', data, "error");
        }

        setLoadingBtn( false );
    }
}

export const startGetComboDepartamentos = ( ) => async( dispatch: AppDispatch ) => {

    try {

        const body = await departamentosApi.post(`/combo`, {} );

        const { done, rows } = body.data;

        if( done ){
            dispatch( setComboDepartamentos( rows ) );
        }
        
    } catch (error) {

        if (error instanceof AxiosError) console.error(error.message);
        else console.error(error);
        
    }
}
