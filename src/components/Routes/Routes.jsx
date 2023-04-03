import { BrowserRouter, Routes, Route} from "react-router-dom";

import Cadastro from '../Cadastro/Cadastro'
import UserList from '../ConsultaUsuario/ConsultaUsuario'
import Root from "../Root";




function RoutesApp()  {
    return (
        <BrowserRouter>

            <Routes>
              <Route path="/" element={<Root/>} >

                <Route path="/cadastro" element={<Cadastro />} />
                <Route path="UserList" element={<UserList/>} />

              </Route>
               
            </Routes>

        </BrowserRouter>
    )
}

export default RoutesApp