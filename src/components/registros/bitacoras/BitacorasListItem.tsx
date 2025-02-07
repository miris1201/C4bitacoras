

import React, { useState } from 'react'

import { dataItemBitacora } from '../../../interfaces'
import { DetalleModal } from './DetalleModal';
import { faCircleInfo } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { count } from 'console';

export const BitacorasListItem = ({ item }: dataItemBitacora) => {
   
   const [ showModalDetalle, setShowModalDetalle ] = useState(false);
   
    const {
        folio, 
        usuario, 
        id_zona,
        departamento,
        unidad, 
        fecha,
        hora,
        detalle, 
        fecha_captura
    } = item;

    let zona = (id_zona == 1) ? 'PONIENTE' : 'ORIENTE';

    let contenido = (detalle.length > 150) ? `${detalle.substring(0, 200) + '...'}` : detalle;


    return (
        <>
        <th scope="row">
            <strong>
                { folio }
            </strong>
        </th>
        <td>{  `${fecha}  ${hora}` }</td>
        <td>{ zona } </td>
        <td>{ departamento }</td>
        <td>{ unidad }</td>
        <td width="40%">{ contenido }</td>
        <td width="8%" className="text-center">
            <button 
                type="button"
                className="btn btn-outline-primary btn-sm me-2"
                title="Ver detalle"
                onClick={() => {
                    setShowModalDetalle( true );
                }}
            >
                <FontAwesomeIcon icon={ faCircleInfo } />
            </button>
        </td>
        {
            (showModalDetalle) &&
            <DetalleModal
                folio={folio}
                user={ usuario }
                fecha={fecha_captura}
                detalle={detalle}
                showModal={ showModalDetalle }
                setShowModal={ setShowModalDetalle }
            />
        }

        </>
    )
}
