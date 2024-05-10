import React, { FC, useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { setShowList } from '../../store/slices/transaction';
import { CuadrantesList } from '../../components/catalogos/cuadrantes/CuadrantesList';
import { CuadrantesFrm } from '../../components/catalogos/cuadrantes/CuadrantesFrm';


const Cuadrantes: FC = () : JSX.Element=> {

    const { showList } = useAppSelector((state) => state.transaction);
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch( setShowList(true) );
    }, [ dispatch ]);

    return (
        ( showList ) 
        ? <CuadrantesList/>
        : <CuadrantesFrm />
    )
}

export default Cuadrantes;