

import Swal from 'sweetalert2';
import { FontAwesomeIcon }  from '@fortawesome/react-fontawesome';
import { faEdit, faBan, faCheckSquare, faTrashAlt, faEye, faCheck, faXmark } from '@fortawesome/free-solid-svg-icons';
import { dataItemServicio } from '../../../interfaces'
import { useAppDispatch } from '../../../store/hooks';
import { useLocation } from 'react-router-dom';
import { usePermission } from '../../../hooks/usePermission';
import { startServiciosActive } from '../../../store/slices/registros';
import { setReadOnly } from '../../../store/slices/transaction';

export const ServiciosListItem = ({ item, edit, elim }: dataItemServicio) => {

    const dispatch = useAppDispatch();
    
    const { pathname } = useLocation();
    const allowed = usePermission( pathname ) ;

    const {
        id_servicio, 
        folio,
        id_status,
        estatus,
        class_name,
        id_zona,
        fecha,
        hora, 
        emergencia,
        departamento, 
        observaciones,
    } = item;

    let zona = (id_zona == 1) ? 'PONIENTE' : 'ORIENTE';


    const handleSetWindow = ( id : number, readOnly = false ) => { 
        dispatch( startServiciosActive( id ) );
        dispatch( setReadOnly( readOnly ) );
    }    

    return (
        <>
            <td scope="row">
                <FontAwesomeIcon
                    icon={ (id_status == 3 ) ? faCheck : faXmark } 
                    title={ estatus }
                    className={ class_name } />
            </td>
            <th><strong>
                    { folio }
                </strong>
            </th>            
            <td>{  `${fecha}  ${hora}` }</td>
            <td>{ zona } </td>
            <td>{ departamento }</td>
            <td>{ emergencia }</td>
            <td width="40%">{ observaciones }</td>
            <td className="text-center">
                <button 
                    type="button"
                    className="btn btn-outline-secondary btn-sm me-2"
                    title="Ver"
                    onClick={ () =>{ handleSetWindow( id_servicio, true ) } }    
                >
                    <FontAwesomeIcon icon={ faEye } />
                </button>
                { 
                    ( edit ) &&
                    <>
                    <button 
                        type="button"
                        className="btn btn-outline-secondary btn-sm me-2"
                        title="Editar"
                        onClick={ () =>{ handleSetWindow( id_servicio, false ) } }
                    >
                        <FontAwesomeIcon icon={ faEdit } />
                    </button>
                    </>
                }                
            </td>
            

        </>
    )

}
