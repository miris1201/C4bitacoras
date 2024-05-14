const baseUrl = import.meta.env.VITE_APP_API_URL;
const recordsPerPage = import.meta.env.VITE_APP_RECORSPP;

import Swal from "sweetalert2";
import axios, { AxiosError } from 'axios';

import { AppDispatch, GetState } from '../../store';
import { AppState } from '../../../interfaces';

import { setShowList, setLoadingState } from '../transaction';

import { exportFile } from "../../../components/helpers/exportGeneric";
import procedenciaApi from "../../../api/procedencia";
import { setComboProcedencia, setIdProcedenciaActive, setListProcedencia, setProcedenciaActive } from "./sliceProcedencia";

export const startGetRegProcedencia = () => async( dispatch: AppDispatch, getState: GetState) => {
    try {
        const { procedencia } = getState() as AppState;
        
        dispatch( setLoadingState( true) ) ;
        const regIni = procedencia.page * recordsPerPage;
        
        const dataSend = {
            limite: 0,
            regIni: regIni,
            regFin: recordsPerPage,
            filtroB: procedencia.filterSearch
        }

        const resp = await procedenciaApi.post(`/list`, dataSend);

        dispatch( setListProcedencia( resp.data ) ) ;
        dispatch( setLoadingState( false ) ) ;

    } catch (error) {

        if ( error instanceof AxiosError ) console.error(error.message);
        else console.error(error);

    }
} 

export const exportDataProcedencia = ( setLoadingExport: React.Dispatch<React.SetStateAction<boolean>>) => async(dispatch: AppDispatch, getState: GetState) => {
    try {
        
        const { procedencia } = getState() as AppState;
        
        setLoadingExport( true);

        const regIni = procedencia.page * recordsPerPage;
        
        const dataSend = {
            limite: 1,
            regIni: regIni,
            regFin: recordsPerPage,
            filtroB: procedencia.filterSearch,
            isExport: 1
        }

        const resp = await procedenciaApi.post(`/list`, dataSend);
        
        //setDataExport ( resp.data.rows );
        await exportFile ( 'rptProcedenciaData',  resp.data.rows );
        setLoadingExport( false );

    } catch (error) {

        if ( error instanceof AxiosError ) console.error(error.message);
        else console.error(error);

    }
} 

export const startProcedenciaActive = ( idShow: number ) => async( dispatch: AppDispatch ) => {
    try {
       
        const body = await procedenciaApi.post(`/show`, { idShow });
        
        const { done, rows  } = body.data;

        if( done ){

            dispatch( setProcedenciaActive( rows) );
            dispatch( setIdProcedenciaActive( idShow ) ) ;
            dispatch( setShowList( false ));
            dispatch( setLoadingState( false ) ) ;

        }

    } catch (error) {

        if ( error instanceof AxiosError ) console.error(error.message);
        else console.error(error);

    }
} 

export const startInsertProcedencia = ( data: {}, setLoadingBtn: React.Dispatch<React.SetStateAction<boolean>> ) => async( dispatch: AppDispatch ) => 
{
    try {

        const body = await procedenciaApi.post(`/insertupdate`, data);

        const { done, msg } = body.data;

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

export const startProcedenciaDelete = ( iTipo: number, id_delete: number ) => async( dispatch: AppDispatch ) => 
{
    try {
    
        const body = await procedenciaApi.post(`/delete`, { iTipo, id_delete });
            
        const { done, msg } = body.data;

        if( done ){
            await Swal.fire("¡Correcto!", msg, "success").then( () =>{
                dispatch( startGetRegProcedencia() );
            });
        }else{
            Swal.fire("Error", msg, "error");
        }

    } catch (error) {

        if ( error instanceof AxiosError ) console.error(error.message);
        else console.error(error);

    }
} 

export const startGetComboProcedencia = ( ) => async( dispatch: AppDispatch ) => {
    try {

        const body = await procedenciaApi.post(`/combo`, {} );

        const { done, rows } = body.data;

        if( done ){
            dispatch( setComboProcedencia( rows ) );
        }

    } catch (error) {

        if ( error instanceof AxiosError ) console.error(error.message);
        else console.error(error);

    }
} 

