const recordsPerPage = import.meta.env.VITE_APP_RECORSPP;

import Swal from "sweetalert2";
import { AxiosError } from "axios";

import { AppDispatch, GetState } from "../..";
import { AppState } from "../../../interfaces"

import { setLoadingState, setShowList } from "../transaction";
import { exportFile } from "../../../components/helpers/exportGeneric";

import { setComboEstatus, setIdServicioActive, setServiciosActive, setServiciosList } from "./sliceServicios";
import serviciosApi from "../../../api/servicios";


export const startGetRegServicios = (id_zona: number, id_rol: number) => async( dispatch: AppDispatch, getState: GetState) => {

    try {
        const { servicios } = getState() as AppState;

        // dispatch( setLoadingState( true ) ) ;
        const regIni = servicios.page * recordsPerPage;

        const dataSend = {
            limite: 0,
            regIni: regIni,
            regFin: recordsPerPage,
            filtroB: servicios.filterSearch,
            filtroD: servicios.filterDeptos,
            filtroS: servicios.filterStatus,
            id_zona: id_zona,
            id_rol: id_rol
        }

        const resp = await serviciosApi.post(`/list`, dataSend);

        dispatch( setServiciosList( resp.data ) ) ;
        dispatch( setLoadingState( false ));

    } catch (error) {
        if ( error instanceof AxiosError ) console.error(error.message);
        else console.error(error);

    }

}

export const exportDataServicios = (id_zona: number, id_rol: number, setLoadingExport: React.Dispatch<React.SetStateAction<boolean>> ) => async (dispatch: AppDispatch, getState: GetState ) => {  
    try {

        const { servicios } = getState() as AppState;

        const regIni = servicios.page * recordsPerPage;
        
        const dataSend = {
            limite: 0,
            regIni: regIni,
            regFin: recordsPerPage,
            filtroB: servicios.filterSearch,
            filtroD: servicios.filterDeptos,
            filtroS: servicios.filterStatus,
            id_zona: id_zona,
            id_rol: id_rol
        };

        const resp = await serviciosApi.post(`/listExport`, dataSend);

        await exportFile ( 'rptServicios',  resp.data.rows );
        setLoadingExport( false );

        
    } catch (error) {

        if (error instanceof AxiosError) console.error(error.message);
        else console.error(error);
    }

}

export const startInsertServicios = ( data: any, setLoadingBtn: React.Dispatch<React.SetStateAction<boolean>> ) => async( dispatch: AppDispatch ) =>  {
    try {

        const body = await serviciosApi.post(`/insertupdate`, data);

        const { done, msg } = body.data;

        if( done ){
            await Swal.fire("¡Correcto!", msg, "success");
            dispatch( setShowList( true ) );
        }else{
            Swal.fire("Error", msg, "error");
        }

        setLoadingBtn( false );
        

    } catch (error) {

        if ( error instanceof AxiosError ) console.error(error.message);
        else console.error(error);

    }
} 

export const startServiciosActive = ( idShow: number ) => async( dispatch: AppDispatch ) => {
    try {
       
        const body = await serviciosApi.post(`/show`, { idShow });
        
        const { done, rows  } = body.data;

        if( done ){

            dispatch( setServiciosActive( rows ));
            dispatch( setIdServicioActive( idShow ));
            dispatch( setShowList( false ));
            dispatch( setLoadingState( false ) ) ;

        }

    } catch (error) {

        if ( error instanceof AxiosError ) console.error(error.message);
        else console.error(error);

    }
} 

export const startInsertAsignacion = (  data: any, setLoadingBtn: React.Dispatch<React.SetStateAction<boolean>>  ) => async( dispatch: AppDispatch ) => {
    try {

        const body = await serviciosApi.post(`/insertAsignacion`, data );
        
        const { done, msg, rows, id } = body.data;

        if( done ){
            await Swal.fire("¡Correcto!", msg, "success");
            dispatch( setShowList( true ) );
        }else{
            Swal.fire("Error", msg, "error");
        }

        setLoadingBtn( false );
        

    } catch (error) {

        const err:any = error as AxiosError;

        let data = err.response?.data;
        
        if( typeof data === 'object'){
            Swal.fire("Error", data.msg , "error");
        }else{
            Swal.fire("Error", data , "error");
        }
        
        setLoadingBtn( false );

    }
} 

export const startInsertResultado = (  data: any, setLoadingBtn: React.Dispatch<React.SetStateAction<boolean>>  ) => async( dispatch: AppDispatch ) => {
    try {

        const body = await serviciosApi.post(`/insertRespuesta`, data );
        
        const { done, msg } = body.data;

        if( done ){
            await Swal.fire("¡Correcto!", msg, "success");
            dispatch( setShowList( true ));
        }else{
            Swal.fire("Error", msg, "error");
        }

        setLoadingBtn( false );
        

    } catch (error) {

        const err:any = error as AxiosError;

        let data = err.response?.data;
        
        if( typeof data === 'object'){
            Swal.fire("Error", data.msg , "error");
        }else{
            Swal.fire("Error", data , "error");
        }
        
        setLoadingBtn( false );

    }
} 

export const startInsertNotes = (  data: any, setLoadingBtn: React.Dispatch<React.SetStateAction<boolean>>  ) => async( dispatch: AppDispatch ) => {
    try {
       
        const body = await serviciosApi.post(`/insertNotas`, data );
        
        const { done, msg  } = body.data;

        if( done ){
            await Swal.fire("¡Correcto!", msg, "success");
            dispatch( setShowList( true ) );
        }else{
            Swal.fire("Error", msg, "error");
        }

        setLoadingBtn( false );
        

    } catch (error) {

        const err:any = error as AxiosError;

        let data = err.response?.data;
        
        if( typeof data === 'object'){
            Swal.fire("Error", data.msg , "error");
        }else{
            Swal.fire("Error", data , "error");
        }
        
        setLoadingBtn( false );

    }
} 

export const startGetComboEstatus = ( ) => async( dispatch: AppDispatch ) => {
    try {

        const body = await serviciosApi.post(`/comboEstatus`, {} );

        const { done, rows } = body.data;

        if( done ){
            dispatch( setComboEstatus( rows ) );
        }

    } catch (error) {

        if ( error instanceof AxiosError ) console.error(error.message);
        else console.error(error);

    }
}