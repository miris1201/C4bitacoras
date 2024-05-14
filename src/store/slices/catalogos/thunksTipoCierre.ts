const baseUrl = import.meta.env.VITE_APP_API_URL;
const recordsPerPage = import.meta.env.VITE_APP_RECORSPP;

import Swal from "sweetalert2";
import axios, { AxiosError } from 'axios';

import { AppDispatch, GetState } from '../../store';
import { AppState } from '../../../interfaces';

import { setShowList, setLoadingState } from '../transaction';

import { exportFile } from "../../../components/helpers/exportGeneric";
import { setComboTipoCierre, setIdTipoCierreActive, setListTipoCierre, setTipoCierreActive } from "./sliceTipoCierre";
import tipoCierreApi from "../../../api/tipoCierre";


export const startGetRegTipoCierre = () => async( dispatch: AppDispatch, getState: GetState) => {
    try {
        const { tipoCierre } = getState() as AppState;
        
        dispatch( setLoadingState( true) ) ;
        const regIni = tipoCierre.page * recordsPerPage;
        
        const dataSend = {
            limite: 0,
            regIni: regIni,
            regFin: recordsPerPage,
            filtroB: tipoCierre.filterSearch
        }

        const resp = await tipoCierreApi.post(`/list`, dataSend);

        dispatch( setListTipoCierre( resp.data ) ) ;
        dispatch( setLoadingState( false ) ) ;

    } catch (error) {

        if ( error instanceof AxiosError ) console.error(error.message);
        else console.error(error);

    }
} 

export const exportDataTipoCierre = ( setLoadingExport: React.Dispatch<React.SetStateAction<boolean>>) => async(dispatch: AppDispatch, getState: GetState) => {
    try {
        
        const { tipoCierre } = getState() as AppState;
        
        setLoadingExport( true);

        const regIni = tipoCierre.page * recordsPerPage;
        
        const dataSend = {
            limite: 1,
            regIni: regIni,
            regFin: recordsPerPage,
            filtroB: tipoCierre.filterSearch,
            isExport: 1
        }

        const resp = await tipoCierreApi.post(`/list`, dataSend);
        
        //setDataExport ( resp.data.rows );
        await exportFile ( 'rptTipoCierreData',  resp.data.rows );
        setLoadingExport( false );

    } catch (error) {

        if ( error instanceof AxiosError ) console.error(error.message);
        else console.error(error);

    }
} 

export const startTipoCierreActive = ( idShow: number ) => async( dispatch: AppDispatch ) => {
    try {
       
        const body = await tipoCierreApi.post(`/show`, { idShow });
        
        const { done, rows  } = body.data;

        if( done ){

            dispatch( setTipoCierreActive( rows) );
            dispatch( setIdTipoCierreActive( idShow ) ) ;
            dispatch( setShowList( false ));
            dispatch( setLoadingState( false ) ) ;

        }

    } catch (error) {

        if ( error instanceof AxiosError ) console.error(error.message);
        else console.error(error);

    }
} 

export const startInsertTipoCierre = ( data: {}, setLoadingBtn: React.Dispatch<React.SetStateAction<boolean>> ) => async( dispatch: AppDispatch ) => 
{
    try {

        const body = await tipoCierreApi.post(`/insertupdate`, data);

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

export const startTipoCierreDelete = ( iTipo: number, id_delete: number ) => async( dispatch: AppDispatch ) => 
{
    try {
    
        const body = await tipoCierreApi.post(`/delete`, { iTipo, id_delete });
            
        const { done, msg } = body.data;

        if( done ){
            await Swal.fire("¡Correcto!", msg, "success").then( () =>{
                dispatch( startGetRegTipoCierre() );
            });
        }else{
            Swal.fire("Error", msg, "error");
        }

    } catch (error) {

        if ( error instanceof AxiosError ) console.error(error.message);
        else console.error(error);

    }
} 

export const startGetComboTipoCierre = ( ) => async( dispatch: AppDispatch ) => {
    try {

        const body = await tipoCierreApi.post(`/combo`, {} );

        const { done, rows } = body.data;

        if( done ){
            dispatch( setComboTipoCierre( rows ) );
        }

    } catch (error) {

        if ( error instanceof AxiosError ) console.error(error.message);
        else console.error(error);

    }
} 

