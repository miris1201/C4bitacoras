import React, { FC, useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { usePermission } from '../../../hooks/usePermission';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { startGetRegColonias } from '../../../store/slices/catalogos';
import { Loading, NoAccess } from '../../ui/UserInterface';

export const ColoniasList: FC = (): JSX.Element => {

    const { pathname } = useLocation();
    const allowed = usePermission( pathname ) ;

    const { list, page, totalRows, totalPages, filterSearch } = useAppSelector( state => state.colonias);
    const { loading } = useAppSelector(state => state.transaction);

    const [loadingExport, setLoadingExport] = useState(false);
    const [ showModalFilter, setShowModalFilter ] = useState(false);

    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch( startGetRegColonias() );
    
      
    }, [dispatch, page, filterSearch]);

    if( loading ){
      return( <Loading/> );
    }
  
  if(allowed.length === 0){
      return( <NoAccess/> );
  }
    






}
