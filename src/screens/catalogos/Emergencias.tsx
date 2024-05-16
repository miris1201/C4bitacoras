import React, { FC, useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { setShowList } from '../../store/slices/transaction';
import { EmergenciasList } from '../../components/catalogos/emergencias/EmergenciasList';
import { EmergenciasFrm } from '../../components/catalogos/emergencias/EmergenciasFrm';


const Emergencias: FC = () : JSX.Element=> {

    const { showList } = useAppSelector((state) => state.transaction);
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch( setShowList(true) );
    }, [ dispatch ]);

    return (
        ( showList ) 
        ? <EmergenciasList/>
        : <EmergenciasFrm />
    )
}

export default Emergencias;