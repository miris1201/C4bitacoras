const baseUrl = import.meta.env.VITE_APP_API_URL;
const recordsPerPage = import.meta.env.VITE_APP_RECORSPP;

import Swal from "sweetalert2";
import axios, { AxiosError } from 'axios';

import { AppDispatch, GetState } from '../../store';
import { AppState } from '../../../interfaces';

import { setShowList, setLoadingState } from '../transaction';

import { exportFile } from "../../../components/helpers/exportGeneric";

import { setComboEmergencias, setIdEmergenciasActive, setListEmergencias, setEmergenciasActive } from "./sliceEmergencias";
import emergenciasApi from "../../../api/emergencias";

export const startGetRegEmergencias = () => async( dispatch: AppDispatch, getState: GetState) => {
    try {
        const { emergencias } = getState() as AppState;
        
        dispatch( setLoadingState( true) ) ;
        const regIni = emergencias.page * recordsPerPage;
        
        const dataSend = {
            limite: 0,
            regIni: regIni,
            regFin: recordsPerPage,
            filtroB: emergencias.filterSearch
        }

        const resp = await emergenciasApi.post(`/list`, dataSend);

        dispatch( setListEmergencias( resp.data ) ) ;
        dispatch( setLoadingState( false ) ) ;

    } catch (error) {

        if ( error instanceof AxiosError ) console.error(error.message);
        else console.error(error);

    }
} 

export const exportDataEmergencias = ( setLoadingExport: React.Dispatch<React.SetStateAction<boolean>>) => async(dispatch: AppDispatch, getState: GetState) => {
    try {
        
        const { emergencias } = getState() as AppState;
        
        setLoadingExport( true);

        const regIni = emergencias.page * recordsPerPage;
        
        const dataSend = {
            limite: 1,
            regIni: regIni,
            regFin: recordsPerPage,
            filtroB: emergencias.filterSearch,
            isExport: 1
        }

        const resp = await emergenciasApi.post(`/list`, dataSend);
        
        //setDataExport ( resp.data.rows );
        await exportFile ( 'rptEmergenciasData',  resp.data.rows );
        setLoadingExport( false );

    } catch (error) {

        if ( error instanceof AxiosError ) console.error(error.message);
        else console.error(error);

    }
} 

export const startEmergenciasActive = ( idShow: number ) => async( dispatch: AppDispatch ) => {
    try {
       
        const body = await emergenciasApi.post(`/show`, { idShow });
        
        const { done, rows  } = body.data;

        if( done ){

            dispatch( setEmergenciasActive( rows) );
            dispatch( setIdEmergenciasActive( idShow ) ) ;
            dispatch( setShowList( false ));
            dispatch( setLoadingState( false ) ) ;

        }

    } catch (error) {

        if ( error instanceof AxiosError ) console.error(error.message);
        else console.error(error);

    }
} 

export const startInsertEmergencias = ( data: {}, setLoadingBtn: React.Dispatch<React.SetStateAction<boolean>> ) => async( dispatch: AppDispatch ) => 
{
    try {

        const body = await emergenciasApi.post(`/insertupdate`, data);

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

export const startEmergenciasDelete = ( iTipo: number, id_delete: number ) => async( dispatch: AppDispatch ) => 
{
    try {
    
        const body = await emergenciasApi.post(`/delete`, { iTipo, id_delete });
            
        const { done, msg } = body.data;

        if( done ){
            await Swal.fire("¡Correcto!", msg, "success").then( () =>{
                dispatch( startGetRegEmergencias() );
            });
        }else{
            Swal.fire("Error", msg, "error");
        }

    } catch (error) {

        if ( error instanceof AxiosError ) console.error(error.message);
        else console.error(error);

    }
} 

export const startGetComboEmergencias = ( ) => async( dispatch: AppDispatch ) => {
    try {

        const body = await emergenciasApi.post(`/combo`, {} );

        const { done, rows } = body.data;

        if( done ){
            dispatch( setComboEmergencias( rows ) );
        }

    } catch (error) {

        if ( error instanceof AxiosError ) console.error(error.message);
        else console.error(error);

    }
} 

