

import Swal from 'sweetalert2';
import { FontAwesomeIcon }  from '@fortawesome/react-fontawesome';
import { faEdit, faBan, faCheckSquare, faTrashAlt, faEye, faCheck, faXmark, faPersonMilitaryPointing, faCircleInfo, faRightLeft, faNoteSticky } from '@fortawesome/free-solid-svg-icons';
import { dataItemServicio } from '../../../interfaces'
import { useAppDispatch } from '../../../store/hooks';
import { useLocation } from 'react-router-dom';
import { usePermission } from '../../../hooks/usePermission';
import { startServiciosActive, unSetActiveServicios } from '../../../store/slices/registros';
import { setReadOnly, setShowList } from '../../../store/slices/transaction';
import { useState } from 'react';
import { NotasModal } from './NotasModal';

export const ServiciosListItem = ({ item, edit, elim, index }: dataItemServicio) => {

    const dispatch = useAppDispatch();
    
    const { pathname } = useLocation();
    const allowed = usePermission( pathname ) ;

    
    const [ showModalNotas, setShowModalNotas ] = useState(false);

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

    const setChangeWindow = ( ) => {
        
        dispatch( unSetActiveServicios() );
        dispatch( setShowList( false ) );
        dispatch( setReadOnly( false ) );
    }


    let iconStatus = faPersonMilitaryPointing,
        titleIcon = "Asignar servicio",
        classIcon = "btn btn-outline-danger btn-sm me-2";

     if(id_status == 2) {
        iconStatus = faRightLeft;
        titleIcon  = "Responder servicio"
        classIcon  = "btn btn-outline-warning btn-sm me-2";
    } else if(id_status == 3) {
        iconStatus = faCircleInfo;
        classIcon = "btn btn-outline-success btn-sm me-2";
        titleIcon  = "Historial del servicio"
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
            <td width="35%">{ observaciones }</td>
            <td width="8%" className="text-center">
                <button 
                    type="button"
                    className={classIcon}
                    title={ titleIcon }
                    onClick={ () => {  handleSetWindow( id_servicio, true )  } }
                >
                    <FontAwesomeIcon icon={ iconStatus  } />
                </button>
                { 
                    ( id_status == 3 ) &&
                    <>
                    <button 
                        type="button"
                        className="btn btn-outline-info btn-sm me-2"
                        title="Notas"
                        onClick={() => {
                            setShowModalNotas( true );
                        }}
                    >
                        <FontAwesomeIcon icon={ faNoteSticky } />
                    </button>
                    </>
                }                
            </td>
            {
                (showModalNotas) &&
                <NotasModal
                    showModal={ showModalNotas }
                    setShowModal={ setShowModalNotas }
                />
            }
        </>
    )

}
