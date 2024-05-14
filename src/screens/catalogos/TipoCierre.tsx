import React, { FC, useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { setShowList } from '../../store/slices/transaction';
import { TipoCierreList } from '../../components/catalogos/tipo_cierre/TipoCierreList';
import { TipoCierreFrm } from '../../components/catalogos/tipo_cierre/TipoCierreFrm';

const TipoCierre: FC = () : JSX.Element=> {

    const { showList } = useAppSelector((state) => state.transaction);
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch( setShowList(true) );
    }, [ dispatch ]);

    return (
        ( showList ) 
        ? <TipoCierreList/>
        : <TipoCierreFrm />
    )
}

export default TipoCierre;