import { useState } from 'react';

import Swal from 'sweetalert2';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faEye, faBan, faCheckSquare, faTrashAlt, faKey } from '@fortawesome/free-solid-svg-icons';

import { useAppDispatch } from '../../../store/hooks';

import { startUserActive, startUserDelete } from '../../../store/slices/users/thunks';
import { setReadOnly } from '../../../store/slices/transaction';
import { dataItem } from '../../../interfaces';

import { UserChangePassword } from './UserChangePassword';

export const UserListItem = ({ item, edit, elim }: dataItem) => {

    const dispatch = useAppDispatch();
    
    const [ showModalChangePass, setShowModalChangePass ] = useState(false);
    const { id_usuario, usuario, nombre, correo, activo } = item;

    const handleSetWindow = ( id : number, readOnly = false ) => { 
        dispatch( startUserActive( id ) );
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

    const handleDeleteReg  = ( id: number, type: number ) => {
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
                dispatch( startUserDelete( type, id ) );
            }
        });
    }

    return (
        <>
            <th scope="row">
                <strong>
                    { id_usuario }
                </strong>
            </th>
            <td>{ usuario }</td>
            <td>{ nombre }</td>
            <td>{ correo }</td>
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
                    onClick={ () =>{ handleSetWindow( id_usuario, true ) } }    
                >
                    <FontAwesomeIcon icon={ faEye } />
                </button>
                { 
                    ( elim ) &&
                    <button 
                        type="button"
                        className={ classBa }
                        title={ titleba }
                        onClick={ () =>{ handleDeleteReg( id_usuario, typeBa )}}
                        >
                        <FontAwesomeIcon icon={ icoba } />
                    </button> 
                }
                { 
                    ( edit ) &&
                    <>
                    <button 
                        type="button"
                        className="btn btn-outline-secondary btn-sm me-2 mt-1"
                        title="Editar"
                        onClick={ () =>{ handleSetWindow( id_usuario, false ) } }
                    >
                        <FontAwesomeIcon icon={ faEdit } />
                    </button>
                    <button 
                        type="button"
                        className="btn btn-outline-warning btn-sm me-2 mt-1"
                        title="Cambiar Password"
                        onClick={ () =>{ setShowModalChangePass( true ) } }
                    >
                        <FontAwesomeIcon icon={ faKey } />
                    </button>
                    </>
                }
                { 
                    ( elim ) &&
                    <button 
                        type="button"
                        className="btn btn-outline-danger btn-sm me-2 mt-1"
                        title="Eliminar Registro"
                        onClick={ () =>{ handleDeleteReg( id_usuario, 2 )}}
                        >
                        <FontAwesomeIcon icon={ faTrashAlt } />
                    </button>
                }
            </td>
            {
                showModalChangePass &&
                <UserChangePassword
                    showModal={ showModalChangePass }
                    setShowModal={ setShowModalChangePass }
                    id_usuario={ id_usuario }
                />
            }
        </>
    )
}
