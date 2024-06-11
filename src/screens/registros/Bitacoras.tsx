

import React, { FC, useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { setShowList } from '../../store/slices/transaction';
import { BitacorasList } from '../../components/registros/bitacoras/BitacorasList';
import { BitacorasFrm } from '../../components/registros/bitacoras/BitacorasFrm';

const Bitacoras: FC = () : JSX.Element => {
    
    const { showList } = useAppSelector((state) => state.transaction);
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch( setShowList( true ));
    
    }, [ dispatch ])
    
    return (
        ( showList ) 
       ? <BitacorasList/>
       : <BitacorasFrm/>
    )
}

export default Bitacoras;
