const baseUrl = import.meta.env.REACT_APP_API_URL;

const fetchWithOutToken = ( endpoint: string, data: object, method = 'GET')=> {

    const url = `${ baseUrl }/${ endpoint }`;

    if( method === 'GET' ) {
        return fetch( url );
    }else{
        return fetch( url, {
            method,
            headers:{
                'Content-Type': 'application/json'
            },
            body: JSON.stringify( data )
        });
    }

}

const fetchWithOutTokenFile = ( endpoint: string, formData:any, method = 'POST')=> {

    const url = `${ baseUrl }/${ endpoint }`;

    if( method === 'GET' ) {
        return fetch( url );
    }else{
        return fetch( url, {
            method,
            body: formData
        });
    }

}

const fetchWithToken = ( endpoint: string, data: object, method = 'GET')=> {

    const url = `${ baseUrl }/${ endpoint }`;
    const token = localStorage.getItem('token') || '';

    if( method === 'GET' ) {
        return fetch( url,{
            method,
            headers: { 
                'x-token': token
            }
        } );
    }else{
        return fetch( url, {
            method,
            headers:{
                'Content-Type': 'application/json',
                'x-token': token
            },
            body: JSON.stringify( data )
        });
    }

}

export{
    fetchWithOutToken,
    fetchWithToken,
    fetchWithOutTokenFile
}