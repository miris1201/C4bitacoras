const baseUrl = import.meta.env.VITE_APP_API_URL;
const recordsPerPage = import.meta.env.VITE_APP_RECORSPP;

import Swal from "sweetalert2";
import axios, { AxiosError } from 'axios';

import { AppDispatch, GetState } from '../../store';
import { AppState } from '../../../interfaces';
import { setShowList, setLoadingState } from '../transaction';

import { exportFile } from "../../../components/helpers/exportGeneric";

import bitacorasApi from "../../../api/bitacoras";
import departamentosApi from "../../../api/departamentos";
import { setListBitacoras } from "./bitacorasSlice";
import { setComboDepartamentos, setComboZona } from "../catalogos";
import cuadrantesApi from "../../../api/cuadrantes";

export const startRegBitacoras = ( id_zona: number ) => async( dispatch: AppDispatch, getState: GetState) => {
    try {
        const { bitacoras } = getState() as AppState;
        
        dispatch( setLoadingState( true ) ) ;
        const regIni = bitacoras.page * recordsPerPage;
        
        const dataSend = {
            limite: 0,
            regIni: regIni,
            regFin: recordsPerPage,
            filtroB: bitacoras.filterSearch,
            id_zona: id_zona

        }

        console.log(id_zona);

        const resp = await bitacorasApi.post(`/list`, dataSend);

        dispatch( setListBitacoras( resp.data ) ) ;
        dispatch( setLoadingState( false ) ) ;

    } catch (error) {

        if ( error instanceof AxiosError ) console.error(error.message);
        else console.error(error);

    }
} 

export const exportDataBitacoras = ( setLoadingExport: React.Dispatch<React.SetStateAction<boolean>>) => async(dispatch: AppDispatch, getState: GetState) => {
    try {
        
        const { bitacoras } = getState() as AppState;
        
        setLoadingExport( true);

        const regIni = bitacoras.page * recordsPerPage;
        
        const dataSend = {
            limite: 1,
            regIni: regIni,
            regFin: recordsPerPage,
            filtroB: bitacoras.filterSearch,
            isExport: 1,
        }

        const resp = await bitacorasApi.post(`/list`, dataSend);
        
        await exportFile ( 'rptUserBitacoras',  resp.data.rows );
        setLoadingExport( false );

    } catch (error) {

        if ( error instanceof AxiosError ) console.error(error.message);
        else console.error(error);

    }
} 

export const startGetComboDepartamentos = ( ) => async( dispatch: AppDispatch ) => {
    try {

        const resp = await departamentosApi.post(`/combo`, {} );

        const { done, rows } = resp.data;

        if( done ){
            dispatch( setComboDepartamentos( rows ) );
        }

    } catch (error) {

        if ( error instanceof AxiosError ) console.error(error.message);
        else console.error(error);

    }
} 


export const startGetComboZona = ( ) => async( dispatch: AppDispatch ) => {
    try {

        const resp = await cuadrantesApi.post(`/combo`, {} );

        const { done, rows } = resp.data;

        if( done ){
            dispatch( setComboZona( rows ) );
        }

    } catch (error) {

        if ( error instanceof AxiosError ) console.error(error.message);
        else console.error(error);

    }
} 

export const startInsertBitacoras = ( dataBitacoras: {}, setLoadingBtn: React.Dispatch<React.SetStateAction<boolean>> ) => async( dispatch: AppDispatch ) => 
{
    try {
    
        const body = await bitacorasApi.post(`/insertupdate`, dataBitacoras);

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
