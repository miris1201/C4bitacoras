import Swal from 'sweetalert2';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faEye, faBan, faCheckSquare, faTrashAlt } from '@fortawesome/free-solid-svg-icons';

import { useAppDispatch } from '../../../store/hooks';


import { setReadOnly } from '../../../store/slices/transaction';
import {  dataItemCuadrantes } from '../../../interfaces';
import { startCuadranteDelete, startCuadrantesActive } from '../../../store/slices/catalogos';

export const CuadrantesListItem = ({ item, edit, elim }: dataItemCuadrantes) => {

    const dispatch = useAppDispatch();
    
    const { 
		id_cuadrante,
		id_zona, 
		sector, 
        cuadrante,
        activo
    } = item;

	const handleSetWindow = ( id : number, readOnly = false ) => { 
        dispatch( startCuadrantesActive( id ) );
        dispatch( setReadOnly( readOnly ) );
    }

    let titleba = 'Dar de Alta',
        icoba = faCheckSquare,
        classBa = 'btn btn-outline-warning btn-sm me-2',
        typeBa = 1,
        classStatus = 'badge rounded-pill bg-danger',
        txtStatus = 'Inactivo';
    
    if (Number(activo) === 1) {
        titleba = "Dar de Baja";
        icoba   = faBan;
        classBa = 'btn btn-outline-danger btn-sm me-2';
        typeBa  = 0;
        classStatus = 'badge rounded-pill bg-success',
        txtStatus = 'Activo';
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
                dispatch( startCuadranteDelete( type, id ) );
            }
        });
    }

    let zona = (Number(id_zona) === 1) ? 'PONIENTE': 'ORIENTE';

	return (
		<>
            <td>
                <span className={classStatus}> {txtStatus } </span>
            </td>
			<th scope="row">
                <strong>
                    { cuadrante }
                </strong>
            </th>
            <td>{ zona }</td>
            <td>{ sector }</td>
            <td className="text-center">
                <button 
                    type="button"
                    className="btn btn-outline-secondary btn-sm me-2"
                    title="Ver"
                    onClick={ () =>{ handleSetWindow( id_cuadrante, true ) } }    
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
                        onClick={ () =>{ handleSetWindow( id_cuadrante, false ) } }
                    >
                        <FontAwesomeIcon icon={ faEdit } />
                    </button>
                    </>
                }
                { 
                    ( elim ) &&
                    <button 
                        type="button"
                        className={ classBa }
                        title={ titleba }
                        onClick={ () =>{ handleDeleteReg( id_cuadrante, typeBa )}}
                        >
                        <FontAwesomeIcon icon={ icoba } />
                    </button>
                }
                { 
                    ( elim ) &&
                    <button 
                        type="button"
                        className={ classBa }
                        title={ titleba }
                        onClick={ () =>{ handleDeleteReg( id_cuadrante, 2 )}}
                        >
                        <FontAwesomeIcon icon={ faTrashAlt } />
                    </button>
                }
            </td>
		</>
	)
}
