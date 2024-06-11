

import React from 'react'

import { dataItemBitacora } from '../../../interfaces'

export const BitacorasListItem = ({ item }: dataItemBitacora) => {
    const {
        folio, 
        usuario, 
        id_zona,
        departamento,
        unidad, 
        fecha,
        hora,
        detalle
    } = item;


    let zona = (id_zona == 1) ? 'PONIENTE' : 'ORIENTE';

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
        <td>{ usuario }</td>
        <td>{ unidad }</td>
        <td width="40%">{ detalle }</td>
            

        </>
    )
}
