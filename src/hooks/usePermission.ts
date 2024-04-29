import { useAppSelector } from '../store/hooks';


export const usePermission = ( pathname = '' ) => {

    const { menu } = useAppSelector(state => state.login);

    let menuPermision;
    let allowed: { imp: boolean; edit: boolean; elim: boolean; nuevo: boolean; exportar: boolean; }[] = [];
   
    for( let item of menu ){

        menuPermision = item._children.filter( (subMenu: { link: string; }) => subMenu.link === pathname );
        
        if( menuPermision.length > 0 ){

            const { edit, imp, elim, nuevo, exportar } = menuPermision[0];
            allowed = [{
                    imp: Boolean( parseInt(imp) ),
                    edit: Boolean( parseInt(edit) ),
                    elim: Boolean( parseInt(elim) ),
                    nuevo: Boolean( parseInt(nuevo) ),
                    exportar: Boolean( parseInt(exportar) ),
                }
            ];
            break;
        }

    };
    

    return allowed;
    
}