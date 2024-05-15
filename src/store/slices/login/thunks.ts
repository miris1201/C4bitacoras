const baseUrl = import.meta.env.VITE_APP_API_URL;

import axios, { AxiosError } from 'axios';
import Swal from 'sweetalert2';

import { userLoginData } from '../../../interfaces';
import { AppDispatch } from '../../store';
import { setDataName, setDataSystemOptions, setDataUid, setDataUserMenu, setLoadingState } from './loginSlice';

export const startLogin = ( data: userLoginData ) => async( dispatch: AppDispatch ) => {
    try {

        dispatch( setLoadingState( true ) );

        const resp = await axios.post(`${ baseUrl }/acceso`, data);
        const { done, msg, token, menu, uid, name, systemOptions } = resp.data;


        if( done ){

            localStorage.setItem('token', token);            
            dispatch( setDataUserMenu( menu ) );
            dispatch( setDataUid( uid ) );
            dispatch( setDataName( name ) );
            dispatch( setDataSystemOptions( systemOptions));

        }else{
            localStorage.setItem('token', '');
            dispatch( setDataUid( null ) );
            Swal.fire("Error", msg, "error");

        }

        dispatch( setLoadingState( false ) );

    } catch (error) {

        if ( error instanceof AxiosError ) console.error(error.message);
        else console.error(error);

    }
}

export const startCheking = ( ) => async( dispatch: AppDispatch ) => {
    try {
        dispatch( setLoadingState( true ) );
        const token = localStorage.getItem('token') || '';
        
        const resp = await axios.post(`${ baseUrl }/token`, { 'x-token' : token },
            { 
                headers: 
                {
                    'Authorization': `Bearer ${token}` 
                } 
            } 
        );
        const { done, menu, uid, name, systemOptions } = resp.data;

        if( done ){
         
            dispatch( setDataUserMenu( menu ) );
            dispatch( setDataUid( uid ) );
            dispatch( setDataName( name ) );
            dispatch( setDataSystemOptions( systemOptions) );

        }else{
            
            localStorage.setItem('token', '');
            dispatch( setDataUid( null ) );
            dispatch( setDataName( name ) );

        }

        dispatch( setLoadingState( false ) );

    } catch (error) {

        if ( error instanceof AxiosError ) console.error(error.message);
        else console.error(error);

    }
}