import React, { ChangeEvent, FC, useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { usePermission } from '../../../hooks/usePermission';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { setPageNumberDepartamentos, setSearchDepartamentos, startGetRegDepartamentos, unSetActiveDepartamentos } from '../../../store/slices/catalogos';
import { HeaderList, Loading, NoAccess, Pager } from '../../ui/UserInterface';
import { setReadOnly, setShowList } from '../../../store/slices/transaction';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilter, faMagnifyingGlass, faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import { DepartamentosInterface } from '../../../interfaces';
import { useGetNewPage } from '../../../hooks/useGetNewPage';
import { DepartamentosListItem } from './DepartamentosListItem';
import { DepartamentosModalSearch } from './DepartamentosModalSearch';

export const DepartamentosList: FC = (): JSX.Element => {

    const { pathname } = useLocation();
    const allowed = usePermission( pathname ) ;

    const { list, page, totalRows, totalPages, filterSearch } = useAppSelector( state => state.departamentos);
    const { loading } = useAppSelector(state => state.transaction);

    const [loadingExport, setLoadingExport] = useState(false);
    const [ showModalFilter, setShowModalFilter ] = useState(false);

    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch( startGetRegDepartamentos() );
    
      
    }, [dispatch, page, filterSearch]);

    if( loading ){
      return( <Loading/> );
    }
  
    if(allowed.length === 0){
        return( <NoAccess/> );
    }
    
    const { edit, elim, nuevo, exportar } = allowed[0];

    const setChangeWindow = ( ) => {
        
      dispatch( unSetActiveDepartamentos() );
      dispatch( setShowList( false ) );
      dispatch( setReadOnly( false ) );

    }

    const handleChangePage = ( 
        type:number , 
        iniend: number|null = null,
        event: ChangeEvent<HTMLInputElement> | null = null,
    ) => {

        const nPage = useGetNewPage( page ,type, event, iniend )

        dispatch( setPageNumberDepartamentos( nPage ) );

    }

  const setSearchEmpty = () => {
    dispatch ( setSearchDepartamentos({}) ); 
  }

    return(
      <>
      <div className="card mb-4">
            <HeaderList
                title='Departamentos'
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
                                    className="btn btn-outline-primary me-2"
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
                                className="btn btn-outline-primary me-2 float-end"
                                onClick={() => {
                                    setSearchEmpty();
                                }}
                            >
                                <FontAwesomeIcon icon={faFilter} /> 
                            </button>
                            :
                            <button
                                className="btn btn-outline-primary me-2 float-end"
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
                                    <th scope="col">Estatus</th>
                                    <th scope="col">Departamento</th>
                                    <th scope="col">Abreviatura</th>
                                    <th 
                                        scope="col"
                                        className="text-center">
                                        Funciones
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    list.map(( item: DepartamentosInterface, index )=>(
                                        <tr key={ index }>
                                            {<DepartamentosListItem
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
        <DepartamentosModalSearch
            showModal={ showModalFilter }
            setShowModal={ setShowModalFilter }
        />
     }
    </>
    )
}
