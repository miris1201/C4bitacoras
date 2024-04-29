const baseUrl = import.meta.env.VITE_APP_API_URL;
const recordsPerPage = import.meta.env.VITE_APP_RECORSPP;

import Swal from "sweetalert2";
import axios, { AxiosError } from 'axios';

import { AppState } from '../../../interfaces';

import { AppDispatch, GetState } from '../../store';
import { setDataProfileById, setIdProfileActive, setList, setLoadingState, setProfileActive } from './profileSlice';
import { setShowList } from '../transaction';
import { startGetComboProfiles } from "../users/thunks";

import { exportFile } from "../../../components/helpers/exportGeneric";
import profilesApi from "../../../api/profiles";
import loginApi from "../../../api/login";

export const startGetRegProfiles = () => async( dispatch: AppDispatch, getState: GetState) => {
    try {
        const { profiles } = getState() as AppState;
        
        dispatch( setLoadingState( true) ) ;
        const regIni = profiles.page * recordsPerPage;
        
        const dataSend = {
            limite: 0,
            regIni: regIni,
            regFin: recordsPerPage,
            filtroB: profiles.filterSearch
        }

        const resp = await profilesApi.post(`/list`, dataSend);

        dispatch( setList ( resp.data ) ) ;
        dispatch( setLoadingState( false ) ) ;

    } catch (error) {

        if ( error instanceof AxiosError ) console.error(error.message);
        else console.error(error);

    }
} 

export const startProfileActive = ( idShow: number ) => async( dispatch: AppDispatch ) => {
    try {

        const resp = await profilesApi.post(`/show`, { idShow } );
        
        const { done, rows, menu } = resp.data;

        if( done ){

            dispatch( setProfileActive( rows) );
            dispatch( setDataProfileById( menu) );
            dispatch( setIdProfileActive( idShow ) ) ;
            dispatch( setShowList( false ));
            dispatch( setLoadingState( false ) ) ;

        }

    } catch (error) {

        if ( error instanceof AxiosError ) console.error(error.message);
        else console.error(error);

    }
} 

export const startGetMenu = ( setValues: React.Dispatch<React.SetStateAction<any>>, values: {} ) => async( dispatch: AppDispatch ) => {
    try {

        const resp = await loginApi.post(`/menu/listGeneric`, { 'id_rol' : 0 } );
        
        const { done, menu, msg } = resp.data;

        if( done ){
            setValues({
                ...values,
                menu: menu
            });

        } else {
            Swal.fire("Error", msg, "error");
        }

    } catch (error) {

        if ( error instanceof AxiosError ) console.error(error.message);
        else console.error(error);

    }
} 



export const startGetProfilebyId = ( id_rol: string, setValues:  React.SetStateAction<any>, values: {} ) => async( dispatch: AppDispatch ) => {
    try {
       
        const resp = await loginApi.post(`/menu/listGeneric`, { id_rol });

        const { done, menu } = resp.data;

        if( done ){
            dispatch( setDataProfileById( menu) );
            setValues({
                ...values,
                menu: menu
            });
        }

    } catch (error) {

        if ( error instanceof AxiosError ) console.error(error.message);
        else console.error(error);

    }
} 

export const startInsertReg = ( dataUser: {}, setLoadingBtn: React.Dispatch<React.SetStateAction<boolean>> ) => async( dispatch: AppDispatch ) => 
{
    try {

        const body = await profilesApi.post(`/insertupdate`, dataUser );

        const { done, msg } = body.data;

        if( done ){
            await Swal.fire("¡Correcto!", msg, "success");
            dispatch( setShowList( true ) );
            dispatch( startGetComboProfiles() );
        }else{
            Swal.fire("Error", msg, "error");
        }

        setLoadingBtn( false );
        

    } catch (error) {

        if ( error instanceof AxiosError ) console.error(error.message);
        else console.error(error);

    }
} 

export const exportDataProfiles = ( setLoadingExport: React.Dispatch<React.SetStateAction<boolean>>) => async(dispatch: AppDispatch, getState: GetState) => {
    try {
        
        setLoadingExport( true);
        
        const dataSend = {
            limite: 1,
            regIni: 0,
            regFin: 10,
            filtroB: null,
            isExport: 1
        }
    
        const resp = await profilesApi.post(`/list`, dataSend);
        
        //setDataExport ( resp.data.rows );
        await exportFile ( 'rptProfileData',  resp.data.rows );
        setLoadingExport( false );

    } catch (error) {

        if ( error instanceof AxiosError ) console.error(error.message);
        else console.error(error);

    }
} 

export const startProfileDelete = ( iTipo: number, id_delete: number ) => async( dispatch: AppDispatch ) => 
{
    try {

        const body = await profilesApi.post(`/delete`, { iTipo, id_delete });
        
        const { done, msg } = body.data;

        if( done ){
            await Swal.fire("¡Correcto!", msg, "success").then( () =>{
                dispatch( startGetRegProfiles() );
            });
        }else{
            Swal.fire("Error", msg, "error");
        }

    } catch (error) {

        if ( error instanceof AxiosError ) console.error(error.message);
        else console.error(error);

    }
} 
