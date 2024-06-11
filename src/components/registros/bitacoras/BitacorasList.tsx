
import React, { ChangeEvent, FC, useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { usePermission } from '../../../hooks/usePermission';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { exportDataBitacoras, setPageNumberBitacoras, setSearchBitacoras, startGetRegBitacoras, unSetActiveBitacoras } from '../../../store/slices/registros';
import { HeaderList, Loading, NoAccess, Pager } from '../../ui/UserInterface';
import { useGetNewPage } from '../../../hooks/useGetNewPage';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileExcel, faFilter, faMagnifyingGlass, faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import { setReadOnly, setShowList } from '../../../store/slices/transaction';
import { BitacoraInterface } from '../../../interfaces';
import { BitacorasListItem } from './BitacorasListItem';
import { BitacorasModalSearch } from './BitacorasModalSearch';

export const BitacorasList: FC = (): JSX.Element => {

    const { pathname } = useLocation();
    const allowed = usePermission( pathname );

    const { list, page, totalRows, totalPages, filterSearch } = useAppSelector( state => state.bitacoras);  
    const { loading } = useAppSelector( state => state.transaction)

    const [loadingExport, setLoadingExport] = useState(false);
    const [ showModalFilter, setShowModalFilter ] = useState(false);

    const dispatch = useAppDispatch();

    if ( loading ) {
        return( <Loading/>);
    }

    if (allowed.length === 0) {
        return( <NoAccess/> );
    }

    const { edit, elim, nuevo, exportar } = allowed[0];

    const setChangeWindow = ( ) => {
        
        dispatch( unSetActiveBitacoras() );
        dispatch( setShowList( false ) );
        dispatch( setReadOnly( false ) );
  
      }

    const handleChangePage = ( 
        type:number , 
        iniend: number|null = null,
        event: ChangeEvent<HTMLInputElement> | null = null,
    ) => {

        const nPage = useGetNewPage( page ,type, event, iniend )

        dispatch( setPageNumberBitacoras( nPage ) );

    }

    useEffect(() => {
        dispatch( startGetRegBitacoras() );
    
    }, [dispatch, page, filterSearch]);

    const setSearchEmpty = () => {
        dispatch( setSearchBitacoras({}) );
    }

    return (
        <>
        <div className="card  mb-4">
            <HeaderList
                title='Bitacoras'
            />
            <div className='card-body '>
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
                            <li className="nav-item">
                                {
                                    ( exportar ) && 
                                    <button 
                                        className="btn btn-info btn-sm me-2"
                                        disabled={ loadingExport }
                                        onClick={() => {
                                            dispatch( exportDataBitacoras( setLoadingExport ) );
                                        }}
                                    >
                                        <FontAwesomeIcon icon={ faFileExcel } /> Exportar
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
                                    <th scope="col">Folio</th>
                                    <th scope="col">Fecha</th>
                                    <th scope="col">Zona</th>
                                    <th scope="col">Departamento</th>
                                    <th scope="col">Usuario</th>
                                    <th scope="col">Unidad</th>
                                    <th scope="col">Reporte</th>                                    
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    list.map(( item: BitacoraInterface, index )=>(
                                        <tr key={ index }>
                                            {<BitacorasListItem
                                                item={item}/>}
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
