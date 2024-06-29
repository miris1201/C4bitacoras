

import { FC, useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { setShowList } from '../../store/slices/transaction';
import { ServiciosList } from '../../components/registros/servicios/ServiciosList';
import { ServiciosFrm } from '../../components/registros/servicios/ServiciosFrm';

const Servicios: FC = () : JSX.Element => {
    
    const { showList } = useAppSelector((state) => state.transaction);
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch( setShowList( true ));
    
    }, [ dispatch ])
    
    return (
        ( showList ) 
       ? <ServiciosList/>
       : <ServiciosFrm/>
    )
}

export default Servicios;
