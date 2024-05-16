const baseUrl = import.meta.env.VITE_APP_API_URL;
const recordsPerPage = import.meta.env.VITE_APP_RECORSPP;

import Swal from "sweetalert2";
import axios, { AxiosError } from 'axios';

import { AppDispatch, GetState } from '../../store';
import { AppState } from '../../../interfaces';

import { setShowList, setLoadingState } from '../transaction';

import { exportFile } from "../../../components/helpers/exportGeneric";
import { setComboDepartamentos, setIdDepartamentosActive, setListDepartamentos, setDepartamentosActive } from "./sliceDepartamentos";
import departamentosApi from "../../../api/departamentos";



export const startGetRegDepartamentos = () => async( dispatch: AppDispatch, getState: GetState) => {
    try {
        const { departamentos } = getState() as AppState;
        
        dispatch( setLoadingState( true) ) ;
        const regIni = departamentos.page * recordsPerPage;
        
        const dataSend = {
            limite: 0,
            regIni: regIni,
            regFin: recordsPerPage,
            filtroB: departamentos.filterSearch
        }

        const resp = await departamentosApi.post(`/list`, dataSend);

        dispatch( setListDepartamentos( resp.data ) ) ;
        dispatch( setLoadingState( false ) ) ;

    } catch (error) {

        if ( error instanceof AxiosError ) console.error(error.message);
        else console.error(error);

    }
} 

export const exportDataDepartamentos = ( setLoadingExport: React.Dispatch<React.SetStateAction<boolean>>) => async(dispatch: AppDispatch, getState: GetState) => {
    try {
        
        const { departamentos } = getState() as AppState;
        
        setLoadingExport( true);

        const regIni = departamentos.page * recordsPerPage;
        
        const dataSend = {
            limite: 1,
            regIni: regIni,
            regFin: recordsPerPage,
            filtroB: departamentos.filterSearch,
            isExport: 1
        }

        const resp = await departamentosApi.post(`/list`, dataSend);
        
        //setDataExport ( resp.data.rows );
        await exportFile ( 'rptDepartamentosData',  resp.data.rows );
        setLoadingExport( false );

    } catch (error) {

        if ( error instanceof AxiosError ) console.error(error.message);
        else console.error(error);

    }
} 

export const startDepartamentosActive = ( idShow: number ) => async( dispatch: AppDispatch ) => {
    try {
       
        const body = await departamentosApi.post(`/show`, { idShow });
        
        const { done, rows  } = body.data;

        if( done ){

            dispatch( setDepartamentosActive( rows) );
            dispatch( setIdDepartamentosActive( idShow ) ) ;
            dispatch( setShowList( false ));
            dispatch( setLoadingState( false ) ) ;

        }

    } catch (error) {

        if ( error instanceof AxiosError ) console.error(error.message);
        else console.error(error);

    }
} 

export const startInsertDepartamentos = ( data: {}, setLoadingBtn: React.Dispatch<React.SetStateAction<boolean>> ) => async( dispatch: AppDispatch ) => 
{
    try {

        const body = await departamentosApi.post(`/insertupdate`, data);

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

export const startDepartamentosDelete = ( iTipo: number, id_delete: number ) => async( dispatch: AppDispatch ) => 
{
    try {
    
        const body = await departamentosApi.post(`/delete`, { iTipo, id_delete });
            
        const { done, msg } = body.data;

        if( done ){
            await Swal.fire("¡Correcto!", msg, "success").then( () =>{
                dispatch( startGetRegDepartamentos() );
            });
        }else{
            Swal.fire("Error", msg, "error");
        }

    } catch (error) {

        if ( error instanceof AxiosError ) console.error(error.message);
        else console.error(error);

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

        if ( error instanceof AxiosError ) console.error(error.message);
        else console.error(error);

    }
} 

