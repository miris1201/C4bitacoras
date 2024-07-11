import { dataProfileCheck } from "../../../interfaces"

export const UserProfileCheck = ({ menu, handleCheckBoxChange, handleCheckBoxChangeChild }: dataProfileCheck) => {
    return (
        <>
        <div className="row mt-4">
            <div className="col-12">
                <h4>Permisos de Usuario</h4>
            </div>
        </div>
        {
            menu.map((item: any, index: number) =>(
                <div className="row mt-4" key={ index }>
                    <div className="col-12 mt-2">
                        <div className="form-check form-switch me-2">
                            <input  
                                type="checkbox" 
                                value={ item.value } 
                                className="form-check-input" 
                                role="switch"
                                name={`menu${item.id_menu}`}
                                id={`menu${item.id_menu}`}
                                checked={ item.isChecked }
                                onChange={ handleCheckBoxChange( index ) }
                            />
                            <label 
                                htmlFor={`menu${item.id_menu}`}
                                className="form-check-label ms-2">
                                <strong>{ item.texto }</strong>
                            </label>
                        </div>
                    </div>
                    {
                        item._children.map(( itemChild: any, indexChild: number ) =>(
                            <div className="row" key={ `ch-${indexChild}` }>
                                <div className="col-3 mt-2 ms-2" >
                                    <div className="form-check form-switch ms-4">
                                        <input  
                                            type="checkbox" 
                                            value={ itemChild.value } 
                                            name={`menu${itemChild.id_menu}`}
                                            id={`menu${itemChild.id_menu}`}
                                            className="form-check-input " 
                                            checked={ (parseInt(itemChild.value) === 1) ? true : false }
                                            onChange={ handleCheckBoxChangeChild(index,  indexChild, "value" ) }
                                        />
                                        <label 
                                            htmlFor={`menu${itemChild.id_menu}`}
                                            className="form-check-label ms-2">
                                            <strong>{ itemChild.texto  }</strong>
                                        </label>
                                    </div>
                                </div>  
                                <div className="col-2 mt-2 ms-2" >
                                    <div className="form-check ms-4">
                                        <input  
                                            type="checkbox" 
                                            value={ itemChild.nuevo } 
                                            name={`menuind_${itemChild.id_menu}nuevo`}
                                            id={`menuind_${itemChild.id_menu}nuevo`}
                                            className="form-check-input" 
                                            checked={ (parseInt(itemChild.nuevo) === 1) ? true : false }
                                            onChange={ handleCheckBoxChangeChild(index,  indexChild, "nuevo" ) }
                                        />
                                        <label 
                                            htmlFor={`menuind_${itemChild.id_menu}nuevo`}
                                            className="form-check-label ms-2">
                                            <strong>Nuevo</strong>
                                        </label>
                                    </div>
                                </div>  
                                <div className="col-2 mt-2 ms-2" >
                                    <div className="form-check ms-4">
                                        <input  
                                            type="checkbox" 
                                            value={ itemChild.edit } 
                                            name={`menuind${itemChild.id_menu}edit`}
                                            id={`menuind${itemChild.id_menu}edit`}
                                            className="form-check-input" 
                                            checked={ (parseInt(itemChild.edit) === 1) ? true : false }
                                            onChange={ handleCheckBoxChangeChild(index,  indexChild, "edit" ) }
                                        />
                                        <label 
                                            htmlFor={`menuind${itemChild.id_menu}edit`}
                                            className="form-check-label ms-2">
                                            <strong>Editar</strong>
                                        </label>
                                    </div>
                                </div>  
                                <div className="col-2 mt-2 ms-2" >
                                    <div className="form-check ms-4">
                                        <input  
                                            type="checkbox" 
                                            value={ itemChild.elim } 
                                            name={`menuind${itemChild.id_menu}elim`}
                                            id={`menuind${itemChild.id_menu}elim`}
                                            className="form-check-input" 
                                            checked={ (parseInt(itemChild.elim) === 1) ? true : false }
                                            onChange={ handleCheckBoxChangeChild(index,  indexChild, "elim" ) }
                                        />
                                        <label 
                                            htmlFor={`menuind${itemChild.id_menu}elim`}
                                            className="form-check-label ms-2">
                                            <strong>Eliminar</strong>
                                        </label>
                                    </div>
                                </div>  
                                <div className="col-2 mt-2 ms-2" >
                                    <div className="form-check ms-4">
                                        <input  
                                            type="checkbox" 
                                            value={ itemChild.exportar } 
                                            name={`menuind${itemChild.id_menu}exportar`}
                                            id={`menuind${itemChild.id_menu}exportar`}
                                            className="form-check-input" 
                                            checked={ (parseInt(itemChild.exportar) === 1) ? true : false }
                                            onChange={ handleCheckBoxChangeChild(index,  indexChild, "exportar" ) }
                                        />
                                        <label 
                                            htmlFor={ `menuind${itemChild.id_menu}exportar` }
                                            className="form-check-label ms-2">
                                            <strong>Exportar</strong>
                                        </label>
                                    </div>
                                </div>  
                            </div>
                        ))
                    }
                </div>
            ))
        }
        </>
    )
}
