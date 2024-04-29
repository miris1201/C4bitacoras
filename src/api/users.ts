const baseUrl = import.meta.env.VITE_APP_API_URL;
import axios from "axios";

import { getToken } from "../components/helpers/general";

const usersApi = axios.create({
    baseURL: baseUrl + "/admin/user"
});

usersApi.interceptors.request.use(
    async ( config ) => {
        const token = getToken();

        if ( token ) {
            if( config.headers != null ) {
                config.headers["Authorization"] = "Bearer " + token;
            }
        }
        return config;
    }
);

export default usersApi;