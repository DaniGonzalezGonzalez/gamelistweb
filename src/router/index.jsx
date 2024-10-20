import { createBrowserRouter } from "react-router-dom"
import { MainTemplate } from "../templates/MainTemplate"
import { Homepage } from "../templates/OutletTemplates/Portada/Homepage"
import { AddContent, AddGameToList, EditContent, EditGametoList, ErrorPage, Login } from "../templates/OutletTemplates/AdminTemplates"
import { AddGameToListByPlatform } from "../templates/OutletTemplates/AdminTemplates/AddGameToListByPlatform/AddGameToListByPlatform"
import {  EditGametoListByState, EditGametoListByStateRejugando, GameDetail } from "../templates/OutletTemplates/ExtraInfoCategories"
import { AccesoPrivado } from "../templates/helpers/components/AdminComponents/AccesoPrivado"
import { UserRegister } from "../templates/OutletTemplates/AdminTemplates/UserSettings/UserRegister"
import { ResetPassword } from "../templates/OutletTemplates/AdminTemplates/UserSettings/ResetPassword"
import { UpdatePassword } from "../templates/OutletTemplates/AdminTemplates/UserSettings/UpdatePassword"
import { UserProfile } from "../templates/OutletTemplates/AdminTemplates/UserSettings/UserProfile"
import { FAQ } from "../templates/OutletTemplates/ExtraInfoCategories/FAQ"
import { TerminosUso } from "../templates/OutletTemplates/AdminTemplates/PrivacyPolicies/TerminosUso"
import { PoliticaPrivacidad } from "../templates/OutletTemplates/AdminTemplates/PrivacyPolicies/PoliticaPrivacidad"
import { GameBDDetail } from "../templates/OutletTemplates/ExtraInfoCategories/GameBDDetail"

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
                path:'edit-game-to-list-completa',
                element:  <AccesoPrivado>
                             <EditGametoList/>
                          </AccesoPrivado>
            },
            {
                path:'edit-game-to-list-jugando',
                element: <AccesoPrivado>
                           <EditGametoListByStateRejugando estadoPluralMinusculas={'jugando'} estadoSingularMayusculas={'Jugando'} nombreColeccion={'Jugando'}/>
                         </AccesoPrivado>
            },
            {
                path:'edit-game-to-list-en-lista',
                element: <AccesoPrivado>
                            <EditGametoListByState estadoPluralMinusculas={'en-lista'} estadoSingularMayusculas={'En lista'} nombreColeccion={'En lista'}/>
                         </AccesoPrivado>
            },
            {
                path:'edit-game-to-list-terminados',
                element:    <AccesoPrivado>
                            <EditGametoListByState estadoPluralMinusculas={'terminados'} estadoSingularMayusculas={'Terminado'} nombreColeccion={'Terminados'}/>
                            </AccesoPrivado>
            },
            {
                path:'edit-game-to-list-completando',
                element: <AccesoPrivado>
                            <EditGametoListByStateRejugando estadoPluralMinusculas={'completando'} estadoSingularMayusculas={'Completando'} nombreColeccion={'Completando'}/>
                        </AccesoPrivado>
            },
            {
                path:'edit-game-to-list-lista-de-deseos',
                element:<AccesoPrivado>
                            <EditGametoListByState estadoPluralMinusculas={'lista-de-deseos'} estadoSingularMayusculas={'Lista de deseos'} nombreColeccion={'Lista de deseos'}/>
                        </AccesoPrivado>
            },
            {
                path:'edit-game-to-list-otra-vez',
                element:<AccesoPrivado>
                            <EditGametoListByStateRejugando estadoPluralMinusculas={'Otra-vez'} estadoSingularMayusculas={'Otra vez'} nombreColeccion={'Otra vez'}/>
                        </AccesoPrivado>
            },
            {
                path:'edit-game-to-list-pausados',
                element: <AccesoPrivado>
                            <EditGametoListByState estadoPluralMinusculas={'pausados'} estadoSingularMayusculas={'Pausado'} nombreColeccion={'Pausados'}/>
                         </AccesoPrivado>
            },
            {
                path:'edit-game-to-list-abandonados',
                element: <AccesoPrivado>
                            <EditGametoListByState estadoPluralMinusculas={'abandonados'} estadoSingularMayusculas={'Abandonado'} nombreColeccion={'Abandonados'}/>
                        </AccesoPrivado>
            },
            {
                path:'game/:collection/:gameId',
                element: <AccesoPrivado>
                            <GameDetail/>
                        </AccesoPrivado>
            },
            {
                path:'game/:collection/:gameId',
                element: <AccesoPrivado>
                            <GameBDDetail/>
                        </AccesoPrivado>
            },
        ]
    }
])