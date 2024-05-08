import React, { FC, useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { setShowList } from '../../store/slices/transaction';
import { ColoniasList } from '../../components/catalogos/colonias/ColoniasList';
import { ColoniasFrm } from '../../components/catalogos/colonias/ColoniasFrm';

export const Colonias: FC = () : JSX.Element=> {

    const { showList } = useAppSelector((state) => state.transaction);
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch( setShowList(true) );
    }, [ dispatch ]);

    return (
        ( showList ) 
        ? <ColoniasList/>
        : <ColoniasFrm />
    )
}