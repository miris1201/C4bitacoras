const baseUrl = import.meta.env.VITE_APP_API_URL;
const recordsPerPage = import.meta.env.VITE_APP_RECORSPP;

import Swal from "sweetalert2";
import axios, { AxiosError } from 'axios';

import { AppDispatch, GetState } from '../../store';
import { AppState } from '../../../interfaces';

import { setShowList, setLoadingState } from '../transaction';

import { exportFile } from "../../../components/helpers/exportGeneric";
import { setComboTipoEmergencia, setIdTipoEmergenciaActive, setListTipoEmergencia, setTipoEmergenciaActive } from "./sliceTipoEmergencia";
import tipoEmergenciaApi from "../../../api/tipoEmergencia";

export const startGetRegTipoEmergencia = () => async( dispatch: AppDispatch, getState: GetState) => {
    try {
        const { tipoEmergencia } = getState() as AppState;
        
        dispatch( setLoadingState( true) ) ;
        const regIni = tipoEmergencia.page * recordsPerPage;
        
        const dataSend = {
            limite: 0,
            regIni: regIni,
            regFin: recordsPerPage,
            filtroB: tipoEmergencia.filterSearch
        }

        const resp = await tipoEmergenciaApi.post(`/list`, dataSend);

        dispatch( setListTipoEmergencia( resp.data ) ) ;
        dispatch( setLoadingState( false ) ) ;

    } catch (error) {

        if ( error instanceof AxiosError ) console.error(error.message);
        else console.error(error);

    }
} 

export const exportDataTipoEmergencia = ( setLoadingExport: React.Dispatch<React.SetStateAction<boolean>>) => async(dispatch: AppDispatch, getState: GetState) => {
    try {
        
        const { tipoEmergencia } = getState() as AppState;
        
        setLoadingExport( true);

        const regIni = tipoEmergencia.page * recordsPerPage;
        
        const dataSend = {
            limite: 1,
            regIni: regIni,
            regFin: recordsPerPage,
            filtroB: tipoEmergencia.filterSearch,
            isExport: 1
        }

        const resp = await tipoEmergenciaApi.post(`/list`, dataSend);
        
        //setDataExport ( resp.data.rows );
        await exportFile ( 'rptTipoEmergenciaData',  resp.data.rows );
        setLoadingExport( false );

    } catch (error) {

        if ( error instanceof AxiosError ) console.error(error.message);
        else console.error(error);

    }
} 

export const startTipoEmergenciaActive = ( idShow: number ) => async( dispatch: AppDispatch ) => {
    try {
       
        const body = await tipoEmergenciaApi.post(`/show`, { idShow });
        
        const { done, rows  } = body.data;

        if( done ){

            dispatch( setTipoEmergenciaActive( rows) );
            dispatch( setIdTipoEmergenciaActive( idShow ) ) ;
            dispatch( setShowList( false ));
            dispatch( setLoadingState( false ) ) ;

        }

    } catch (error) {

        if ( error instanceof AxiosError ) console.error(error.message);
        else console.error(error);

    }
} 

export const startInsertTipoEmergencia = ( data: {}, setLoadingBtn: React.Dispatch<React.SetStateAction<boolean>> ) => async( dispatch: AppDispatch ) => 
{
    try {

        const body = await tipoEmergenciaApi.post(`/insertupdate`, data);

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

export const startTipoEmergenciaDelete = ( iTipo: number, id_delete: number ) => async( dispatch: AppDispatch ) => 
{
    try {
    
        const body = await tipoEmergenciaApi.post(`/delete`, { iTipo, id_delete });
            
        const { done, msg } = body.data;

        if( done ){
            await Swal.fire("¡Correcto!", msg, "success").then( () =>{
                dispatch( startGetRegTipoEmergencia() );
            });
        }else{
            Swal.fire("Error", msg, "error");
        }

    } catch (error) {

        if ( error instanceof AxiosError ) console.error(error.message);
        else console.error(error);

    }
} 

export const startGetComboTipoEmergencia = ( ) => async( dispatch: AppDispatch ) => {
    try {

        const body = await tipoEmergenciaApi.post(`/combo`, {} );

        const { done, rows } = body.data;

        if( done ){
            dispatch( setComboTipoEmergencia( rows ) );
        }

    } catch (error) {

        if ( error instanceof AxiosError ) console.error(error.message);
        else console.error(error);

    }
} 

