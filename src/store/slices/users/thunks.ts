const baseUrl = import.meta.env.VITE_APP_API_URL;
const recordsPerPage = import.meta.env.VITE_APP_RECORSPP;

import Swal from "sweetalert2";
import axios, { AxiosError } from 'axios';

import { AppDispatch, GetState } from '../../store';
import { AppState } from '../../../interfaces';
import { setListUser, setUserActive, setDataProfileById, setIdUserActive, setComboProfile, setMyAccount } from './userSlice';
import { setShowList, setLoadingState } from '../transaction';

import { exportFile } from "../../../components/helpers/exportGeneric";
import usersApi from "../../../api/users";
import profilesApi from "../../../api/profiles";
import loginApi from "../../../api/login";

export const startGetRegUsers = () => async( dispatch: AppDispatch, getState: GetState) => {
    try {
        const { users } = getState() as AppState;
        
        dispatch( setLoadingState( true ) ) ;
        const regIni = users.page * recordsPerPage;
        
        const dataSend = {
            limite: 0,
            regIni: regIni,
            regFin: recordsPerPage,
            filtroB: users.filterSearch
        }

        const resp = await usersApi.post(`/list`, dataSend);

        dispatch( setListUser( resp.data ) ) ;
        dispatch( setLoadingState( false ) ) ;

    } catch (error) {

        if ( error instanceof AxiosError ) console.error(error.message);
        else console.error(error);

    }
} 

export const exportDataUsers = ( setLoadingExport: React.Dispatch<React.SetStateAction<boolean>>) => async(dispatch: AppDispatch, getState: GetState) => {
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

        const resp = await usersApi.post(`/list`, dataSend);
        
        await exportFile ( 'rptUserData',  resp.data.rows );
        setLoadingExport( false );

    } catch (error) {

        if ( error instanceof AxiosError ) console.error(error.message);
        else console.error(error);

    }
} 

export const startUserActive = ( idShow: number ) => async( dispatch: AppDispatch ) => {
    try {
       
        const resp = await usersApi.post(`/show`, { idShow });
        
        const { done, rows, menu } = resp.data;

        if( done ){

            dispatch( setUserActive( rows) );
            dispatch( setDataProfileById( menu) );
            dispatch( setIdUserActive( idShow ) ) ;
            dispatch( setShowList( false ));
            dispatch( setLoadingState( false ) ) ;

        }

    } catch (error) {

        if ( error instanceof AxiosError ) console.error(error.message);
        else console.error(error);

    }
} 

export const startGetProfilebyId = ( id_rol: string, setValues:  React.SetStateAction<any>, values: {} ) => async( dispatch: AppDispatch ) => {
    try {
       

        const resp = await loginApi.post(`menu/listGeneric`, { id_rol } );

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

export const startGetComboProfiles = ( ) => async( dispatch: AppDispatch ) => {
    try {

        const resp = await profilesApi.post(`/combo`, {} );

        const { done, rows } = resp.data;

        if( done ){
            dispatch( setComboProfile( rows ) );
        }

    } catch (error) {

        if ( error instanceof AxiosError ) console.error(error.message);
        else console.error(error);

    }
} 

export const startInsertReg = ( dataUser: {}, setLoadingBtn: React.Dispatch<React.SetStateAction<boolean>> ) => async( dispatch: AppDispatch ) => 
{
    try {
    
        const body = await usersApi.post(`/insertupdate`, dataUser);

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

export const startUserDelete = ( iTipo: number, id_delete: number ) => async( dispatch: AppDispatch ) => 
{
    try {
    
        const body = await usersApi.post(`/delete`, { iTipo, id_delete });

        const { done, msg } = body.data;

        if( done ){
            await Swal.fire("¡Correcto!", msg, "success").then( () =>{
                dispatch( startGetRegUsers() );
            });
        }else{
            Swal.fire("Error", msg, "error");
        }

    } catch (error) {

        if ( error instanceof AxiosError ) console.error(error.message);
        else console.error(error);

    }
} 

export const startChangePassword = ( values: {}, setLoadingBtn: React.SetStateAction<any>, setShowModal: React.SetStateAction<any>) => async( dispatch: AppDispatch ) => 
{
    try {
   
        const body = await usersApi.post(`/updatepassword`, values );

        const { done, msg } = body.data;
        
        if( done ){
            await Swal.fire("¡Correcto!", msg, "success").then( () =>{
                setLoadingBtn(true);
                setShowModal(false);
            });
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

export const startInsertSalidas = ( values: {}, setLoadingBtn: React.Dispatch<React.SetStateAction<boolean>> ) => async( dispatch: AppDispatch ) => 
    {
        try {
            
            const body = await usersApi.post(`/sys/account`, values);

    
            const { done, msg, id} = body.data;
    
            if( done ){
                await Swal.fire("¡Correcto!", msg, "success");
                await dispatch( setShowList( true ) );
                await dispatch( setMyAccount(id) );
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
