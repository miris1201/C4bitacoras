import { useState, ChangeEvent } from 'react';


export const useForm = <T extends Object>( initState: T ) => {
    
    const [ formValues, setValues ] = useState(initState);

    const handleInputChange = ( { target }: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement> | ChangeEvent<HTMLTextAreaElement>  ) => {
        const { name, value } = target;

        setValues({
            ...formValues,
            [ name ]: value
        });

    }

    return{ 
        formValues,
        handleInputChange,
        setValues
    }

}