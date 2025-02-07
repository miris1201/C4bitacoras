
import imgLogo from '../../assets/brand/logo.png';
import { useForm } from '../../hooks/useForm';
import { FormEvent } from 'react';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { startLogin } from '../../store/slices/login/thunks';
import { FormData } from '../../interfaces';

export const LoginScreen = () => {

    const dispatch = useAppDispatch();

    const { checking } = useAppSelector( (state) => state.login);

    const { formValues, handleInputChange } = useForm<FormData>({
        user: '',
        password: ''
    });

    const { user, password } = formValues;

    const handleLoginSubmit = ( e: FormEvent<HTMLFormElement> ) => {

        e.preventDefault();
        dispatch( startLogin( { user, password } ) );
        
    }

    return (
        <section className="vh-100">
            <div className="container-fluid h-custom">
                <div className="row d-flex justify-content-center align-items-center h-100">
                    <div className="col-md-9 col-lg-6 col-xl-5 d-flex justify-content-end justify-content-sm-center">
                        <img src={imgLogo}
                        className="img-fluid" alt="LOGO"/>
                    </div>
                    <div className="col-md-8 col-lg-6 col-xl-4 offset-xl-1">
                        <form
                            onSubmit={ handleLoginSubmit }>
                            <div className="d-flex flex-row align-items-center justify-content-center justify-content-lg-start">
                                <p className="lead fw-normal mb-0 me-3">
                                    <strong className="title-login">C4 Bitácoras</strong>
                                </p>
                            </div>
                            <div className="divider d-flex align-items-center my-4"></div>
                            <div className="form-outline mb-4">
                                <label 
                                    className="form-label" 
                                    htmlFor="user">
                                    Nombre de Usuario
                                </label>
                                <input 
                                    id="user" 
                                    type="text" 
                                    className="form-control form-control-lg" 
                                    name="user" 
                                    value={ user }
                                    onChange={ handleInputChange }
                                    required 
                                    autoFocus
                                    placeholder="Ingresa tu nombre de usuario"
                                />
                            </div>
                            <div className="form-outline mb-3">
                                <label 
                                    className="form-label"
                                    htmlFor="password">
                                    Password
                                </label>
                                <input 
                                    id="password" 
                                    type="password" 
                                    className="form-control form-control-lg" 
                                    name="password" 
                                    value={ password }
                                    onChange={ handleInputChange }
                                    required 
                                    placeholder="Ingresa tu password"
                                />
                            </div>
                            <div className="text-center text-lg-start ">
                                <button 
                                    type="submit" 
                                    className="btn btn-login btn-lg"
                                    disabled={ checking }>
                                    Ingresar
                                </button>
                            </div>

                        </form>
                    </div>
                </div>
            </div>
        </section>
    )
}