const baseUrl = import.meta.env.VITE_APP_API_URL;
const recordsPerPage = import.meta.env.VITE_APP_RECORSPP;

import Swal from "sweetalert2";
import axios, { AxiosError } from 'axios';

import { AppDispatch, GetState } from '../../store';
import { AppState } from '../../../interfaces';

import { setShowList, setLoadingState } from '../transaction';

import { exportFile } from "../../../components/helpers/exportGeneric";
import cuadrantesApi from "../../../api/cuadrantes";
import { setComboCuadrantes, setComboSector, setComboZona, setCuadranteActive, setIdCuadranteActive, setListCuadrantes } from "./sliceCuadrantes";

export const startGetCuadrantes = () => async( dispatch: AppDispatch, getState: GetState) => {
    try {
        const { cuadrantes } = getState() as AppState;
        
        dispatch( setLoadingState( true) ) ;
        const regIni = cuadrantes.page * recordsPerPage;
        
        const dataSend = {
            limite: 0,
            regIni: regIni,
            regFin: recordsPerPage,
            filtroB: cuadrantes.filterSearch
        }

        const resp = await cuadrantesApi.post(`/list`, dataSend);

        dispatch( setListCuadrantes( resp.data ) ) ;
        dispatch( setLoadingState( false ) ) ;

    } catch (error) {

        if ( error instanceof AxiosError ) console.error(error.message);
        else console.error(error);

    }
} 

export const exportDataCuadrantes = ( setLoadingExport: React.Dispatch<React.SetStateAction<boolean>>) => async(dispatch: AppDispatch, getState: GetState) => {
    try {
        
        const { cuadrantes } = getState() as AppState;
        
        setLoadingExport( true);

        const regIni = cuadrantes.page * recordsPerPage;
        
        const dataSend = {
            limite: 1,
            regIni: regIni,
            regFin: recordsPerPage,
            filtroB: cuadrantes.filterSearch,
            isExport: 1
        }

        const resp = await cuadrantesApi.post(`/list`, dataSend);
        
        //setDataExport ( resp.data.rows );
        await exportFile ( 'rptCuadrantesData',  resp.data.rows );
        setLoadingExport( false );

    } catch (error) {

        if ( error instanceof AxiosError ) console.error(error.message);
        else console.error(error);

    }
} 

export const startCuadrantesActive = ( idShow: number ) => async( dispatch: AppDispatch ) => {
    try {
       
        const body = await cuadrantesApi.post(`/show`, { idShow });
        
        const { done, rows  } = body.data;

        if( done ){

            dispatch( setCuadranteActive( rows) );
            dispatch( setIdCuadranteActive( idShow ) ) ;
            dispatch( setShowList( false ));
            dispatch( setLoadingState( false ) ) ;

        }

    } catch (error) {

        if ( error instanceof AxiosError ) console.error(error.message);
        else console.error(error);

    }
} 

export const startInsertCuadrante = ( data: {}, setLoadingBtn: React.Dispatch<React.SetStateAction<boolean>> ) => async( dispatch: AppDispatch ) => 
{
    try {

        const body = await cuadrantesApi.post(`/insertupdate`, data);

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

export const startCuadranteDelete = ( iTipo: number, id_delete: number ) => async( dispatch: AppDispatch ) => 
{
    try {
    
        const body = await cuadrantesApi.post(`/delete`, { iTipo, id_delete });
            
        const { done, msg } = body.data;

        if( done ){
            await Swal.fire("¡Correcto!", msg, "success").then( () =>{
                dispatch( startGetCuadrantes() );
            });
        }else{
            Swal.fire("Error", msg, "error");
        }

    } catch (error) {

        if ( error instanceof AxiosError ) console.error(error.message);
        else console.error(error);

    }
} 

export const startComboCuadrantes = ( sector : number ) => async( dispatch: AppDispatch ) => {
    try {

        const body = await cuadrantesApi.post(`/combo`, { sector } );

        const { done, rows } = body.data;

        if( done ){
            dispatch( setComboCuadrantes( rows ) );
        }

    } catch (error) {

        if ( error instanceof AxiosError ) console.error(error.message);
        else console.error(error);

    }
} 

export const startGetComboSector = ( id_zona: number ) => async( dispatch: AppDispatch ) => {
    try {
        const body = await cuadrantesApi.post(`/comboSector`, { id_zona } );

        const { done, rows } = body.data;

        if( done ){
            dispatch( setComboSector( rows ) );
        }

    } catch (error) {

        if ( error instanceof AxiosError ) console.error(error.message);
        else console.error(error);

    }
} 

export const startGetComboZona = ( ) => async( dispatch: AppDispatch ) => {
    try {


        const body = await cuadrantesApi.post(`/comboZona`, { } );

        const { done, rows } = body.data;

        if( done ){
            dispatch( setComboZona( rows ) );
        }

    } catch (error) {

        if ( error instanceof AxiosError ) console.error(error.message);
        else console.error(error);

    }
}

