import React, { FC, useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { setShowList } from '../../store/slices/transaction';
import { ProcedenciaList } from '../../components/catalogos/procedencia/ProcedenciaList';
import { ProcedenciaFrm } from '../../components/catalogos/procedencia/ProcedenciaFrm';

const Procedencia: FC = () : JSX.Element=> {

    const { showList } = useAppSelector((state) => state.transaction);
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch( setShowList(true) );
    }, [ dispatch ]);

    return (
        ( showList ) 
        ? <ProcedenciaList/>
        : <ProcedenciaFrm />
    )
}

export default Procedencia;