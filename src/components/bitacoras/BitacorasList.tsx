import React, { ChangeEvent, FC, useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { usePermission } from '../../hooks/usePermission';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilter, faMagnifyingGlass, faPlusCircle } from '@fortawesome/free-solid-svg-icons';

import { HeaderList, Loading, NoAccess, Pager } from '../ui/UserInterface';
import { setPageNumber, setSearchBitacora, startRegBitacoras, unSetActiveBitacora } from '../../store/slices/bitacoras';
import { setReadOnly, setShowList } from '../../store/slices/transaction';
import { useGetNewPage } from '../../hooks/useGetNewPage';
import { BitacorasInterface } from '../../interfaces';
import { BitacorasListItem } from './BitacorasListItem';
import { BitacorasModalSearch } from './BitacorasModalSearch';
export const BitacorasList: FC = (): JSX.Element => {

    const { pathname } = useLocation();
    const allowed = usePermission( pathname ) ;

    const { list, page, totalRows, totalPages, filterSearch } = useAppSelector( state => state.bitacoras);
    const { systemOptions } = useAppSelector(state => state.login);
    const { loading } = useAppSelector(state => state.transaction);

    const [loadingExport, setLoadingExport] = useState(false);
    const [ showModalFilter, setShowModalFilter ] = useState(false);

    const { id_zona } = systemOptions;

    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch( startRegBitacoras( id_zona ) );
    
      
    }, [dispatch, page, filterSearch]);

    if( loading ){
      return( <Loading/> );
    }
  
    if(allowed.length === 0){
        return( <NoAccess/> );
    }
    
    const { edit, elim, nuevo, exportar } = allowed[0];

    const setChangeWindow = ( ) => {
        
      dispatch( unSetActiveBitacora() );
      dispatch( setShowList( false ) );
      dispatch( setReadOnly( false ) );

    }

    const handleChangePage = ( 
        type:number , 
        iniend: number|null = null,
        event: ChangeEvent<HTMLInputElement> | null = null,
    ) => {

        const nPage = useGetNewPage( page ,type, event, iniend )

        dispatch( setPageNumber( nPage ) );

    }

  const setSearchEmpty = () => {
    dispatch ( setSearchBitacora({}) ); 
  }

    return(
      <>
      <div className="card mb-4">
            <HeaderList
                title='Bitacoras'
                totalRows={ totalRows }
            />
          <div className='card-body'>
              <div className='row'>
                <div className="col-8">
                    <ul className="nav nav-pills">
                        <li className="nav-item">
                            {
                                ( nuevo ) && 
                                <button 
                                    className="btn btn-success btn-sm me-2"
                                    onClick={ () => { setChangeWindow() }  }
                                >
                                <FontAwesomeIcon icon={ faPlusCircle } /> Agregar
                                </button> 
                            }
                        </li>
                    </ul>
                  </div>
                  <div className="col-4">
                        {
                            ( Object.keys(filterSearch).length > 0) ?
                            <button
                                className="btn btn-warning btn-sm me-2 float-end"
                                onClick={() => {
                                    setSearchEmpty();
                                }}
                            >
                                <FontAwesomeIcon icon={faFilter} /> 
                            </button>
                            :
                            <button
                                className="btn btn-primary btn-sm me-2 float-end"
                                onClick={() => {
                                    setShowModalFilter( true );
                                }}
                            >
                                <FontAwesomeIcon icon={ faMagnifyingGlass } /> 
                            </button>
                        } 
                    </div>
              </div>
              <div className="tab-content rounded-bottom mt-2">
                    <div 
                        className="table-responsive" 
                        role="tabpanel">
                        <table className="table table-hover ">
                            <thead className="table-light">
                                <tr>
                                    <th scope="col">Id</th>
                                    <th scope="col">Zona</th>
                                    <th scope="col">Usuario</th>
                                    <th scope="col">Departamento</th>
                                    <th scope="col">Unidad</th>
                                    <th scope="col">Fecha</th>
                                    <th scope="col">Reporte</th>
                                    <th 
                                        scope="col"
                                        className="text-center">
                                        Funciones
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    list.map(( item: BitacorasInterface, index )=>(
                                        <tr key={ index }>
                                            {<BitacorasListItem
                                                item={item}
                                                edit={ edit }
                                                elim={ elim }/>}
                                        </tr>
                                    ))
                                }
                            </tbody>
                            <tfoot>
                                {
                                    ( Object.keys(list).length == 0) &&
                                    <tr>
                                        <td 
                                            colSpan={5}
                                            className="text-center">
                                            <strong>No se encontraron registros en la base de datos</strong>
                                        </td>
                                    </tr>
                                }
                            </tfoot>
                        </table>
                    </div>
                </div>
                {
                    ( Object.keys(list).length > 0) &&
                    <Pager
                        page={ page }
                        totalPages={ totalPages }
                        handleChangePage={ handleChangePage }
                    />
                }
          </div>
      </div>
      {
        showModalFilter &&
        <BitacorasModalSearch
            showModal={ showModalFilter }
            setShowModal={ setShowModalFilter }
        />
     }
    </>
    )
}
