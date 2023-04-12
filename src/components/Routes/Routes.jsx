import { BrowserRouter, Routes, Route} from "react-router-dom";

import Cadastro from '../Cadastro/Cadastro'
import Root from "../Root";
import UserTable from "../ConsultaUsuario/ConsultaUsuario";




function RoutesApp()  {
    return (
        <BrowserRouter>

            <Routes>
              <Route path="/" element={<Root/>} >
                <Route index element={ <h1>Sistema Nova</h1>} />
                <Route path="/cadastro" element={<Cadastro />} />
                <Route path="UserTable" element={<UserTable/>} />

              </Route>
               
            </Routes>

        </BrowserRouter>
    )
}

export default RoutesApp