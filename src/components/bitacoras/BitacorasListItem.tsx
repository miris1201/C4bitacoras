import Swal from 'sweetalert2';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faEye, faBan, faCheckSquare, faTrashAlt } from '@fortawesome/free-solid-svg-icons';

import { dataItemBitacoras } from '../../interfaces';
import { useAppDispatch } from '../../store/hooks';
import { setReadOnly } from '../../store/slices/transaction';
import { startRegBitacoras } from '../../store/slices/bitacoras';

export const BitacorasListItem = ({ item, edit, elim }: dataItemBitacoras) => {

    const dispatch = useAppDispatch();
    
    const { 
		id_bitacora,
		folio, 
		id_usuario, 
		unidad, 
		fecha,
        hora,
        detalle, 
        id_zona,
        id_departamento	
    } = item;

	return (
		<>
			<th scope="row">
                <strong>
                    { folio }
                </strong>
            </th>
            <td>{id_zona}</td>
            <td>{ id_usuario }</td>
            <td>{ id_departamento }</td>
            <td>{ unidad }</td>
            <td>{ fecha }</td>
            <td>{ hora }</td>
            <td>{ detalle }</td>
            
		</>
	)
}
