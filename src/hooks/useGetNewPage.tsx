import { ChangeEvent } from "react";

export const useGetNewPage = ( 
    page: number,
    type:number,
    event: ChangeEvent<HTMLInputElement|HTMLSelectElement> | null = null,
    iniEnd: number|null
) => {

    let newPage = null; 
    
    if( event === null ){
        newPage = ( type === 1) ? page + 1 : page - 1 ;

        newPage = ( iniEnd  !== null ) ? iniEnd : newPage;

    }else{
        newPage = parseInt(event.target.value);
    }

    return (
        newPage
    );

}