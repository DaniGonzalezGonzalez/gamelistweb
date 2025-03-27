import { createBrowserRouter } from "react-router-dom"
import { MainTemplate } from "../templates/MainTemplate"
import { Homepage } from "../templates/OutletTemplates/Portada/Homepage"
import { AddContent, EditContent, ErrorPage, Login } from "../templates/OutletTemplates/AdminTemplates"
import { ResetPassword, UpdatePassword, UserProfile, UserRegister } from "../templates/OutletTemplates/AdminTemplates/UserSettings"
import { GameDetail } from "../templates/OutletTemplates/GameDetails/GameDetail"
import { AddGameToList, AddGameToListByPlatform, GameListComplete, GameListByState, GameListByStateRejugando } from "../templates/OutletTemplates/AddAndListTemplates"
import { FAQ } from "../templates/OutletTemplates/FAQ/FAQ"
import { PoliticaPrivacidad, TerminosUso } from "../templates/OutletTemplates/AdminTemplates/PrivacyPolicies"
import { AccesoPrivado } from "../templates/helpers/AdminComponents/AccesoPrivado"
import { CollectionDetails } from "../templates/OutletTemplates/Portada/PortadaOnline/Carruseles/CarruselesHelpers/CollectionDetails"
import { AddRandomGameToList } from "../templates/OutletTemplates/AddAndListTemplates/AddRandomGameToList"

export const router = createBrowserRouter([
    {
        path: '/',
        element: <MainTemplate/>,
        errorElement: <ErrorPage/>,
        children:[
            {
                path:'/',
                element: <Homepage/>
            },
            {
                path:'login',
                element: <Login/>
            },
            {
                path:'user-register',
                element: <UserRegister/>
            },
            {
                path:'reset-password',
                element: <ResetPassword/>
            },
            {
                path:'update-password',
                element: <UpdatePassword/>
            },
            {
                path:'user-profile',
                element: <AccesoPrivado>
                            <UserProfile/>
                         </AccesoPrivado>
            },
            {
                path:'faq',
                element: <AccesoPrivado>
                            <FAQ/>
                         </AccesoPrivado>
            },
            {
                path:'use-terms',
                element: 
                // <AccesoPrivado>
                            <TerminosUso/>
                        //  </AccesoPrivado>
            },
            {
                path:'privacy-policies',
                element: 
                // <AccesoPrivado>
                            <PoliticaPrivacidad/>
                        //  </AccesoPrivado>
            },
            {
                path:'admin-add-content',
                element: <AccesoPrivado>
                            <AddContent/>
                         </AccesoPrivado>
            },
            {
                path:'admin-edit-content',
                element: <AccesoPrivado>
                            <EditContent/>
                        </AccesoPrivado>
            },
            {
                path:'add-game-to-list',
                element: <AccesoPrivado>
                            <AddGameToList/>
                        </AccesoPrivado>
            },
                {
                    path:'add-game-to-list-by-platform/:platform',
                    element: <AccesoPrivado>
                                <AddGameToListByPlatform/>
                            </AccesoPrivado>
                },
                {
                    path:'add-random-game-to-list',
                    element: <AccesoPrivado>
                                <AddRandomGameToList/>
                            </AccesoPrivado>
                },
            {
                path:'edit-game-to-list-completa',
                element:  <AccesoPrivado>
                             <GameListComplete/>
                          </AccesoPrivado>
            },
            {
                path:'edit-game-to-list-jugando',
                element: <AccesoPrivado>
                           <GameListByStateRejugando estadoPluralMinusculas={'jugando'} estadoSingularMayusculas={'Jugando'} nombreColeccion={'Jugando'}/>
                         </AccesoPrivado>
            },
            {
                path:'edit-game-to-list-proximos',
                element: <AccesoPrivado>
                            <GameListByState estadoPluralMinusculas={'proximos'} estadoSingularMayusculas={'Próximos'} nombreColeccion={'Próximos'}/>
                         </AccesoPrivado>
            },
            {
                path:'edit-game-to-list-terminados',
                element:    <AccesoPrivado>
                            <GameListByState estadoPluralMinusculas={'terminados'} estadoSingularMayusculas={'Terminado'} nombreColeccion={'Terminados'}/>
                            </AccesoPrivado>
            },
            {
                path:'edit-game-to-list-completando',
                element: <AccesoPrivado>
                            <GameListByStateRejugando estadoPluralMinusculas={'completando'} estadoSingularMayusculas={'Completando'} nombreColeccion={'Completando'}/>
                        </AccesoPrivado>
            },
            {
                path:'edit-game-to-list-lista-de-deseos',
                element:<AccesoPrivado>
                            <GameListByState estadoPluralMinusculas={'lista-de-deseos'} estadoSingularMayusculas={'Lista de deseos'} nombreColeccion={'Lista de deseos'}/>
                        </AccesoPrivado>
            },
            {
                path:'edit-game-to-list-otra-vez',
                element:<AccesoPrivado>
                            <GameListByStateRejugando estadoPluralMinusculas={'Otra-vez'} estadoSingularMayusculas={'Otra vez'} nombreColeccion={'Otra vez'}/>
                        </AccesoPrivado>
            },
            {
                path:'edit-game-to-list-pausados',
                element: <AccesoPrivado>
                            <GameListByState estadoPluralMinusculas={'pausados'} estadoSingularMayusculas={'Pausado'} nombreColeccion={'Pausados'}/>
                         </AccesoPrivado>
            },
            {
                path:'edit-game-to-list-abandonados',
                element: <AccesoPrivado>
                            <GameListByState estadoPluralMinusculas={'abandonados'} estadoSingularMayusculas={'Abandonado'} nombreColeccion={'Abandonados'}/>
                        </AccesoPrivado>
            },
            {
                path:'game/:collection/:gameId',
                element: <AccesoPrivado>
                            <GameDetail/>
                        </AccesoPrivado>
            },
            {
                path:'collections/:filterType/:filterValue',
                element: <AccesoPrivado>
                            <CollectionDetails/>
                        </AccesoPrivado>
            },
            // {
            //     path:'game/:collection/:gameId',
            //     element: <AccesoPrivado>
            //                 <GameBDDetail/>
            //             </AccesoPrivado>
            // },
        ]
        
      }
    ],
    {
        future: {
            v7_skipActionErrorRevalidation: true,
            v7_startTransition: true,
            v7_partialHydration: true,
            v7_normalizeFormMethod: true,
            v7_fetcherPersist: true,
            v7_relativeSplatPath: true,
            v7_deferToAction: true,
          }
      }
)