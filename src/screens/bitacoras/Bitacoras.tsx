import React, { FC, useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { setShowList } from '../../store/slices/transaction';
import { BitacorasList } from '../../components/bitacoras/BitacorasList';
import { BitacorasFrm } from '../../components/bitacoras/BitacorasFrm';

export const Bitacoras: FC = (): JSX.Element => {
    
    const { showList } = useAppSelector((state) => state.transaction);
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch( setShowList(true) );
        console
    }, [dispatch])
    


    return (
        ( showList )
        ? <BitacorasList/>
        : <BitacorasFrm/>
        
    )
}

export default Bitacoras;
