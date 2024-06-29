const baseUrl = import.meta.env.VITE_APP_API_URL;
import axios from "axios";

import { getToken } from "../components/helpers/general";

const serviciosApi = axios.create({
    baseURL: baseUrl + "/registros/servicios"
});

serviciosApi.interceptors.request.use(
    async ( config ) => {   
        const token = getToken();
        if ( token ) {
            if( config.headers!= null ) {
                config.headers["Authorization"] = "Bearer " + token;
            }
        }
        return config;
    }
);

export default serviciosApi;