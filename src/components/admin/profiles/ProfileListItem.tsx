import Swal from 'sweetalert2';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faEye, faBan, faCheckSquare, faTrashAlt } from '@fortawesome/free-solid-svg-icons';

import { useAppDispatch } from '../../../store/hooks';


import { dataItemProfile } from '../../../interfaces';
import { startProfileActive, startProfileDelete } from '../../../store/slices/profiles/thunks';
import { setReadOnly } from '../../../store/slices/profiles';

export const ProfileListItem = ({ item, edit, elim }: dataItemProfile) => {

    const dispatch = useAppDispatch();
    
    const { id_rol, rol, descripcion, activo } = item;

    const handleSetWindow = ( idDelete : number, readOnly = false ) => { 
        dispatch( startProfileActive( idDelete ) );
        dispatch( setReadOnly( readOnly ) );
    }

    let titleba = 'Dar de Alta',
        icoba = faCheckSquare,
        classBa = 'btn btn-outline-secondary btn-sm me-2 mt-1',
        typeBa = 1;

    if( Number(activo) === 1 ){ 
        titleba = 'Dar de Baja';
        icoba = faBan;
        classBa = 'btn btn-outline-secondary btn-sm me-2 mt-1';
        typeBa = 0;
    }

    const handleDeleteReg  = ( idDelete: number, type: number ) => {
        const icon = (type === 2) ? 'warning' : 'info',
              showDelete = (type === 0) ? ' dar de baja' : 
                           (type === 2) ? ' eliminar' : ' dar de alta';

        Swal.fire({
            title: `¿Estás seguro de ${ showDelete } el registro?`,
            text: "",
            icon: icon,
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Aceptar',
            cancelButtonText: 'Cancelar'
        }).then(( result ) => {
            
            if (result.isConfirmed) {
                dispatch( startProfileDelete( type, idDelete ) );
            }
        });
    }

    return (
        <>
        
            <td>{ rol }</td>
            <td>{ descripcion }</td>
            <td>
                { 
                    ( Number(activo) === 1 ) 
                    ? <span className='badge rounded-pill bg-success'>Activo</span>
                    : <span className='badge rounded-pill bg-danger'>Inactivo</span>
                }
            </td>
            <td className="text-center">
                <button 
                    type="button"
                    className="btn btn-outline-secondary btn-sm me-2 mt-1"
                    title="Ver"
                    onClick={ () =>{ handleSetWindow( id_rol, true ) } }    
                >
                    <FontAwesomeIcon icon={ faEye } />
                </button>
                { 
                    ( elim ) &&
                    <button 
                        type="button"
                        className={ classBa }
                        title={ titleba }
                        onClick={ () =>{ handleDeleteReg( id_rol, typeBa )}}
                        >
                        <FontAwesomeIcon icon={ icoba } />
                    </button> 
                }
                { 
                    ( edit ) &&
                    <button 
                        type="button"
                        className="btn btn-outline-secondary btn-sm me-2 mt-1"
                        title="Editar"
                        onClick={ () =>{ handleSetWindow( id_rol, false ) } }
                    >
                        <FontAwesomeIcon icon={ faEdit } />
                    </button>
                }
                { 
                    ( elim ) &&
                    <button 
                        type="button"
                        className="btn btn-outline-danger btn-sm me-2 mt-1"
                        title="Eliminar Registro"
                        onClick={ () =>{ handleDeleteReg( id_rol, 2 )}}
                        >
                        <FontAwesomeIcon icon={ faTrashAlt } />
                    </button>
                }
            </td>
        </>
    )
}
