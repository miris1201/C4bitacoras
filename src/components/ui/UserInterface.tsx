import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLessThanEqual, faLessThan, faGreaterThanEqual, faGreaterThan } from '@fortawesome/free-solid-svg-icons';

export const Loading = () => {
    return (
        <div className="d-flex justify-content-center pt-5 loading-box align-middle">
            <div className="align-middle">
                <div>
                    <div className="spinner-grow text-dark mt-5 mb-2" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                    <div className="spinner-grow text-secondary mt-5 mb-2" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                </div>
                <div>
                    <p>Cargando... </p>
                </div>
            </div>
        </div>
    )
}

export const NoAccess = () => {
    return (
        <div className="d-flex justify-content-center">
            <h1 className="">Sin acceso.</h1>
        </div>
    )
}

interface HeaderValues {
    title: string,
    totalRows?: number,
}

export const HeaderList = ({ title, totalRows = 0 }: HeaderValues) => {
    return (
        <div className="card-header header-title-tf">
            <h4>{ title } { ' ' }
            {
                ( totalRows > 0) && 
                <span className="badge colorReg ">
                    <em className="colorReg"> { totalRows } Reg.</em>
                </span>
            }
            </h4>
        </div>
    )
}

interface NotificationValues {
    totalRows: number,
}

export const Notifications = ({ totalRows }: NotificationValues) => {
    return (
        <div className="card-header">
            <button type="button" className="btn btn-info">
                Notifications <span className="badge badge-light">{totalRows}</span>
            </button>
        </div>
    )
}

interface PagerValues {
    page: number
    totalPages: number
    handleChangePage: Function
}

export const Pager = ({ page, totalPages, handleChangePage }: PagerValues) => {

    let opCombo = [];

    for( let i = 1; i <= totalPages ; i++){
        opCombo.push(
            <option 
                key={ 'opR'+i }
                value={ i - 1 }
            >
                    {i}
            </option>);
    }

    return (
        <div className="row mt-2">
            <div className="col">
                { 
                (page === 0) ? null : (
                    <>
                        <button
                            type="button"
                            title="Ir al inicio"
                            className="btn btn-outline-secondary btn-sm "
                            onClick={ () => { handleChangePage( 0, 0 )} }
                            >
                                <FontAwesomeIcon icon={ faLessThanEqual }/> 
                        </button>
                        <button
                            type="button"
                            title="Regresar página"
                            className="btn btn-outline-secondary btn-sm "
                            onClick={ () => { handleChangePage( 0 )} }
                            >
                                <FontAwesomeIcon icon={ faLessThan }/> 
                        </button>
                    </>
                )}
                    <select 
                        value={ page  }
                        name="pagerIndex"
                        className="btn btn-outline-secondary btn-sm"
                        onChange={ ( e ) => { handleChangePage( 0, null, e )} }> 
                        { opCombo }
                    </select>
                
                { (page + 1 === totalPages) ? null : (
                    <>
                        <button
                            type="button"
                            title="Siguiente página"
                            className="btn btn-outline-secondary btn-sm"
                            onClick={ () => { handleChangePage( 1 )} }
                            >
                            <FontAwesomeIcon icon={ faGreaterThan }/>
                        </button>
                        <button
                            type="button"
                            title="Ir al fin"
                            className="btn btn-outline-secondary btn-sm me-2"
                            onClick={ () => { handleChangePage( 0, totalPages-1 )} }
                            >
                            <FontAwesomeIcon icon={ faGreaterThanEqual }/>
                        </button>
                    </>
                )}
            </div>
        </div>
    )
}

interface RecordsValues {
    recordsPerPage: number;
    changeReg: Function;
}

export const RecordsPerPage = ({ recordsPerPage, changeReg }: RecordsValues) => {
    return (
        <>
        <select
              // className="area_DropDown form-control input-sm me-4" 
              className="btn btn-outline-secondary btn-sm me-4" 
              value={recordsPerPage}
              name="registros" 
              id="registros"                     
              onChange={ (e) => { 
                changeReg(e); 
              } }                               
            >                    
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="5">5</option>
              <option value="10">10</option>
              <option value="25">25</option>
              <option value="50">50</option>
              <option value="100">100</option>
            </select>
        </>        
    )
}
