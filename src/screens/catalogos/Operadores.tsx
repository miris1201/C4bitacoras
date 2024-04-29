import React, { FC, useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { setShowList } from '../../store/slices/transaction';
import { OperadoresList } from '../../components/catalogos/operadores/OperadoresList';
import { OperadoresFrm } from '../../components/catalogos/operadores/OperadoresFrm';

const Operadores: FC = () : JSX.Element=> {

    const { showList } = useAppSelector((state) => state.transaction);
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch( setShowList(true) );
    }, [ dispatch ]);

    return (
        ( showList ) 
        ? <OperadoresList/>
        : <OperadoresFrm />
    )
}

export default Operadores;