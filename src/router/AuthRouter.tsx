import { CContainer, CSpinner } from "@coreui/react";
import { FC, Suspense, lazy } from "react";
import { useRoutes } from "react-router-dom";

import { AppFooter, AppHeader, AppSidebar } from "../components/ui";
import { Loading } from "../components/ui/UserInterface";

const Users = lazy(() => import('../screens/admin/Users'));
const Profiles = lazy(() => import('../screens/admin/Profiles'));
const Home = lazy(() => import('../screens/Home'));
const Colonias = lazy(() => import('../screens/catalogos/Colonias'));
const Cuadrantes = lazy(() => import('../screens/catalogos/Cuadrantes'));
const Operativos = lazy(() => import('../screens/catalogos/Operativos'));
const Procedencia = lazy(() => import('../screens/catalogos/Procedencia'));
const TipoEmergencia = lazy(() => import('../screens/catalogos/TipoEmergencia'));
const TipoCierre = lazy(() => import('../screens/catalogos/TipoCierre'));
const Departamentos = lazy(() => import('../screens/catalogos/Departamentos'));
const Emergencias = lazy(() => import('../screens/catalogos/Emergencias'));



const App: FC = (): JSX.Element => {
	let routes = useRoutes([
		{ path: "/", element: <Home /> },
		{ path: "/users", element: <Users /> },
		{ path: "/rol", element: <Profiles /> },
		{ path: "/colonias", element: <Colonias /> },
		{ path: "/cuadrantes", element: <Cuadrantes />},
		{ path: "/operativos", element: <Operativos />},
		{ path: "/procedencia", element: <Procedencia />},
		{ path: "/tipo_emergencia", element: <TipoEmergencia />},
		{ path: "/tipo_cierre", element: <TipoCierre />},
		{ path: "/departamentos", element: <Departamentos />},
		{ path: "/emergencias", element: <Emergencias />},
	]);
	return <>{routes}</>;
};

export const AuthRouter = () => {
	return (
		<div>
			<AppSidebar />
			<div className="wrapper d-flex flex-column min-vh-100 bg-light">
				<AppHeader />
				<div className="body flex-grow-1 px-3">
					<CContainer>
						<Suspense fallback={<Loading/>}>
							<App />
						</Suspense>
					</CContainer>
				</div>
				<AppFooter />
			</div>
		</div>
	);
};
