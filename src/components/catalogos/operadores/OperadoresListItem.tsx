import Swal from 'sweetalert2';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faEye, faBan, faCheckSquare, faTrashAlt } from '@fortawesome/free-solid-svg-icons';

import { useAppDispatch } from '../../../store/hooks';

import { startOperadorActive, startRegDelete } from '../../../store/slices/catalogos/';

import { dataItemOperador } from '../../../interfaces/interfaceOperador';
import { setReadOnly } from '../../../store/slices/transaction';

export const OperadoresListItem = ({ item, edit, elim }: dataItemOperador) => {

    const dispatch = useAppDispatch();
    
    const { 
		id,
		nombre, 
		apellido_paterno, 
		apellido_materno, 
		email, 
		password, 
		id_user_flotilla, 
		id_tarjeta, 
		created_at
	} = item;

	const handleSetWindow = ( id : number, readOnly = false ) => { 
        dispatch( startOperadorActive( id ) );
        dispatch( setReadOnly( readOnly ) );
    }

    let titleba = 'Dar de Alta',
        icoba = faCheckSquare,
        classBa = 'btn btn-outline-secondary btn-sm me-2',
        typeBa = 1;

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
                dispatch( startRegDelete( type, id ) );
            }
        });
    }

	return (
		<>
			<th scope="row">
                <strong>
                    { id }
                </strong>
            </th>
            <td>{ nombre + ' ' + apellido_materno + ' ' + apellido_paterno }</td>
            <td>{ email }</td>
            <td>{ id_tarjeta }</td>
            <td className="text-center">
                <button 
                    type="button"
                    className="btn btn-outline-secondary btn-sm me-2"
                    title="Ver"
                    onClick={ () =>{ handleSetWindow( id, true ) } }    
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
                        onClick={ () =>{ handleSetWindow( id, false ) } }
                    >
                        <FontAwesomeIcon icon={ faEdit } />
                    </button>
                    </>
                }
                { 
                    ( elim ) &&
                    <button 
                        type="button"
                        className="btn btn-outline-danger btn-sm me-2"
                        title="Eliminar Registro"
                        onClick={ () =>{ handleDeleteReg( id, 2 )}}
                        >
                        <FontAwesomeIcon icon={ faTrashAlt } />
                    </button>
                }
            </td>
		</>
	)
}
