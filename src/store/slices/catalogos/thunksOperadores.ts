const baseUrl = import.meta.env.VITE_APP_API_URL;
const recordsPerPage = import.meta.env.VITE_APP_RECORSPP;

import Swal from "sweetalert2";
import axios, { AxiosError } from 'axios';

import { AppDispatch, GetState } from '../../store';
import { AppState } from '../../../interfaces';

import { setListOperadores, setOperadorActive, setIdOperadorActive } from './sliceOperadores';
import { setShowList, setLoadingState } from '../transaction';

import { exportFile } from "../../../components/helpers/exportGeneric";

export const startGetRegOperadores = () => async( dispatch: AppDispatch, getState: GetState) => {
    try {
        const { operadores } = getState() as AppState;
        
        dispatch( setLoadingState( true) ) ;
        const regIni = operadores.page * recordsPerPage;
        
        const dataSend = {
            limite: 0,
            regIni: regIni,
            regFin: recordsPerPage,
            filtroB: operadores.filterSearch
        }

        const token = localStorage.getItem('token') || '';

        const resp = await axios.post(`${ baseUrl }/catalogos/operadores/list`, dataSend, 
            { headers: 
                {
                    'Authorization': `Bearer ${token}` 
                } 
            } 
        );

        dispatch( setListOperadores( resp.data ) ) ;
        dispatch( setLoadingState( false ) ) ;

    } catch (error) {

        if ( error instanceof AxiosError ) console.error(error.message);
        else console.error(error);

    }
} 

export const exportDataOperadores = ( setLoadingExport: React.Dispatch<React.SetStateAction<boolean>>) => async(dispatch: AppDispatch, getState: GetState) => {
    try {
        
        const { users } = getState() as AppState;
        
        setLoadingExport( true);

        const regIni = users.page * recordsPerPage;
        
        const dataSend = {
            limite: 1,
            regIni: regIni,
            regFin: recordsPerPage,
            filtroB: users.filterSearch,
            isExport: 1
        }

        
        const token = localStorage.getItem('token') || '';

        const resp = await axios.post(`${ baseUrl }/catalogos/operadores/list`, dataSend,
            { 
                headers: 
                {
                    'Authorization': `Bearer ${token}` 
                } 
            } 
        );
        
        //setDataExport ( resp.data.rows );
        await exportFile ( 'rptOperadorData',  resp.data.rows );
        setLoadingExport( false );

    } catch (error) {

        if ( error instanceof AxiosError ) console.error(error.message);
        else console.error(error);

    }
} 

export const startOperadorActive = ( idShow: number ) => async( dispatch: AppDispatch ) => {
    try {
       
        const token = localStorage.getItem('token') || '';
        
        const resp = await axios.post(`${ baseUrl }/catalogos/operadores/show`, { idShow },
            { 
                headers: 
                {
                    'Authorization': `Bearer ${token}` 
                } 
            } 
        );
        
        const { done, rows } = resp.data;

        if( done ){

            dispatch( setOperadorActive( rows) );
            dispatch( setIdOperadorActive( idShow ) ) ;
            dispatch( setShowList( false ));
            dispatch( setLoadingState( false ) ) ;

        }

    } catch (error) {

        if ( error instanceof AxiosError ) console.error(error.message);
        else console.error(error);

    }
} 

export const startInsertReg = ( data: {}, setLoadingBtn: React.Dispatch<React.SetStateAction<boolean>> ) => async( dispatch: AppDispatch ) => 
{
    try {

        const token = localStorage.getItem('token') || '';
    
        const body = await axios.post(`${ baseUrl }/catalogos/operadores/insertupdate`, data,
            { 
                headers: 
                {
                    'Authorization': `Bearer ${token}` 
                } 
            } 
        );

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

export const startRegDelete = ( iTipo: number, id_delete: number ) => async( dispatch: AppDispatch ) => 
{
    try {
    
        const token = localStorage.getItem('token') || '';

        const body = await axios.post(`${ baseUrl }/catalogos/operadores/delete`, { iTipo, id_delete },
            { 
                headers: 
                {
                    'Authorization': `Bearer ${token}` 
                } 
            } 
        );

        const { done, msg } = body.data;

        if( done ){
            await Swal.fire("¡Correcto!", msg, "success").then( () =>{
                dispatch( startGetRegOperadores() );
            });
        }else{
            Swal.fire("Error", msg, "error");
        }

    } catch (error) {

        if ( error instanceof AxiosError ) console.error(error.message);
        else console.error(error);

    }
} 

