import React, { FC, useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { setShowList } from '../../store/slices/transaction';
import { OperativosList } from '../../components/catalogos/operativos/OperativosList';
import { OperativosFrm } from '../../components/catalogos/operativos/OperativosFrm';

const Operativos: FC = () : JSX.Element=> {

    const { showList } = useAppSelector((state) => state.transaction);
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch( setShowList(true) );
    }, [ dispatch ]);

    return (
        ( showList ) 
        ? <OperativosList/>
        : <OperativosFrm />
    )
}

export default Operativos;