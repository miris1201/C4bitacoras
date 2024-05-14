import React, { FC, useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { setShowList } from '../../store/slices/transaction';
import { DepartamentosList } from '../../components/catalogos/departamentos/DepartamentoList';
import { DepartamentosFrm } from '../../components/catalogos/departamentos/DepartamentosFrm';

const Departamentos: FC = () : JSX.Element=> {

    const { showList } = useAppSelector((state) => state.transaction);
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch( setShowList(true) );
    }, [ dispatch ]);

    return (
        ( showList ) 
        ? <DepartamentosList/>
        : <DepartamentosFrm />
    )
}

export default Departamentos;