import React, { FC, useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { setShowList } from '../../store/slices/transaction';
import { TipoEmergenciaFrm } from '../../components/catalogos/tipo_emergencia/TipoEmergenciaFrm';
import { TipoEmergenciaList } from '../../components/catalogos/tipo_emergencia/TipoEmergenciaList';

const TipoEmergencia: FC = () : JSX.Element=> {

    const { showList } = useAppSelector((state) => state.transaction);
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch( setShowList(true) );
    }, [ dispatch ]);

    return (
        ( showList ) 
        ? <TipoEmergenciaList/>
        : <TipoEmergenciaFrm />
    )
}

export default TipoEmergencia;